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

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, setToken }