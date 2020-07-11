
// 5.17 -- 5.21
describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      username: 'testaaja',
      name: 'testimies',
      password: 'salasana'
    }
    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('log in to application')
  })

  describe('Login', function() {

    it('succeeds with correct credentials', function() {
      cy.get('#username').type('testaaja')
      cy.get('#password').type('salasana')
      cy.get('#login').click()

      cy.contains('testimies logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('väärä')
      cy.get('#password').type('väärä')
      cy.get('#login').click()

      cy.contains('wrong username or password')
    })
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3001/api/login', {
        username: 'testaaja', password: 'salasana'
      }).then(response => {
        localStorage.setItem('loggedUser', JSON.stringify(response.body))
        cy.visit('http://localhost:3000')
      })
    })


    it('Blog can be created when logged in', function() {
      cy.get('#createBlog').click()
      cy.get('#title').type('testi title')
      cy.get('#author').type('testi author')
      cy.get('#url').type('testi url')
      cy.get('#create').click()

      cy.contains('successfully added testi title')
    })
  })

  describe('Blog functions available', function() {

    beforeEach(function() {

      cy.request('POST', 'http://localhost:3001/api/login', {
        username: 'testaaja', password: 'salasana'
      }).then(response => {
        localStorage.setItem('loggedUser', JSON.stringify(response.body))
        cy.visit('http://localhost:3000')
      })

      cy.get('#createBlog').click()
      cy.get('#title').type('testi title')
      cy.get('#author').type('testi author')
      cy.get('#url').type('testi url')
      cy.get('#create').click()
    })
    it('blog like available', function() {

      cy.reload()
      cy.get('#view').click()
      cy.get('#like').click()
      cy.contains('1')
    })

    it('blog remove available', function() {

      cy.reload()
      cy.get('#view').click()
      cy.get('#remove').click()
      cy.reload()

      cy.get('html').should('not.contain', 'testi title')
    })

    // it.only('blogs are sorted by likes', function() {
    //   cy.reload()
    //   cy.addBlog({
    //     title: 'testi1',
    //     author: 'testi1auth',
    //     url: 'testi.fi',
    //     likes: 3
    //   })
    //   cy.addBlog({
    //     title: 'testi2',
    //     author: 'testi2auth',
    //     url: 'testi.fi',
    //     likes: 2
    //   })
    //   cy.addBlog({
    //     title: 'testi3',
    //     author: 'testi3auth',
    //     url: 'testi.fi',
    //     likes: 1
    //   })
    //   let blogLikes = []
    //   cy.get('[id^=view').click({ multiple: true })
    //   cy
    //     .get('#')
    //     .each(function($likes) {
    //       console.log($likes)
    //       blogLikes.concat(($likes.textContent))
    //       console.log(blogLikes)
    //     })
    // })
  })
})

Cypress.Commands.add('addBlog', ({ author, title, url, likes }) => {
  cy.request({
    url: 'http://localhost:3001/api/blogs',
    method: 'POST',
    body: { title, author, url, likes },
    headers: {
      'Authorization': `Bearer ${JSON.parse(localStorage.getItem('loggedUser')).token}`
    }
  })
  cy.visit('http://localhost:3000')
})