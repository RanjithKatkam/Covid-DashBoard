import {FaTwitter} from 'react-icons/fa'
import {FiInstagram} from 'react-icons/fi'
import {VscGithubAlt} from 'react-icons/vsc'
import './index.css'

const Footer = () => (
  <div className="footer-main-container">
    <h1 className="footer-logo-heading">
      <span className="covid19">COVID19</span>
      <span className="india">INDIA</span>
    </h1>
    <p className="footer-para">
      we stand with everyone fighting on the front lines
    </p>
    <div className="footer-icons-container">
      <VscGithubAlt color="#CBD5E1" size={30} />
      <FiInstagram color="#CBD5E1" size={30} />
      <FaTwitter color="#CBD5E1" size={30} />
    </div>
  </div>
)
export default Footer
