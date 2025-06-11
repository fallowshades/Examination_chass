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
        to={{
          pathname: './error/path',
          search: location.search, // ✅ preserves search
        }}>
        Confirm Error
      </Link>
      <Link
        className='bg-yellow-200'
        to={{
          pathname: './',
          search: location.search, // ✅ preserves search
        }}>
        without suspense
      </Link>
      <Link
        className='bg-blue-200'
        to={{
          pathname: '/home',
          search: location.search, // ✅ preserves search
        }}>
        with suspense
      </Link>
    </div>
  )
}

export default Confirm
