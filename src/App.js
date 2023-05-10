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
      blogService.getAll().then(blogs =>
        setBlogs( blogs )
      )
    }
  }, [user])

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
    blogService.getAll().then(blogs => setBlogs( blogs ))
    blogFormRef.current.toggleVisibility()
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
        <FormBlog onError={onError} onUpdate={onUpdate} userId={user.id}/>
      </Togglable>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App