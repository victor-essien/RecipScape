import React from 'react'
import {Link} from 'react-router-dom'

const SavedRecp = ({recp}) => {
  console.log(recp)
  return (
  <div className='mt-4'>
    
  
    <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 '>
   {recp.map((recps) => (
    <Link to={`/recp/${recps?._id}`}>
    <div className=''>
      <div className=''>      
        <img src={recps.image[1]} alt="" className=' rounded-md h-86 w-80 object-contain ' />
        </div>

      <p className='font-semibold '>{recps.title}</p>
     </div>
     </Link>
   ))}
    </div>
  </div>
  )
}

export default SavedRecp