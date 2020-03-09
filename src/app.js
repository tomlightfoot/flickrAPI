import 'babel-polyfill'
import './style.scss'
import React, { useState } from 'react'
import ReactDOM from 'react-dom'

import api from './api'

import Cards from './components/cards'
import SearchBox from './components/searchbox'

const App = () => {
  const updatePhotos = async (funcDesc = currentPhotos, page = 1, searchType) => {
    const data = await api.fetchPhotos(funcDesc, page, searchType)
    const oldPhotos = page > 1 ? photos : []
    setPhotos(oldPhotos.concat(data))
    setCurrentPhotos(funcDesc)
    setCurrentPage(page)
  }

  const [currentPage, setCurrentPage] = useState(1)
  const [currentPhotos, setCurrentPhotos] = useState('')
  const [photos, setPhotos] = useState(() => updatePhotos('Most recent'))

  return (
    <>
      <h1 className='text-center my-3 shadow-sm pb-3'>Flickr Photo Stream</h1>
      <h2 className='text-center h3 float-lg-right'>Currently viewing: {currentPhotos || 'Most recent'} images</h2>
      <SearchBox searchPhotos={(value, searchType) => updatePhotos(value, 1, searchType)} />
      {photos && <Cards data={photos} nextPhotos={() => updatePhotos(currentPhotos, currentPage + 1)} />}
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('container'))