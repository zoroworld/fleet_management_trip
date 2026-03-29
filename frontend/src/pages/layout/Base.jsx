import React, { useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import Sidebar from './SideBar'

function Base({ children }) {
  const[toggle, setToggle] = useState(false)
  console.log(toggle);
  
  return (
    <>
      <div className="d-flex">
        <div className={`sidebar ${toggle ? "sidebar-hide" : "sidebar-show"}`}>
          <Sidebar />
        </div>
        <div className={`main-content-container w-100 ${toggle ? "full" : ""}`}>
          <div className="flex-grow-1 d-flex flex-column  bg-transparent" style={{ minHeight: "100vh" }}>
            <Header setToggle={setToggle}/>

            <main className="flex-grow-1 py-3 overflow-auto" style={{ minHeight: 0 }}>
              {children}
            </main>

            <Footer />
          </div>
        </div>
      </div>
    </>
  )
}

export default Base
