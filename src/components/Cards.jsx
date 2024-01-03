import React from 'react'

export default function Cards({ data }) {

    const { alt_description, color, likes, user, urls } = data;
    return (
        <div
            className="relative aspect-[16/9]  w-auto rounded-md md:aspect-auto md:h-[400px]"
        >
            <img
                src={urls.regular}
                alt={alt_description}
                className="z-0 h-full w-full rounded-md object-cover"
            />
            <div className="absolute inset-0 rounded-md bg-gradient-to-t from-gray-900 to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4 text-left text-white">
                <h1 className="text-lg font-semibold text-white ">{user.first_name} {user.last_name}</h1>
              
                <p className='truncate text-sm text-gray-300'>{alt_description}</p>


                <div className="flex justify-between items-center  pt-8 ">
                    <div className="flex items-center space-x-2">
                        <span className="block text-sm font-semibold">Colors : </span>
                        <span className={`block h-4 w-4 rounded-full border-2 border-gray-300 bg-${color}`}></span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="block text-sm font-semibold">Likes: </span>
                        <span className="block cursor-pointer rounded-md border border-gray-300 p-1 px-2 text-xs font-medium">
                            {likes}
                        </span>

                    </div>
                </div>


                <a href={user.links.portfolio} className="mt-2 inline-flex cursor-pointer items-center text-sm font-semibold text-white">
                    Visit Portfolio &rarr;
                </a>
            </div>
        </div>
    )
}
