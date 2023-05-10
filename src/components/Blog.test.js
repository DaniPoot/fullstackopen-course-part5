/**
 * @jest-environment jsdom
 */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import Blog from './Blog'

afterEach(cleanup)
describe.only('<Blog />', () => {
  let component
  let mockHandler

  beforeEach(() => {
    const blog = {
      author: 'Daniel Poot',
      id: '63e03d10ae76f36e400ae7ea',
      likes: 19,
      title: "Title for Blog",
      url : ""
    }

    mockHandler = jest.fn()
    component = render(
      <Blog
        blog={blog}
        update={mockHandler}
      />
    )
  })

  it('renders its title', () => {
    const span = component.container.querySelector('.blog-title')
    const info = component.container.querySelector('.blog-info')

    expect(span).toHaveTextContent('Title for Blog')
    expect(info).toHaveStyle('display: none')
  })

  it('renders its author', () => {
    const div = component.container.querySelector('.blog-author')
    const info = component.container.querySelector('.blog-info')

    expect(div).toHaveTextContent('Daniel Poot')
    expect(info).toHaveStyle('display: none')
  })

  it('click shows more', () => {
    const button = component.getByText('view')
    fireEvent.click(button)
    const div = component.container.querySelector('.titleauthorlikedelete')
    const likes = component.container.querySelector('.blog-likes')

    expect(likes).toHaveTextContent('19 likes')
  })
})