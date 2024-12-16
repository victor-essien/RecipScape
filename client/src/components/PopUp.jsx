import React from 'react'
import { Logout } from '../redux/userSlice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
const PopUp = ({ isVisible, closePopup }) => {
const dispatch = useDispatch()
    if (!isVisible) return null;
  return (
    <div className="fixed inset-0 mt-20 mr-12   flex justify-end items-start">
    <div className="bg-darj  p-9 rounded shadow-lg m-4">
        <Link to={"/settings"}> <p className="text-lg cursor-pointer font-medium mb-4">Settings</p></Link>
     
      <p onClick={() => dispatch(Logout())} className="text-lg cursor-pointer font-medium mb-4">Logout</p>
      {/* <button
        onClick={closePopup}
        className="px-4 py-2 bg-dark text-white rounded hover:bg-red-600 focus:outline-none"
      >
        Close
      </button> */}
    </div>
  </div>
  )
}

export default PopUp