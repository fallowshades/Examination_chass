import React from 'react'
import { Outlet } from 'react-router'
const _layout = () => {
  return (
    <>
      <header className="p-4 bg-blue-100"><p>Pathless Layout Header</p></header>
      <main className="p-4">
        <pre>hejhej</pre>
        <Outlet />
      </main>
    </>
  )
}

export default _layout