const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  let totalLikeAmount = blogs.reduce((total, { likes }) => total + likes, 0)
  return totalLikeAmount
}

const favoriteBlog = (blogs) => {
  let mostLiked = blogs.reduce((prev, current) => prev.likes > current.likes ? prev : current)
  return mostLiked
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}