import { useState } from "react"
import blogService from '../services/blogs'

export default function FormBlog({ userId, onUpdate, onError }) {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const onChangeTitle = (event) => {
    const value = event.target.value
    setTitle(value)
  }
  const onChangeAuthor = (event) => {
    const value = event.target.value
    setAuthor(value)
  }
  const onChangeUrl = (event) => {
    const value = event.target.value
    setUrl(value)
  }

  const setDefaulValues = () => {
    setTitle('')
    setAuthor('')
    setUrl('')
  }
  const onSubmit = async (event) => {
    event.preventDefault()
    const blog = {
      title,
      author,
      url,
      userId
    }
    try {
      await blogService.create(blog)
      onUpdate()
    } catch (error) {
      onError(error)
    }
    setDefaulValues()
  }


  return (
    <div>
      <h2>Create a new</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label>title:</label>
          <input
            type="text"
            value={title}
            onChange={onChangeTitle}
          />
        </div>
        <div>
          <label>author:</label>
          <input
            type="text"
            value={author}
            onChange={onChangeAuthor}
          />
        </div>
        <div>
          <label>url:</label>
          <input 
            type="text"
            value={url}
            onChange={onChangeUrl}
          />
        </div>

        <button type="submit">Create</button>
      </form>
    </div>
  )
}
