/* eslint-disable react/no-unknown-property */
import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import StateSpecificCards from '../StateSpecificCards'
import BarCharts from '../BarCharts'
import LineCharts from '../LineCharts'
import Footer from '../Footer'
import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
}

const statesList = [
  {
    state_code: 'AN',
    state_name: 'Andaman and Nicobar Islands',
  },
  {
    state_code: 'AP',
    state_name: 'Andhra Pradesh',
  },
  {
    state_code: 'AR',
    state_name: 'Arunachal Pradesh',
  },
  {
    state_code: 'AS',
    state_name: 'Assam',
  },
  {
    state_code: 'BR',
    state_name: 'Bihar',
  },
  {
    state_code: 'CH',
    state_name: 'Chandigarh',
  },
  {
    state_code: 'CT',
    state_name: 'Chhattisgarh',
  },
  {
    state_code: 'DN',
    state_name: 'Dadra and Nagar Haveli and Daman and Diu',
  },
  {
    state_code: 'DL',
    state_name: 'Delhi',
  },
  {
    state_code: 'GA',
    state_name: 'Goa',
  },
  {
    state_code: 'GJ',
    state_name: 'Gujarat',
  },
  {
    state_code: 'HR',
    state_name: 'Haryana',
  },
  {
    state_code: 'HP',
    state_name: 'Himachal Pradesh',
  },
  {
    state_code: 'JK',
    state_name: 'Jammu and Kashmir',
  },
  {
    state_code: 'JH',
    state_name: 'Jharkhand',
  },
  {
    state_code: 'KA',
    state_name: 'Karnataka',
  },
  {
    state_code: 'KL',
    state_name: 'Kerala',
  },
  {
    state_code: 'LA',
    state_name: 'Ladakh',
  },
  {
    state_code: 'LD',
    state_name: 'Lakshadweep',
  },
  {
    state_code: 'MH',
    state_name: 'Maharashtra',
  },
  {
    state_code: 'MP',
    state_name: 'Madhya Pradesh',
  },
  {
    state_code: 'MN',
    state_name: 'Manipur',
  },
  {
    state_code: 'ML',
    state_name: 'Meghalaya',
  },
  {
    state_code: 'MZ',
    state_name: 'Mizoram',
  },
  {
    state_code: 'NL',
    state_name: 'Nagaland',
  },
  {
    state_code: 'OR',
    state_name: 'Odisha',
  },
  {
    state_code: 'PY',
    state_name: 'Puducherry',
  },
  {
    state_code: 'PB',
    state_name: 'Punjab',
  },
  {
    state_code: 'RJ',
    state_name: 'Rajasthan',
  },
  {
    state_code: 'SK',
    state_name: 'Sikkim',
  },
  {
    state_code: 'TN',
    state_name: 'Tamil Nadu',
  },
  {
    state_code: 'TG',
    state_name: 'Telangana',
  },
  {
    state_code: 'TR',
    state_name: 'Tripura',
  },
  {
    state_code: 'UP',
    state_name: 'Uttar Pradesh',
  },
  {
    state_code: 'UT',
    state_name: 'Uttarakhand',
  },
  {
    state_code: 'WB',
    state_name: 'West Bengal',
  },
]

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

class StateDetails extends Component {
  state = {
    apiStatus: apiConstants.loading,
    stateName: '',
    formattedDate: '',
    totalTestedCases: '',
    cardActiveCases: '',
    cardConfirmedCases: '',
    cardDeceasedCases: '',
    cardRecoveredCases: '',
    selectedCardId: 'confirmed',
    topRecoveredCases: '',
    topConfirmedCases: '',
    topDeceasedCases: '',
    topActiveCases: '',
  }

  componentDidMount() {
    this.renderStateDetails()
  }

  renderStateDetails = async () => {
    this.setState({apiStatus: apiConstants.loading})
    const {match} = this.props
    const {params} = match
    const {stateCode} = params
    const url = `https://apis.ccbp.in/covid19-state-wise-data`
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    const responseData = await response.json()
    const requiredState = responseData[stateCode]
    const stateNameObject = statesList.filter(
      eachItem => eachItem.state_code === stateCode,
    )
    const stateName = stateNameObject[0].state_name
    const lastUpdated = requiredState.meta.last_updated
    const date = new Date(lastUpdated)
    const formattedDate = `Last updated on ${
      monthNames[date.getMonth()]
    } ${date.getDate()} ${date.getFullYear()}.`
    const totalTestedCases = requiredState.total.tested

    const cardConfirmedCases = requiredState.total.confirmed
    const cardActiveCases =
      requiredState.total.confirmed -
      (requiredState.total.deceased + requiredState.total.recovered)
    const cardRecoveredCases = requiredState.total.recovered
    const cardDeceasedCases = requiredState.total.deceased

    const listKeys = Object.keys(requiredState.districts)

    const confirmedCases = listKeys.map(eachItem => {
      const {total} = requiredState.districts[eachItem]
      return {
        stateName: eachItem,
        casesCount: total.confirmed ? total.confirmed : 0,
      }
    })
    const activeCases = listKeys.map(eachItem => {
      const {total} = requiredState.districts[eachItem]
      return {
        stateName: eachItem,
        casesCount:
          total.confirmed && total.recovered && total.deceased
            ? total.confirmed - (total.recovered + total.deceased)
            : 0,
      }
    })
    const recoveredCases = listKeys.map(eachItem => {
      const {total} = requiredState.districts[eachItem]
      return {
        stateName: eachItem,
        casesCount: total.recovered ? total.recovered : 0,
      }
    })
    const deceasedCases = listKeys.map(eachItem => {
      const {total} = requiredState.districts[eachItem]
      return {
        stateName: eachItem,
        casesCount: total.deceased ? total.deceased : 0,
      }
    })

    recoveredCases.sort((a, b) => b.casesCount - a.casesCount)
    confirmedCases.sort((a, b) => b.casesCount - a.casesCount)
    activeCases.sort((a, b) => b.casesCount - a.casesCount)
    deceasedCases.sort((a, b) => b.casesCount - a.casesCount)

    this.setState({
      stateName,
      formattedDate,
      totalTestedCases,
      cardActiveCases,
      cardConfirmedCases,
      cardDeceasedCases,
      cardRecoveredCases,
      topRecoveredCases: recoveredCases,
      topConfirmedCases: confirmedCases,
      topDeceasedCases: deceasedCases,
      topActiveCases: activeCases,
      apiStatus: apiConstants.success,
    })
  }

  onChangeSpecificCard = id => {
    this.setState({selectedCardId: id})
  }

  renderLoadingView = () => (
    <div testid="stateDetailsLoader" className="state-loader-container">
      <Loader type="Oval" color="#007BFF" height={50} />
    </div>
  )

  getStateDetails = () => {
    const {stateName, formattedDate, totalTestedCases} = this.state
    return (
      <div className="stateName-date-tested">
        <div>
          <div className="stateName">
            <h1 className="state-name">{stateName}</h1>
          </div>
          <p className="formatted-date">{formattedDate}</p>
        </div>
        <div>
          <p className="tested-heading">Tested</p>
          <p className="tested-count">{totalTestedCases}</p>
        </div>
      </div>
    )
  }

  getTopDistrictsDetails = () => {
    const {
      selectedCardId,
      topRecoveredCases,
      topConfirmedCases,
      topDeceasedCases,
      topActiveCases,
    } = this.state
    let headingStyle = null
    let requiredTopDistrictsList = null

    if (selectedCardId === 'confirmed') {
      headingStyle = 'confirmedHeading'
      requiredTopDistrictsList = topConfirmedCases
    } else if (selectedCardId === 'active') {
      headingStyle = 'activeHeading'
      requiredTopDistrictsList = topActiveCases
    } else if (selectedCardId === 'recovered') {
      headingStyle = 'recoveredHeading'
      requiredTopDistrictsList = topRecoveredCases
    } else {
      headingStyle = 'deceasedHeading'
      requiredTopDistrictsList = topDeceasedCases
    }

    return (
      <>
        <h1 className={`top-districts-heading ${headingStyle}`}>
          Top Districts
        </h1>
        <ul
          testid="topDistrictsUnorderedList"
          className="top-districts-list-container"
        >
          {requiredTopDistrictsList.map(eachItem => (
            <li key={eachItem.stateName} className="count-stateName">
              <p className="top-dist-count">{eachItem.casesCount}</p>
              <p className="top-dist-state">{eachItem.stateName}</p>
            </li>
          ))}
        </ul>
      </>
    )
  }

  renderSuccessView = () => {
    const {
      cardActiveCases,
      cardConfirmedCases,
      cardDeceasedCases,
      cardRecoveredCases,
      selectedCardId,
    } = this.state
    const {match} = this.props
    const {params} = match
    const {stateCode} = params
    return (
      <div className="state-details-sub-container">
        {this.getStateDetails()}
        <div className="select-category-container">
          <StateSpecificCards
            onChangeSpecificCard={this.onChangeSpecificCard}
            details={
              (cardActiveCases,
              cardConfirmedCases,
              cardDeceasedCases,
              cardRecoveredCases)
            }
            selectedCardId={selectedCardId}
          />
        </div>
        <div className="top-districts-details">
          {this.getTopDistrictsDetails()}
        </div>
        <div className="charts-container">
          <BarCharts stateCode={stateCode} selectedCardId={selectedCardId} />
          <h1 className="daily-spread-heading">Daily Spread Trends</h1>
          <LineCharts stateCode={stateCode} />
        </div>
        <Footer />
      </div>
    )
  }

  renderStateRoute = () => {
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
      <div className="state-details-main-container">
        <Header />
        {this.renderStateRoute()}
      </div>
    )
  }
}

export default StateDetails
