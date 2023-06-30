import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import './index.css'

class Header extends Component {
  render() {
    const {location} = this.props
    return (
      <nav className="header-main-container">
        <div className="logo-name-container">
          <Link className="link" to="/">
            <span className="covid19">COVID19</span>
            <span className="india">INDIA</span>
          </Link>
        </div>
        <ul className="nav-list-container">
          <Link className="link" to="/">
            <li>
              <button
                className={
                  location.pathname === '/' ||
                  location.pathname.includes('/state')
                    ? 'active-header-link-name header-button'
                    : 'non-active-header-link-name header-button'
                }
                type="button"
              >
                Home
              </button>
            </li>
          </Link>
          <Link className="link" to="/about">
            <li>
              <button
                className={
                  location.pathname === '/about'
                    ? 'active-header-link-name header-button'
                    : 'non-active-header-link-name header-button'
                }
                type="button"
              >
                About
              </button>
            </li>
          </Link>
        </ul>
      </nav>
    )
  }
}

export default withRouter(Header)
