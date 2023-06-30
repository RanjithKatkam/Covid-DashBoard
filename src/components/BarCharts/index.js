/* eslint-disable react/no-unknown-property */
import {Component} from 'react'
import {XAxis, Tooltip, BarChart, Bar} from 'recharts'
import Loader from 'react-loader-spinner'
import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
}

class BarCharts extends Component {
  state = {
    tenDaysConfirmedData: apiConstants.initial,
    tenDaysRecoveredData: apiConstants.initial,
    tenDaysDeceasedData: apiConstants.initial,
    tenDaysActiveData: apiConstants.initial,
    apiStatus: apiConstants.initial,
  }

  componentDidMount() {
    this.renderDetails()
  }

  renderDetails = async () => {
    this.setState({apiStatus: apiConstants.loading})
    const {stateCode} = this.props

    const barChartUrl = 'https://apis.ccbp.in/covid19-timelines-data'
    const barChartOptions = {
      method: 'GET',
    }
    const barChartResponse = await fetch(barChartUrl, barChartOptions)
    const data = await barChartResponse.json()
    const responseObjectKeys = Object.keys(data[`${stateCode}`].dates)

    const lastTenDaysConfirmedData = []
    const lastTenDaysActiveData = []
    const lastTenDaysRecoveredData = []
    const lastTenDaysDeceasedData = []

    responseObjectKeys.forEach(eachDate => {
      const requiredData = data[`${stateCode}`].dates[eachDate].total

      lastTenDaysConfirmedData.push({
        date: eachDate,
        count: requiredData.confirmed,
      })
      lastTenDaysActiveData.push({
        date: eachDate,
        count:
          requiredData.confirmed -
          (requiredData.recovered + requiredData.deceased),
      })
      lastTenDaysRecoveredData.push({
        date: eachDate,
        count: requiredData.recovered,
      })
      lastTenDaysDeceasedData.push({
        date: eachDate,
        count: requiredData.deceased,
      })
    })
    const tenDaysConfirmedData = []
    const tenDaysRecoveredData = []
    const tenDaysDeceasedData = []
    const tenDaysActiveData = []
    let count = 0
    while (count < 10) {
      tenDaysConfirmedData.push(lastTenDaysConfirmedData[count])
      tenDaysRecoveredData.push(lastTenDaysRecoveredData[count])
      tenDaysDeceasedData.push(lastTenDaysDeceasedData[count])
      tenDaysActiveData.push(lastTenDaysActiveData[count])
      count += 1
    }

    this.setState({
      tenDaysConfirmedData,
      tenDaysRecoveredData,
      tenDaysDeceasedData,
      tenDaysActiveData,
      apiStatus: apiConstants.success,
    })
  }

  renderSuccessView = () => {
    const {
      tenDaysConfirmedData,
      tenDaysRecoveredData,
      tenDaysDeceasedData,
      tenDaysActiveData,
    } = this.state
    const {selectedCardId} = this.props

    let data
    let fillColor
    if (selectedCardId === 'confirmed') {
      data = tenDaysConfirmedData
      fillColor = '#9A0E31'
    } else if (selectedCardId === 'recovered') {
      data = tenDaysRecoveredData
      fillColor = '#216837'
    } else if (selectedCardId === 'deceased') {
      data = tenDaysDeceasedData
      fillColor = '#474C57'
    } else {
      data = tenDaysActiveData
      fillColor = '#0A4FA0'
    }

    return (
      <div className="barChart-container">
        <BarChart
          width={1200}
          height={400}
          barSize={45}
          className="bar"
          data={data}
        >
          <XAxis
            dataKey="date"
            interval={0}
            fontSize={12}
            tickLine={0}
            axisLine={false}
            className="bar"
            dy={5}
          />

          <Tooltip />
          <Bar
            dataKey="count"
            fill={fillColor}
            label={{position: 'top', color: 'white'}}
          />
        </BarChart>
      </div>
    )
  }

  renderLoadingView = () => (
    <div testid="timelinesDataLoader" className="state-loader-container">
      <Loader type="Oval" color="#007BFF" height={50} />
    </div>
  )

  renderBarChartRoute = () => {
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
    return <>{this.renderBarChartRoute()} </>
  }
}

export default BarCharts
