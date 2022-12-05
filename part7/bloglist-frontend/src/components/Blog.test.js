import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import Togglable from './Togglable'
import BlogForm from './BlogForm'

/*
test('renders content', () => {
  const blog = {
    title: 'Linux Date Command - How to Query the Terminal to Get Dates',
    author: 'Arunachalam B',
    url: 'https://www.freecodecamp.org/news/how-to-query-the-terminal-to-get-dates-linux/',
    likes: 0,
    user: '63720f8750a4f1b558f68d68'
  }

  render(<Blog blog={blog} />)

  const element = screen.getByText('Linux Date Command - How to Query the Terminal to Get Dates - Arunachalam B')

  expect(element).toBeDefined()
})

describe('<Togglable />', () => {
  let container

  beforeEach(() => {
    container = render(
      <Togglable buttonLabel="show...">
        <div className="testDiv" >
          togglable content
        </div>
      </Togglable>
    ).container
  })

  test('renders its children', async () => {
    await screen.findAllByText('togglable content')
  })

  test('at start the children are not displayed', () => {
    const div = container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
  })

  test('after clicking the button, children are displayed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('show...')
    await user.click(button)

    const div = container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
  })

  test('toggled content can be closed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('show...')
    await user.click(button)

    const closeButton = screen.getByText(/cancel/i)
    await user.click(closeButton)

    const div = container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
  })

})
*/

//  Exercise 5.13 Start
test("renders the blog's title and author, but does not render its url or number of likes by default", () => {
    const blog = {
        title: 'Linux Date Command - How to Query the Terminal to Get Dates',
        author: 'Arunachalam B',
        url: 'https://www.freecodecamp.org/news/how-to-query-the-terminal-to-get-dates-linux/',
        likes: 0,
        user: '63720f8750a4f1b558f68d68',
    }

    const { container } = render(<Blog blog={blog} />)
    const titleAndBlog = container.querySelector('.blog')
    expect(titleAndBlog).toHaveTextContent(
        'Linux Date Command - How to Query the Terminal to Get Dates - Arunachalam B'
    )

    //screen.debug()
    const urlAndLikes = container.querySelector('.url')
    expect(urlAndLikes).toHaveStyle('display: none')
})
//  Exercise 5.13 End

//  Exercise 5.14 Start
test("blog's url and number of likes are shown when the button controlling the shown details has been clicked", async () => {
    const blog = {
        title: 'Linux Date Command - How to Query the Terminal to Get Dates',
        author: 'Arunachalam B',
        url: 'https://www.freecodecamp.org/news/how-to-query-the-terminal-to-get-dates-linux/',
        likes: 0,
        user: '63720f8750a4f1b558f68d68',
    }

    const { container } = render(<Blog blog={blog} />)

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const urlAndLikes = container.querySelector('.url')
    expect(urlAndLikes).toHaveStyle('display: block')
})
//  Exercise 5.14 End

//  Exercise 5.15 Start
test('like button is clicked twice', async () => {
    const blog = {
        title: 'Linux Date Command - How to Query the Terminal to Get Dates',
        author: 'Arunachalam B',
        url: 'https://www.freecodecamp.org/news/how-to-query-the-terminal-to-get-dates-linux/',
        likes: 0,
        user: '63720f8750a4f1b558f68d68',
    }

    const mockHandler = jest.fn()

    render(<Blog blog={blog} addLike={mockHandler} />)

    const user = userEvent.setup()
    const button = screen.getByText('like')
    await user.click(button)
    await user.click(button)

    expect(mockHandler.mock.calls).toHaveLength(2)
})
//  Exercise 5.15 End

//  Exercise 5.16 Start
test('form calls the event handler it received as props with the right details when a new blog is created', async () => {
    const createBlog = jest.fn()

    render(<BlogForm createBlog={createBlog} />)

    const inputTitle = screen.getByRole('textbox', { name: /title/i })
    const inputAuthor = screen.getByRole('textbox', { name: /author/i })
    const inputUrl = screen.getByRole('textbox', { name: /url/i })

    const sendButton = screen.getByText(/create/i, { selector: 'button' })

    const user = userEvent.setup()
    await user.type(inputTitle, 'title')
    await user.type(inputAuthor, 'author')
    await user.type(inputUrl, 'url')
    await user.click(sendButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('title')
    expect(createBlog.mock.calls[0][0].author).toBe('author')
    expect(createBlog.mock.calls[0][0].url).toBe('url')
})

//  Exercise 5.16 End
