import React, { useEffect, useState } from 'react'
import { Input } from 'antd'
const Search = ({setSearchValue}) => {
    const [search,setSearch]=useState('');

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearch(value);
        setSearchValue(value);
        
      };

 
  return (
    <div className='text-center'>
       <Input
        placeholder='Search notes...'
        style={{ width: 500 }}
        className='m-4 p-2 rounded-md '
        value={search}
        onChange={handleSearch}
       />
       
    </div>
  )
}

export default Search
