import {NavLink} from 'react-router-dom'
import styles from "./Navigator.module.scss"

export const Navigation = () => {
  return(
    <div className={styles.navigator}>
      <NavLink to={'/'}>Converter</NavLink>
      <NavLink to={'/transactions'}>Transactions</NavLink>
    </div>
  )
}