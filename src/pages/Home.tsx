import React from 'react'
import JokesTable from '../components/tables/JokesTable'

export default function Home({isLight}: { isLight: boolean}) {
  return (

    <div className={`${isLight ? "bg-gray " : "bg-darkmode"}`}>
      <section className={`pt-8 pb-10 h-screen flex justify-center`}>
     
       
          <div className="w-5/6 text-center">
       
            <div className="text-center  wow fadeInUp  flex justify-end " data-wow-delay="1.2s">

              <a href="/add-jokes" className='py-2 px-4 rounded-sm bg-darkblue text-gray  hover:bg-lightblue hover:text-darkblue transition duration-300 ease-in-out h-[48px] border border-midblue'
                rel="nofollow"
              >Add Jokes</a>
            </div>
            <div className="text-center justify-center wow fadeInUp" data-wow-delay="1.6s">
              <JokesTable isLight={isLight}/>
           
            </div>
          </div>
       
      
    </section></div>
  )
}
