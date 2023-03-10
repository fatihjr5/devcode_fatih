import React from 'react'
import Nav from './navbar'

function Layout({children}) {
  return (
    <>
        <Nav/>
        <div className="container px-lg-5">
            { children }
        </div>
    </>
  )
}

export default Layout