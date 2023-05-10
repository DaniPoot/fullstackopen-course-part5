import PropTypes from 'prop-types'

export const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={ type }>
      {message}
    </div>
  )
}

Notification.propTypes = {
  message: PropTypes.string,
  type: PropTypes.string
}
