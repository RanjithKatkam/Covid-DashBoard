import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="notfound-main-container">
    <img
      src="https://res.cloudinary.com/dwgg5pyqk/image/upload/v1687447019/Group_7484_wsenjz.png"
      alt="not-found-pic"
    />
    <h1 className="notfound-heading">PAGE NOT FOUND</h1>
    <p className="notfound-para">
      we are sorry, the page you requested could not be found
    </p>
    <Link to="/">
      <button className="home-button" type="button">
        Home
      </button>
    </Link>
  </div>
)

export default NotFound
