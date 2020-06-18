import Flickr from 'flickr-sdk'

const flickr = new Flickr(process.env.API_KEY)

const api = {}

api.fetchPhotos = async (value, page, searchType) => {
  const args = {
    extras: 'description,owner,tags,title,url_m',
    per_page: 8,
    page,
    safe_search: 1,
  }
  
  searchType === 'text' ? args.text = value : args.tags = value
  const res = await flickr.photos.search(args)
  const photos = res.body.photos.photo
  for (const photo of photos) {
    const personInfo = await api.fetchPersonInfo(photo.owner)
    photo.authorLink = personInfo.url
    photo.authorName = personInfo.name
    photo.photoLink = await api.fetchPhotoInfo(photo.id)
  }
  return photos
}

api.fetchPhotoInfo = async (photoId) => {
  const res = await flickr.photos.getInfo({photo_id: photoId})
  return res.body.photo.urls.url[0]._content
}

api.fetchPersonInfo = async (nsid) => {
  const res = await flickr.people.getInfo({user_id: nsid})
  const person = res.body.person
  return {
    name: person.realname && person.realname._content || null,
    url: person.profileurl && person.profileurl._content || null
  }
}

export default api
