/*
  beforeEach(function() 
  {    
    cy.visit('http://localhost:3000')  
  })

  it('front page can be opened', function() {
    cy.contains('login')      
  })

  it('login form can be opened', function() {
    cy.contains('login').click()
  })

  it('user can log in', function() {
    cy.contains('login').click()
    cy.get('#username').type('root')    
    cy.get('#password').type('sekret')    
    cy.get('#login-button').click()
    
    cy.contains('logged in')  
  })
  */

describe('Blog app', () => {

  beforeEach( () => {
    cy.request('POST', 'http://localhost:3004/api/testing/reset')
    const user = {
      name: 'Kshitiz',
      username: 'kshitiz',
      password: '@KV7%Er%68D4LR'
    }
    cy.request('POST', 'http://localhost:3004/api/users/', user)
    cy.visit('http://localhost:3000')
  })
  //Exercise 5.17 Start
  it('Login form is shown', () => {
    cy.contains('login')
  })
  //Exercise 5.17 End

  //Exercise 5.18 Start
  describe('Login',function() {
    it('succeeds with correct credentials', function() {

      cy.contains('login').click()
      cy.get('#username').type('kshitiz')    
      cy.get('#password').type('@KV7%Er%68D4LR')    
      cy.get('#login-button').click()
      
      cy.contains('Kshitiz logged in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('kshitiz')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'Kshitiz logged in')
    })
  })
  //Exercise 5.18 End

  //Exercise 5.19 Start
  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'kshitiz', password: '@KV7%Er%68D4LR' }) })
  

    it('A blog can be created', function() {
      cy.createBlog({ 
        title: 'Database Indexing with PostgreSQL', 
        author: 'Rinx', 
        url: 'https://dev.to/foxeyerinx/database-indexing-with-postgresql-eio', 
        likes: 0 })

      cy.contains('Database Indexing with PostgreSQL')
    })
  })
  //Exercise 5.19 End

  //Exercise 5.20 Start
  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'kshitiz', password: '@KV7%Er%68D4LR' }) })
  

    it('user can like a blog', function() {

      cy.createBlog({ 
        title: 'Database Indexing with PostgreSQL', 
        author: 'Rinx', 
        url: 'https://dev.to/foxeyerinx/database-indexing-with-postgresql-eio', 
        likes: 0 })
      
      cy.contains('view').click()
      cy.contains('like').click()
      
    })
  })
  //Exercise 5.20 End

  //Exercise 5.21 Start
  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'kshitiz', password: '@KV7%Er%68D4LR' }) })
  

    it('user who created a blog can delete it', function() {

      cy.createBlog({ 
        title: 'Database Indexing with PostgreSQL', 
        author: 'Rinx', 
        url: 'https://dev.to/foxeyerinx/database-indexing-with-postgresql-eio', 
        likes: 0 })
      
      cy.contains('view').click()
      cy.contains('remove').click()
    })
  })

  describe('When logged with another user', function() {
    beforeEach(function() {
      cy.login({ username: 'kshitiz', password: '@KV7%Er%68D4LR' }) 
      
      cy.createBlog({ 
        title: 'Database Indexing with PostgreSQL', 
        author: 'Rinx', 
        url: 'https://dev.to/foxeyerinx/database-indexing-with-postgresql-eio', 
        likes: 0 })
      
        cy.contains('Log out').click()
      
      const user = {
        name: 'Nischal',
        username: 'nischal',
        password: '@KV7%Er%68D4L4'
      }
      
      cy.request('POST', 'http://localhost:3004/api/users/', user)
      cy.login({ username: 'nischal', password: '@KV7%Er%68D4L4' })

    })
      
    it('other users cannot delete the blog', function() {
      
      cy.contains('view').click()
      cy.get('#remove-button').should('have.css', 'display', 'none')
    
    })    
  })
  //Exercise 5.21 End

  //Exercise 5.22 Start
  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'kshitiz', password: '@KV7%Er%68D4LR' }) })
  

    it.only('blogs are ordered according to likes in descending order', function() {

      cy.createBlog({ 
        title: 'Database Indexing with PostgreSQL', 
        author: 'Rinx', 
        url: 'https://dev.to/foxeyerinx/database-indexing-with-postgresql-eio', 
        likes: 9 })

      cy.createBlog({ 
        title: 'SQL Vs NoSQL', 
        author: 'Bek Brace', 
        url: 'https://dev.to/bekbrace/sql-vs-nosql-2nbe', 
        likes: 10 })

      cy.contains('Database Indexing with PostgreSQL')
        .contains('view')
        .click()
      
      cy.get('.url')
        .contains('Database Indexing with PostgreSQL')
        .contains('like')
        .click()
        .click()
      
      cy.reload()

      cy.get('.blog').eq(0).should('contain', 'Database Indexing with PostgreSQL')
      cy.get('.blog').eq(1).should('contain', 'SQL Vs NoSQL')
      
    })
  })

  //Exercise 5.22 End
  





})