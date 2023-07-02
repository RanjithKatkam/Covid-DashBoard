import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {AiOutlineMenuFold, AiOutlineCloseCircle} from 'react-icons/ai'
import './index.css'

class Header extends Component {
  state = {displayMenu: false}

  onClickToggleButton = () => {
    this.setState(prev => ({displayMenu: !prev.displayMenu}))
  }

  render() {
    const {location} = this.props
    const {displayMenu} = this.state
    return (
      <>
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
          <div className="small-device-toggle-menu">
            <button
              className="toggleButton"
              onClick={this.onClickToggleButton}
              type="button"
            >
              <AiOutlineMenuFold size={25} color="white" />
            </button>
          </div>
        </nav>
        {displayMenu && (
          <div className="toggle-menu">
            <ul className="small-device-nav-list-container">
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
              <li className="cross-button-list">
                <button
                  onClick={this.onClickToggleButton}
                  className="cross-button"
                  type="button"
                >
                  <AiOutlineCloseCircle size={22} color="white" />
                </button>
              </li>
            </ul>
          </div>
        )}
      </>
    )
  }
}

export default withRouter(Header)
