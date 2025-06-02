import React,  {type ReactNode} from 'react'
import { Link } from 'react-router'
const Confirm = ({children}:{children?:ReactNode}) => {
  return (
    <Link to='./error/path'>Confirm</Link>
  )
}

export default Confirm