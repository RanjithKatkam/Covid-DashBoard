/* eslint-disable react/no-unknown-property */
import './index.css'

const StateSpecificCards = props => {
  const {details, onChangeSpecificCard, selectedCardId} = props
  const {confirmedCases, activeCases, recoveredCases, deceasedCases} = details

  const onChangeCard = id => {
    onChangeSpecificCard(id)
  }

  return (
    <ul className="cards-list">
      <li
        className="select-card-list-confirmed"
        onClick={() => onChangeCard('confirmed')}
      >
        <div
          testid="stateSpecificConfirmedCasesContainer"
          className={
            selectedCardId === 'confirmed'
              ? 'state-confirmed-cases-container'
              : 'state-card-normal-class'
          }
        >
          <p className="confirmed-cases-heading">Confirmed</p>
          <img
            src="https://res.cloudinary.com/dwgg5pyqk/image/upload/v1687427024/check-mark_1_iedze6.png"
            alt="state specific confirmed cases pic"
          />
          <p className="confirmed-cases-para">{confirmedCases}</p>
        </div>
      </li>
      <li
        className="select-card-list-active"
        onClick={() => onChangeCard('active')}
      >
        <div
          testid="stateSpecificActiveCasesContainer"
          className={
            selectedCardId === 'active'
              ? 'state-active-cases-container'
              : 'state-card-normal-class'
          }
        >
          <p className="active-cases-heading">Active</p>
          <img
            src="https://res.cloudinary.com/dwgg5pyqk/image/upload/v1687427084/protection_1_q15oqc.png"
            alt="state specific active cases pic"
          />
          <p className="active-cases-para">{activeCases}</p>
        </div>
      </li>
      <li
        className="select-card-list-recovered"
        onClick={() => onChangeCard('recovered')}
      >
        <div
          testid="stateSpecificRecoveredCasesContainer"
          className={
            selectedCardId === 'recovered'
              ? 'state-recovered-cases-container'
              : 'state-card-normal-class'
          }
        >
          <p className="recovered-cases-heading">Recovered</p>
          <img
            src="https://res.cloudinary.com/dwgg5pyqk/image/upload/v1687427084/recovered_1_bhbphf.png"
            alt="state specific recovered cases pic"
          />
          <p className="recovered-cases-para">{recoveredCases}</p>
        </div>
      </li>
      <li
        className="select-card-list-deceased"
        onClick={() => onChangeCard('deceased')}
      >
        <div
          testid="stateSpecificDeceasedCasesContainer"
          className={
            selectedCardId === 'deceased'
              ? 'state-deceased-cases-container'
              : 'state-card-normal-class'
          }
        >
          <p className="deceased-cases-heading">Deceased</p>
          <img
            src="https://res.cloudinary.com/dwgg5pyqk/image/upload/v1687427094/breathing_1_dqkfdm.png"
            alt="state specific deceased cases pic"
          />
          <p className="deceased-cases-para">{deceasedCases}</p>
        </div>
      </li>
    </ul>
  )
}

export default StateSpecificCards
