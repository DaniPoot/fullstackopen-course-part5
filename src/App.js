import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import { Togglable } from "./components/Togglable"
import FormBlog from './components/FormBlog'
import blogService from './services/blogs'
import loginService from './services/login'
import { Notification } from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [message, setMessage] = useState(null)
  const [type, setType] = useState('')
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  useEffect(() => {
    if (user !== null) {
      updateBlogList()
    }
  }, [user])

  function updateBlogList () {
    blogService.getAll().then(blogs => {
      const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
      setBlogs( sortedBlogs )
    })
  }

 async function handleLogin (event) {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
    } catch (exception) {
      setNotification('Wron username and password', 'error')
    }
  }

  async function updateBlog (id, newBlog) {
    await blogService.update(id, newBlog)
  }

  async function removeBlog (id) {
    await blogService.remove(id)
  }

  const setNotification = (message, notificationType) => {
    setMessage(message)
    setType(notificationType)

    setTimeout(() => {
      setMessage(null)
      setType(null)
    }, 5000)
  }

  function logout () {
    setUser(null)
    window.localStorage.removeItem('loggedUser')
  }

  function onError (error) {
    setNotification('Error on create a new blog', 'error')
  }

  function onUpdate (blog) {
    setNotification(`a new blog ${blog.title} by ${blog.author}`, 'success')
    updateBlogList()
    blogFormRef.current.toggleVisibility()
  }
  
  const createBlog = async (blog) => {
    try {
      await blogService.create({ ...blog, userId: user.id })
      onUpdate(blog)
    } catch (error) {
      onError(error)
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={message} type={type} />
        <form onSubmit={handleLogin}>
          <div>
            username
              <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
              <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} type={type} />
      <div>
        <p>
          { user.name } logged in
          <button onClick={logout}>logout</button>
        </p>
      </div>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <FormBlog createBlog={createBlog} />
      </Togglable>

      {blogs.map(blog =>
        <Blog 
          key={blog.id}
          blog={blog} 
          update={updateBlogList}
          updateBlog={updateBlog}
          removeBlog={removeBlog}
          />
      )}
    </div>
  )
}

export default App