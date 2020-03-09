import React, { useState } from 'react'

const SearchBox = ({ searchPhotos }) => {
  const [searchType, setSearchType] = useState('text')
  const [searchValue, setSearchValue] = useState()

  const search = (e) => { 
    if (e.key === 'Enter') {
      setSearchValue(e.target.value)
      searchPhotos(e.target.value, searchType) 
    }
  }

  return (
    <div className='btn-toolbar my-3' role='toolbar' aria-label='Toolbar with button groups'>
      <div className='btn-group mr-2' role='group' aria-label='First group'>
        <div className='input-group-prepend'>
          <div className='input-group-text' id='btnGroupAddon'>Search by</div>
        </div>
        <button
          type='button'
          className={`btn btn-secondary ${searchType === 'text' ? 'active' : ''}`}
          onClick={() => {
            setSearchType('text')
            if (searchValue) searchPhotos(searchValue, 'text')
          }
          }>
          General
          </button>
        <button
          type='button'
          className={`btn btn-secondary ${searchType === 'tags' ? 'active' : ''}`}
          onClick={() => {
            setSearchType('tags')
            if (searchValue) searchPhotos(searchValue, 'tags')
          }}
        >
          Tags
            </button>
      </div>
      <div className='input-group'>
        <input type='text' className='form-control' placeholder='' aria-label='Input group example' aria-describedby='btnGroupAddon' onKeyDown={e => search(e)} />
      </div>
    </div>
  )
}

export default SearchBox