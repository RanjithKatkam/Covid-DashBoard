/* eslint-disable react/no-unknown-property */
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
}

class About extends Component {
  state = {aboutSectionList: [], apiStatus: apiConstants.initial}

  componentDidMount() {
    this.renderAboutSection()
  }

  renderAboutSection = async () => {
    this.setState({apiStatus: apiConstants.loading})
    const url = 'https://apis.ccbp.in/covid19-faqs'
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()
      this.setState({
        aboutSectionList: data.faq,
        apiStatus: apiConstants.success,
      })
    }
  }

  renderLoadingView = () => (
    <div testid="aboutRouteLoader" className="loader-container">
      <Loader type="Oval" color="#007BFF" height={50} />
    </div>
  )

  renderSuccessView = () => {
    const {aboutSectionList} = this.state
    return (
      <div className="about">
        <h1 className="about-heading">About</h1>
        <p className="about-para">Lat update on march 28th 2021</p>
        <h1 className="about-sub-heading">
          COVID-19 vaccines be ready for distribution
        </h1>
        <ul testid="faqsUnorderedList" className="questions-list">
          {aboutSectionList.map(eachItem => (
            <li key={eachItem.question}>
              <p className="question">{eachItem.question}</p>
              <p className="answer">{eachItem.answer}</p>
            </li>
          ))}
        </ul>
        <div className="footer-container">
          <Footer />
        </div>
      </div>
    )
  }

  renderAbout = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiConstants.loading:
        return this.renderLoadingView()
      case apiConstants.success:
        return this.renderSuccessView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="about-main-container">
        <Header />
        {this.renderAbout()}
      </div>
    )
  }
}

export default About
