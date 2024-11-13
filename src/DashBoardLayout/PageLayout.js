import React from 'react'

function PageLayout({children}) {
  return (
    <>
      {React.cloneElement(children , {})}    
    </>
  )
}

export default PageLayout


