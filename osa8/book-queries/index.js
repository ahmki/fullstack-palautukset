const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')
const { update } = require('./models/author')
const jwt = require('jsonwebtoken');

require('dotenv').config()

mongoose.set('useFindAndModify', false)
console.log('connecting mongodb')

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected mongo')
  })
  .catch((error) => {
    console.log('error connecting', error.message)
  })

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int
  }
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  type Token {
    value: String!
  }
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]
    me: User
  }
  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int
      genres: [String!]
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
`

const resolvers = {

  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: (root, args) => {
      if (!args.author && !args.genre) {
        return Book.find({})
      }
  
      // const filterByAuthor = (args) => {
      //  return books.filter(b => b.author === args.author)
      //}
      const filterByGenre = (args) => {
        return Book.find({ genres: { $in: [args.genre] } })
      }

      // if (args.author && !args.genre) {
      //   return filterByAuthor(args)
      // }
      
      if(args.genre && !args.author) {
        return filterByGenre(args)
      }
      // else {
      //  const genres = filterByGenre(args)
        // const authors = filterByAuthor(args)
      //  return genres.filter(genre => authors.includes(genre))
      //}
    },
    allAuthors: () => Author.find({}),
    me: (root, args, context) => context.currentUser
  
  },

  Author: {
    bookCount: (root) => {
      return Author.find({ name: root.name }).length
    }
  },

  Mutation: {
    addBook: async (root, args, context) => {

      if (!context.currentUser) {
        throw new AuthenticationError('authentication failed')
      }

      if (!(Author.find({ name: args.author }))[0]) {
        
         const author = new Author({
          name: args.author,
          born: null,
        })
        try {
          await author.save()
        }
        catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
      }

      const author = await Author.find({ name: args.author })

      const book = new Book({ 
        title: args.title,
        genres: args.genres,
        author: author[0]
      })
      console.log('saving', book)

      try {
        return await book.save()
      }
      catch(error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },

    editAuthor: async (root, args, context) => {

      if (!context.currentUser) {
        throw new AuthenticationError('authentication failed')
      }
  
      const author = await Author.find({ name: args.name })
      //const author = authors.find(a => a.name === args.name)

      const updatedAuthor = {
        ...author,
        born: args.setBornTo
      }
      try {
        return await Author.findOneAndUpdate({ name: args.name }, updatedAuthor)
      }
      catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },

    createUser: async (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })

      try {
        return await user.save()
      }
      catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'salasana') {
        throw new UserInputError('wrong credentials')
      }

      const loggedUser = {
        username: user.username,
        id: user._id,
      }
      return { value: jwt.sign(loggedUser, process.env.SECRET) }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const token = jwt.verify(auth.substring(7), process.env.SECRET)

      const currentUser = await User.findById(token.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
