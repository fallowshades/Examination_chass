import React, { type ReactNode } from 'react'
import { Link, useLocation } from 'react-router'
import CustomLink from '~/components/CustomLink'
const Confirm = ({ children }: { children?: ReactNode }) => {
  const location = useLocation()
  return (
    <div>
      {' '}
      <CustomLink
        className='bg-green-200'
        key={'dsaf'}
        to={{
          pathname: `/viewBookings/1`,
          search: location.search,
        }}>
        Configm
      </CustomLink>
      <Link
        className='bg-red-200'
        to='./error/path'>
        Confirm Error
      </Link>
      <Link
        className='bg-yellow-200'
        to='./home'>
        without suspense
      </Link>
    </div>
  )
}

export default Confirm
