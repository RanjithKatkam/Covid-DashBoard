import {Link} from 'react-router-dom'
import './index.css'

const ListItem = props => {
  const {details} = props
  const {
    stateName,
    stateCode,
    confirmed,
    active,
    recovered,
    deceased,
    population,
  } = details
  return (
    <Link className="link" to={`/state/${stateCode}`}>
      <li className="list-item-row">
        <p className="list-stateName">{stateName}</p>
        <p className="list-confirmed">{confirmed}</p>
        <p className="list-active">{active}</p>
        <p className="list-recovered">{recovered}</p>
        <p className="list-deceased"> {deceased}</p>
        <p className="list-population">{population}</p>
      </li>
    </Link>
  )
}

export default ListItem
