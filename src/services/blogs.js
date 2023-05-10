import axios from 'axios'
const baseUrl = '/api/blogs'
let token = null

const setToken = newToken => {
  console.log({ newToken })
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const config = {
    headers: { authorization: token },
  }
  const request = axios.get(baseUrl, config)
  return request.then(response => response.data)
}

const create = async (blog) => {
  const config = {
    headers: { authorization: token },
  }
  const request = await axios.post(baseUrl, blog, config)
  return request.data
}

const update = (id, newObject) => {
  const config = {
    headers: { authorization: token },
  }
  const request = axios.put(`${baseUrl}/${id}`, newObject, config)
  return request.then(response => response.data)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, update, setToken }