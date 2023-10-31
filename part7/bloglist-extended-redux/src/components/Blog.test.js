import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import BlogForm from './BlogForm'

const blog = {
  'title': 'Go To Statement Considered Harmful',
  'author': 'Edsger W. Dijkstra',
  'url': 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
  'likes': 25,
  'user': {
    'username': 'kkarki',
    'name': 'Kshitiz Karki',
    'id': '65322cf6deb92df43b2e0799'
  },
}

// let container
beforeEach(() => {
  // container = render(<Blog blog={blog} />).container
})

test('renders blog\'s title and author but does not render its URL or number of likes by default', () => {
  const { container } = render(<Blog blog={blog} />)
  const div = container.querySelector('.titleAndAuthor')
  expect(div).toHaveTextContent(`${blog.title} ${blog.author}`)
  expect(div).not.toHaveStyle('display: none')
  expect(div).not.toHaveTextContent(blog.url)
  expect(div).not.toHaveTextContent(blog.likes)
})

test('clicking the "view" button renders blog\'s URL and number of likes', async () => {
  const { container } = render(<Blog blog={blog} />)
  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const div = container.querySelector('.allDetails')
  expect(div).not.toHaveStyle('display: none')
  expect(div).toHaveTextContent(blog.url)
  expect(div).toHaveTextContent(`likes ${blog.likes}`)
})

test('if the like button is clicked twice, the event handler the component received as props is called twice', async () => {
  const mockHandler = jest.fn()
  render(<button onClick={mockHandler}>like</button>)
  const user = userEvent.setup()
  const button = screen.getByText('like')
  await user.dblClick(button)

  expect(mockHandler.mock.calls).toHaveLength(2)
})

test('Blog form calls the event handler it received as props with the right details when a new blog is created', async () => {
  const user = userEvent.setup()
  const createBlog = jest.fn()

  render(<BlogForm createBlog={createBlog} />)

  const title = screen.getByPlaceholderText('title')
  const author = screen.getByPlaceholderText('author')
  const url = screen.getByPlaceholderText('url')

  const sendButton = screen.getByText('create')

  await user.type(title, blog.title)
  await user.type(author, blog.author)
  await user.type(url, blog.url)
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe(blog.title)
  expect(createBlog.mock.calls[0][0].author).toBe(blog.author)
  expect(createBlog.mock.calls[0][0].url).toBe(blog.url)
})