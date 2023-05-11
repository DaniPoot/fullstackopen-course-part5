describe('Bloglist app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    const user = {
      name: 'Administrator',
      username: 'admin',
      password: 'password'
    }

    cy.request('POST', 'http://localhost:3003/api/users/', user)

    cy.visit('http://localhost:3000')
  })

  it('Front page can be opened', function() {
    cy.contains('Log in to application')
  })

  it('user can login', function () {
    cy.get('#username').type('admin')
    cy.get('#password').type('password')

    cy.get('#login-button').click()

    cy.contains('Administrator logged in')
  })

  it('login fails with wrong password', function() {
    cy.get('#username').type('admin')
    cy.get('#password').type('password2')

    cy.get('#login-button').click()

    cy.contains('Wron username and password')
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('admin')
      cy.get('#password').type('password')

      cy.get('#login-button').click()
    })

    it('a new blog can be created and its contents shown', function() {
      cy.contains('new blog').click()

      cy.get('#title').type('Test blog title')
      cy.get('#author').type('Test blog author')
      cy.get('#url').type('Test blog url')

      cy.get('#publish-button').click()

      cy.contains('a new blog Test blog title by Test blog author')
    })

    describe('With an existing note', function() {
      beforeEach(function() {
        cy.contains('new blog').click()

        cy.get('#title').type('Test blog title 2')
        cy.get('#author').type('Test blog author 2')
        cy.get('#url').type('Test blog url 2')

        cy.get('#publish-button').click()
      })

      it('A blog can be liked', function() {
        cy.get('#blogs').children().first().as('blog')
        cy.get('@blog').contains('view').click()
        cy.get('@blog').find('.blog-likes').contains('0 likes')
        // .contains('likes 0')
        cy.contains('Test blog title 2').get('.blog-like-button').click()
        cy.get('@blog').find('.blog-likes').contains('1 likes')
      })

      it('A blog can be deleted', function() {
        cy.get('#blogs').children().first().as('blog')
        cy.get('@blog').contains('view').click()
        cy.contains('Test blog title 2')
        cy.get('@blog').find('.removeButton').click()
        cy.contains('Deleted successfully')
        cy.contains('Test blog title 2').should('not.exist')
      })

      it('Remove button is only seen by the owner', function() {
        cy.get('#logout-button').click()

        const user2 = {
          name: 'otheruser',
          username: 'otheruser',
          password: 'password'
        }

        cy.request('POST', 'http://localhost:3003/api/users/', user2)

        cy.get('#username').type('otheruser')
        cy.get('#password').type('password')

        cy.get('#login-button').click()

        cy.contains('otheruser logged in')

        cy.contains('Test blog title 2').contains('view').click()

        cy.contains('Test blog title 2').get('.removeButton').should('not.exist')
      })

      it('Blogs are ordered as they should', function() {
        cy.contains('new blog').click()

        cy.get('#title').type('Test blog title 3')
        cy.get('#author').type('Test blog author 3')
        cy.get('#url').type('Test blog url 3')

        cy.get('#publish-button').click()

        cy.contains('new blog').click()

        cy.get('#title').type('Test blog title 4')
        cy.get('#author').type('Test blog author 4')
        cy.get('#url').type('Test blog url 4')

        cy.get('#publish-button').click()

        // Check initial order

        cy.get('.blog').eq(0).contains('Show').click()
        cy.get('.blog').eq(0).should('contain', 'Test blog title 2')
        cy.get('.blog').eq(0).should('contain', '0 likes')

        cy.get('.blog').eq(1).contains('Show').click()
        cy.get('.blog').eq(1).should('contain', 'Test blog title 3')
        cy.get('.blog').eq(1).should('contain', '0 likes')

        cy.get('.blog').eq(2).contains('Show').click()
        cy.get('.blog').eq(2).should('contain', 'Test blog title 4')
        cy.get('.blog').eq(2).should('contain', '0 likes')

        // Like things to change order

        // Blog 4 moves to top
        cy.get('.blog').eq(2).within(() => {
          cy.get('.blog-like-button').click()
        })
        cy.get('.blog').eq(0).within(() => {
          cy.get('.blog-like-button').click()
        })

        cy.get('.blog').eq(0).should('contain', 'Test blog title 4')
        cy.get('.blog').eq(0).should('contain', '2 likes')

        // Blog 3 moves to middle

        cy.get('.blog').eq(2).within(() => {
          cy.get('.blog-like-button').click()
        })

        cy.get('.blog').eq(1).should('contain', 'Test blog title 3')
        cy.get('.blog').eq(1).should('contain', '1 likes')
      })
    })
  })
})