// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import PropTypes from 'prop-types'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}

const Blog = ({ blog, update, updateBlog, removeBlog }) => {
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }

  const like = async () => {
    const likes = blog.likes + 1
    const newBlog = { ...blog, likes }
    await updateBlog(blog.id, newBlog)
    update()
  }

  const remove = async event => {
    event.preventDefault()
    if (window.confirm(`remove blog ${blog.title}) by ${blog.author}`)) {
      await removeBlog(blog.id)
      update()
    }
  }

  return (
    <div style={blogStyle} className='blog'>
      <div>
        <span className='blog-title'>
          {blog.title}
        </span>
        <button onClick={() => setVisible(!visible)} > { visible ? 'hide' : 'view' } </button>
      </div>
      <div style={showWhenVisible} className='blog-info'>
        <a href={blog.url}> {blog.url} </a>
        <div>
          <span className='blog-likes'>
            {blog.likes} likes
          </span>
          <button className='blog-like-button' onClick={like}>like</button>
        </div>
        <div onClick={remove}>
          <button className='removeButton' type="submit">remove</button>
        </div>
      </div>
      <div className='blog-author'>
        {blog.author}
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  update: PropTypes.func.isRequired
}

export default Blog
