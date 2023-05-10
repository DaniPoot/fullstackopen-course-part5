import { useState } from 'react'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}

const Blog = ({blog}) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

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
          <button type="submit">like</button>
        </div>
        <div>
          {blog.author}
        </div>
      </div>
    </div>  
  )
}

export default Blog