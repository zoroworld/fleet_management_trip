import React from 'react'
import Header from './Header'
import Footer from './Footer'
import Sidebar from './SideBar'

function Base({children}) {
  return (
    <>
      <div className="d-flex">
        <Sidebar />

        <div className="flex-grow-1 d-flex flex-column px-3 bg-transparent" style={{ minHeight: "100vh" }}>
          <Header />
          
          <main className="flex-grow-1 py-3 overflow-auto" style={{ minHeight: 0 }}>
            {children}
          </main>

          <Footer />
        </div>
      </div>
    </>
  )
}

export default Base
