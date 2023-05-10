import { useState } from 'react'
import blogService from '../services/blogs'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}

const Blog = ({blog, update}) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const like = async event => {
    const likes = blog.likes + 1
    const newBlog = { ...blog, likes }
    await blogService.update(blog.id, newBlog)
    update()
  }

  const remove = async event => {
    event.preventDefault()
    if (window.confirm(`remove blog ${blog.title}) by ${blog.author}`)) {
      await blogService.remove(blog.id)
      update()
    }
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title}
        <button onClick={() => setVisible(!visible)} > { visible ? 'hide' : 'view' } </button>
      </div>
      <div style={showWhenVisible}>
        <a href={blog.url}> {blog.url} </a> 
        <div>
          {blog.likes} likes
          <button onClick={like}>like</button>
        </div>
        <div>
          {blog.author}
        </div>
        <div onClick={remove}>
          <button type="submit">remove</button>
        </div>
      </div>
    </div>  
  )
}

export default Blog