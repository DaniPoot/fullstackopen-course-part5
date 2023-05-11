// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import PropTypes from 'prop-types'

export default function FormBlog({ createBlog }) {
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
      url
    }
    await createBlog(blog)
    setDefaulValues()
  }


  return (
    <div>
      <h2>Create a new</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label>title:</label>
          <input
            id="title"
            placeholder="Blog title"
            type="text"
            value={title}
            onChange={onChangeTitle}
          />
        </div>
        <div>
          <label>author:</label>
          <input
            id="author"
            placeholder="Blog author"
            type="text"
            value={author}
            onChange={onChangeAuthor}
          />
        </div>
        <div>
          <label>url:</label>
          <input
            id="url"
            placeholder="Blog url"
            type="text"
            value={url}
            onChange={onChangeUrl}
          />
        </div>

        <button id='publish-button' type="submit">Create</button>
      </form>
    </div>
  )
}

FormBlog.propTypes = {
  createBlog: PropTypes.func.isRequired
}
