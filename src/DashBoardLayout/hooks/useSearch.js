

import React from 'react'

function useSearch(filterDataBasedOnSearch  , data) {


    const [searchText, setSearchText] = React.useState("");
    const [filteredData, setFilteredData] = React.useState(data || []);



    React.useEffect(() => {
        if (Array.isArray(data)) {
          if (searchText) {
            setFilteredData(
                filterDataBasedOnSearch(data, searchText)
            );
          } else {
            setFilteredData(data);
          }
        }
      }, [searchText, data]);

  return (
    {
        setSearchText , 
        filteredData
    }
  )
}

export default useSearch