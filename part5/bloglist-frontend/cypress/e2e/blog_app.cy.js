describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    cy.createUser({ name: 'Superuser', username: 'root', password: 'aMsdH%#3j' })
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('root')
      cy.get('#password').type('aMsdH%#3j')
      cy.get('#login-button').click()

      cy.contains('Superuser logged in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('root')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'root', password: 'aMsdH%#3j' })
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()

      cy.get('#title').type('test title')
      cy.get('#author').type('test author')
      cy.get('#url').type('test url')
      cy.get('#create-button').click()

      cy.contains('test title')
    })

    describe('After a blog is created', () => {
      beforeEach(() => {
        cy.createBlog({
          title: 'test title',
          author: 'test author',
          url: 'test url'
        })
      })

      it('logged in user can like a blog', function() {
        cy.contains('view').click()
        cy.contains('like').click()
        cy.contains('likes 1')
      })

      it('user who created a blog can delete it', function() {
        cy.contains('view').click()
        cy.contains('remove').click()
        cy.contains('test title').should('not.exist')
      })

      it('only the user who created a blog can see the remove button', () => {
        cy.contains('view').click()
        cy.contains('remove')
        cy.contains('logout').click()

        cy.createUser({ name: 'Lionel Messi', username: 'messi', password: '***LM10***' })

        cy.get('#username').type('messi')
        cy.get('#password').type('***LM10***')
        cy.get('#login-button').click()

        cy.contains('view').click()
        cy.contains('remove').should('not.exist')
      })
    })

    it('blogs are ordered according to likes in descending order', () => {
      cy.createBlog({
        title: 'The title with the second most likes',
        author: 'test author',
        url: 'test url',
        likes: 5
      })

      cy.createBlog({
        title: 'The title with the most likes',
        author: 'test author',
        url: 'test url',
        likes: 10
      })

      cy.get('.blog').eq(0).should('contain', 'The title with the most likes')
      cy.get('.blog').eq(1).should('contain', 'The title with the second most likes')

      cy.get('.titleAndAuthor').eq(1).contains('view').click()

      for(let i=0; i<6; i++){
        cy.get('.blog').eq(1).contains('like').click()
        cy.wait(1000)
      }
      cy.get('.blog').eq(1).should('contain', 'The title with the most likes')
      cy.get('.blog').eq(0).should('contain', 'The title with the second most likes')
    })
  })
})