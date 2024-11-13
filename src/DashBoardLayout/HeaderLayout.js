import React from 'react'

function HeaderLayout({title , children}) {

  return (
    <>
    
    <h1>{title}</h1>
      <div className="d-flex align-items-center mb-1 justify-content-between">
        <div className="d-flex">
           <AddButtonModal  />
        </div>
        {children}
        <SearchInput
          onChange={setSearchText}
          placeholder={t("search")}
        />
      </div>

    </>
  )
}

export default HeaderLayout