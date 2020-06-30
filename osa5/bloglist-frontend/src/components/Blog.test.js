import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

// Tehtävät 5.13 - 5.15

describe('<Blog />', () => {
  let component

  beforeEach(() => {
    const blog = {
      title: 'testing components by',
      author: 'aleksi',
      likes: 0,
      url: 'url.com',
      user: {
        name: 'testaaja',
        username: 'tester'
      }
    }
    const currentUser = {
      name: 'testaaja',
      username: 'tester'
    }
    component = render(
      <Blog blog={blog} currentUser={currentUser} />
    )

  })

  test('render blog', () => {

    expect(component.container).toHaveTextContent(
      'testing components by', 'aleksi'
    )
    const div = component.container.querySelector('.togglableDiv')
    expect(div).toHaveStyle('display: none')

  })

  test('render all info in blog when button is pressed', () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    const div = component.container.querySelector('.togglableDiv')
    expect(div).not.toHaveStyle('display: none')
  })
})

test('like button eventhandler is called twice', () => {
  const blog = {
    title: 'testing components by',
    author: 'aleksi',
    likes: 0,
    url: 'url.com',
    user: {
      name: 'testaaja',
      username: 'tester'
    }
  }
  const currentUser = {
    name: 'testaaja',
    username: 'tester'
  }

  const mockHandler = jest.fn()
  const component = render(
    <Blog blog={blog} currentUser={currentUser} likeHandler={mockHandler}/>
  )

  const button = component.getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)
})
