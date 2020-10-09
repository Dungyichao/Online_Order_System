import React from 'react';

const SearchBox = ({ searchfield, searchChange }) => {
  return (
    <div>
      <input
        type='search'
        placeholder='Name,phone,email,orderID'
        onChange={searchChange}
        style={{width: "220px"}}
      />
    </div>
  );
}

export default SearchBox;