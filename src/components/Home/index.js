/* eslint-disable react/no-unknown-property */
import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import {BiChevronRightSquare} from 'react-icons/bi'
import {FcGenericSortingAsc, FcGenericSortingDesc} from 'react-icons/fc'
import Header from '../Header'
import Footer from '../Footer'
import ListItem from '../ListItem'
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

class Home extends Component {
  state = {
    apiStatus: apiConstants.initial,
    activeCases: 0,
    confirmedCases: 0,
    recoveredCases: 0,
    deceasedCases: 0,
    districtCasesList: [],
    searchedInputList: [],
    searchInput: '',
  }

  componentDidMount() {
    this.renderHomeDetails()
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value}, this.renderSearchedResult)
  }

  onClickSortAsAscOrder = () => {
    const {districtCasesList} = this.state
    const ascOrderList = []
    const firstObject = districtCasesList[0]
    if (firstObject.stateName.startsWith('A')) {
      this.setState({districtCasesList})
    } else {
      districtCasesList.map(eachItem => ascOrderList.unshift(eachItem))
      this.setState({districtCasesList: ascOrderList})
    }
  }

  onClickSortAsDescOrder = () => {
    const {districtCasesList} = this.state
    const descOrderList = []
    const firstObject = districtCasesList[0]
    if (firstObject.stateName.startsWith('W')) {
      this.setState({districtCasesList})
    } else {
      districtCasesList.map(eachItem => descOrderList.unshift(eachItem))
      this.setState({districtCasesList: descOrderList})
    }
  }

  renderSearchedResult = () => {
    const {searchInput, districtCasesList} = this.state

    const searchList = districtCasesList.filter(eachItem =>
      eachItem.stateName.toLowerCase().includes(searchInput.toLowerCase()),
    )
    this.setState({searchedInputList: searchList})
  }

  renderHomeDetails = async () => {
    this.setState({apiStatus: apiConstants.loading})
    const url = 'https://apis.ccbp.in/covid19-state-wise-data'
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    const responseData = await response.json()
    let totalConfirmed = 0
    let totalDeceased = 0
    let totalRecovered = 0
    let totalActive = 0
    statesList.forEach(eachState => {
      const {total} = responseData[eachState.state_code]
      totalConfirmed += total.confirmed ? total.confirmed : 0
      totalDeceased += total.deceased ? total.deceased : 0
      totalRecovered += total.recovered ? total.recovered : 0
    })
    totalActive += totalConfirmed - (totalRecovered + totalDeceased)

    const listOfCasesOfDistricts = statesList.map(eachState => {
      const {total} = responseData[eachState.state_code]
      const {meta} = responseData[eachState.state_code]
      return {
        stateName: eachState.state_name,
        stateCode: eachState.state_code,
        confirmed: total.confirmed ? total.confirmed : 0,
        deceased: total.deceased ? total.deceased : 0,
        recovered: total.recovered ? total.recovered : 0,
        active: total.confirmed - (total.recovered + total.deceased),
        population: meta.population,
      }
    })
    console.log(statesList.length, responseData)

    this.setState({
      activeCases: totalActive,
      confirmedCases: totalConfirmed,
      deceasedCases: totalDeceased,
      recoveredCases: totalRecovered,
      apiStatus: apiConstants.success,
      districtCasesList: listOfCasesOfDistricts,
    })
  }

  renderLoadingView = () => (
    <div testid="homeRouteLoader" className="home-loader-container">
      <Loader type="Oval" color="#007BFF" height={50} />
    </div>
  )

  renderSuccessView = () => {
    const {
      activeCases,
      recoveredCases,
      confirmedCases,
      deceasedCases,
      districtCasesList,
      searchedInputList,
      searchInput,
    } = this.state
    return (
      <div className="success">
        <div className="search-input-container">
          <BsSearch size={24} color=" #94a3b8" />
          <input
            className="search-input"
            placeholder="Enter the state"
            type="search"
            value={searchInput}
            onChange={this.onChangeSearchInput}
          />
        </div>
        {searchedInputList.length > 0 && searchInput !== '' ? (
          <ul
            className="searched-container"
            testid="searchResultsUnorderedList"
          >
            {searchedInputList.map(eachItem => (
              <Link className="search-link" to={`/state/${eachItem.stateCode}`}>
                <li className="search-listItem" key={eachItem.stateCode}>
                  <div>{eachItem.stateName}</div>
                  <div className="search-list-div">
                    <h1 className="search-stateCode">{eachItem.stateCode}</h1>
                    <BiChevronRightSquare color="#FACC15" size={23} />
                  </div>
                </li>
              </Link>
            ))}
          </ul>
        ) : null}
        <div className="covid-cases-details-container">
          <div
            testid="countryWideConfirmedCases"
            className="confirmed-cases-container"
          >
            <p className="confirmed-cases-heading">Confirmed</p>
            <img
              src="https://res.cloudinary.com/dwgg5pyqk/image/upload/v1687427024/check-mark_1_iedze6.png"
              alt="country wide confirmed cases pic"
            />
            <p className="confirmed-cases-para">{confirmedCases}</p>
          </div>
          <div
            testid="countryWideActiveCases"
            className="confirmed-cases-container"
          >
            <p className="active-cases-heading">Active</p>
            <img
              src="https://res.cloudinary.com/dwgg5pyqk/image/upload/v1687427084/protection_1_q15oqc.png"
              alt="country wide active cases pic"
            />
            <p className="active-cases-para">{activeCases}</p>
          </div>
          <div
            testid="countryWideRecoveredCases"
            className="confirmed-cases-container"
          >
            <p className="recovered-cases-heading">Recovered</p>
            <img
              src="https://res.cloudinary.com/dwgg5pyqk/image/upload/v1687427084/recovered_1_bhbphf.png"
              alt="country wide recovered cases pic"
            />
            <p className="recovered-cases-para">{recoveredCases}</p>
          </div>
          <div
            testid="countryWideDeceasedCases"
            className="confirmed-cases-container"
          >
            <p className="deceased-cases-heading">Deceased</p>
            <img
              src="https://res.cloudinary.com/dwgg5pyqk/image/upload/v1687427094/breathing_1_dqkfdm.png"
              alt="country wide deceased cases pic"
            />
            <p className="deceased-cases-para">{deceasedCases}</p>
          </div>
        </div>
        <div
          testid="stateWiseCovidDataTable"
          className="stateWise-table-container"
        >
          <div className="table-list-headings">
            <div>
              <p className="state-table-heading">States/UT</p>
              <div>
                <button
                  className="sort-buttons"
                  type="button"
                  testid="ascendingSort"
                  onClick={this.onClickSortAsAscOrder}
                >
                  <FcGenericSortingAsc size={20} color="#94A3B8" />
                </button>
                <button
                  className="sort-buttons"
                  type="button"
                  testid="descendingSort"
                  onClick={this.onClickSortAsDescOrder}
                >
                  <FcGenericSortingDesc size={20} color="#94A3B8" />
                </button>
              </div>
            </div>
            <p className="confirmed-table-heading">Confirmed</p>
            <p className="active-table-heading">Active</p>
            <p className="recovered-table-heading">Recovered</p>
            <p className="deceased-table-heading">Deceased</p>
            <p className="pop-table-heading">Population</p>
          </div>
          <ul className="list-of-tables">
            {districtCasesList.map(eachState => (
              <ListItem details={eachState} key={eachState.stateCode} />
            ))}
          </ul>
        </div>
        <div className="home-footer-container">
          <Footer />
        </div>
      </div>
    )
  }

  renderHome = () => {
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
      <div className="home-main-container">
        <Header />
        {this.renderHome()}
      </div>
    )
  }
}

export default Home
