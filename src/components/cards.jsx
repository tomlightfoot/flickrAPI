import React from 'react'
import LazyLoad from 'react-lazyload'
import InfiniteScroll from 'react-infinite-scroll-component'

const Cards = ({ data, nextPhotos }) => {
  const photos = Object.assign([], data)
  let cutPhotos = []
  while (photos.length >= 4) {
    cutPhotos.push(photos.splice(0, 4))
  }
  return (
    <InfiniteScroll dataLength={cutPhotos.length} next={nextPhotos} hasMore={true} loader={<h4>Loading...</h4>}>
      {cutPhotos && cutPhotos.map((slice, index) => {
        return (
          <LazyLoad height={200} offset={9999} >
            <div className='card-deck' key={index}>
              {slice.map((photo, index) => {
                console.log(photo)
                return (
                  <div className='card mb-4' key={index}>
                    <div className='card-img-top img' style={{backgroundImage: `url(${photo.url_m})`}} alt={photo.title} />
                    <div className='card-body'>
                      <h5 className='card-title'><a target='_blank' href={photo.photoLink}>{photo.title || <i>No title for this photo</i>}</a> by <a target='_blank' href={photo.authorLink}>{photo.authorName}</a></h5>
                      {(photo.description._content && <p className='card-text' dangerouslySetInnerHTML={{__html: photo.description._content}} />) || <i>No description for this photo</i>}
                    </div>
                    <div className='card-footer'>
                      <strong>Tags</strong><br />
                      <span>{photo.tags.replace(/ /g,' - ') || <i>No tags for this photo</i>}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </LazyLoad>
        )
      })}
    </InfiniteScroll>
  )
}

export default Cards