/* eslint-disable react/no-unknown-property */
import {Component} from 'react'
import {LineChart, XAxis, YAxis, Tooltip, Line} from 'recharts'
import Loader from 'react-loader-spinner'
import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
}

class LineCharts extends Component {
  state = {
    apiStatus: apiConstants.initial,
    confirmedData: [],
    activeData: [],
    recoveredData: [],
    deceasedData: [],
    testedData: [],
  }

  componentDidMount() {
    this.renderDetails()
  }

  renderDetails = async () => {
    this.setState({apiStatus: apiConstants.loading})
    const {stateCode} = this.props

    const url = 'https://apis.ccbp.in/covid19-timelines-data'
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    const responseObjectKeys = Object.keys(data[`${stateCode}`].dates)

    const confirmedData = []
    const activeData = []
    const recoveredData = []
    const deceasedData = []
    const testedData = []

    responseObjectKeys.forEach(eachDate => {
      const requiredData = data[`${stateCode}`].dates[eachDate].total

      confirmedData.push({
        date: eachDate,
        count: requiredData.confirmed,
      })
      activeData.push({
        date: eachDate,
        count:
          requiredData.confirmed -
          (requiredData.recovered + requiredData.deceased),
      })
      recoveredData.push({
        date: eachDate,
        count: requiredData.recovered,
      })
      deceasedData.push({
        date: eachDate,
        count: requiredData.deceased,
      })
      testedData.push({
        date: eachDate,
        count: requiredData.tested,
      })
    })
    this.setState({
      confirmedData,
      activeData,
      recoveredData,
      deceasedData,
      testedData,
      apiStatus: apiConstants.success,
    })
    console.log(confirmedData, testedData)
  }

  renderLoadingView = () => (
    <div testid="timelinesDataLoader" className="state-loader-container">
      <Loader type="Oval" color="#007BFF" height={50} />
    </div>
  )

  renderSuccessView = () => {
    const {
      confirmedData,
      testedData,
      activeData,
      recoveredData,
      deceasedData,
    } = this.state

    return (
      <div testid="lineChartsContainer" className="chartsList-container">
        <div className="confirmed-chart-container">
          <LineChart
            width={1200}
            height={250}
            data={confirmedData}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}
          >
            <XAxis fontSize={12} dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="count" stroke="#FF073A" />
          </LineChart>
        </div>
        <div className="active-chart-container">
          <LineChart
            width={1200}
            height={250}
            data={activeData}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}
          >
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="count" stroke="#007BFF" />
          </LineChart>
        </div>
        <div className="recovered-chart-container">
          <LineChart
            width={1200}
            height={250}
            data={recoveredData}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}
          >
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="count" stroke="#27A243" />
          </LineChart>
        </div>
        <div className="deceased-chart-container">
          <LineChart
            width={1200}
            height={250}
            data={deceasedData}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}
          >
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="count" stroke="#6C757D" />
          </LineChart>
        </div>
        <div className="tested-chart-container">
          <LineChart
            width={1200}
            height={400}
            data={testedData}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}
          >
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="count" stroke="#9673B9" />
          </LineChart>
        </div>
      </div>
    )
  }

  renderLineChartsRoute = () => {
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
    return <>{this.renderLineChartsRoute()} </>
  }
}

export default LineCharts
