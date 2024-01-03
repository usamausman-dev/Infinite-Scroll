import React, { useEffect, useRef, useState } from 'react'
import { Cards, Loader } from '../components'
import axios from 'axios'

export default function Gallery() {

  const [pageNumber, setPageNumber] = useState(1)
  const [photos, setPhotos] = useState([])
  const [loader, setLoader] = useState(false)

  const URL = `https://api.unsplash.com/photos/?client_id=${import.meta.env.VITE_REACT_ACCESS_KEY}&page=${pageNumber}&per_page=10`


  useEffect(() => {
    axios.get(URL).then(res => {
      setPhotos([...photos, ...res.data])
      setLoader(true)
    }).catch(err => console.log(err))

  }, [pageNumber])


  const PageEnd = useRef()

  useEffect(() => {
    if (loader) {
      const observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          setPageNumber(pageNumber => pageNumber + 1)
        }

      }, { threshold: 1 })
      observer.observe(PageEnd.current)

    }

  }, [loader])


  return (
    <div className='w-full h-screen bg-slate-100'>

      <div className='text-center p-20'>
        <h1 className="text-3xl font-semibold">
          Gallery
        </h1>

        <p className='mt-4 text-gray-800'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia fugit, quis hic, consectetur distinctio doloribus nemo voluptas optio obcaecati vel et ab tempore deserunt. Dicta itaque nobis facilis at architecto!</p>
      </div>



      <div className="mx-auto grid w-full max-w-7xl items-center space-y-4 px-2 py-10 md:grid-cols-2 md:gap-6 md:space-y-0 lg:grid-cols-4">
        {
          photos.map((photo, key) => <Cards key={key} data={photo} />)
        }


        {
          photos.length % 4 == 0
            ?
            (Array.from({ length: 3 }).map((_, i) => (<Loader key={i} />)))
            :
            (<Loader />)
        }




        <div
          ref={PageEnd}
          role="status"
          className="flex items-center justify-center aspect-[16/9]  w-auto rounded-md md:aspect-auto md:h-[400px] animate-pulse dark:bg-gray-700"
        >
          <svg
            className="w-10 h-10 text-gray-200 dark:text-gray-600"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 16 20"
          >
            <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
            <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM9 13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2Zm4 .382a1 1 0 0 1-1.447.894L10 13v-2l1.553-1.276a1 1 0 0 1 1.447.894v2.764Z" />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  )
}
