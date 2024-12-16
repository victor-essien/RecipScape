import React, { useState, useRef } from "react";
import ReactQuill from "react-quill";
import Quill from 'quill'
 //import quillEmij from 'quill-emoji/dist/quill-emoji'
import { MdClose } from "react-icons/md";
import "react-quill/dist/quill.snow.css";
import "quill-emoji/dist/quill-emoji.css"; // Import Emoji CSS

import { EmojiBlot } from "quill-emoji";
import Emoji from "quill-emoji";


import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import "quill-emoji/dist/quill-emoji.css"; // Import emoji styles
import { apiRequest, handleFileUpload, fetchRecps } from "../utils";
import { useSelector, useDispatch } from "react-redux";
import { AiFillPicture } from "react-icons/ai";
import { IoMdArrowBack } from "react-icons/io";
import { Spinner } from "../components";

Quill.register("modules/emoji", Emoji);
const CreateRecp = ({ toggleCreate }) => {
  const [content, setContent] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [error, setError] = useState("");
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.user);
  const [keywords, setKeywords] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const reactQuillRef = useRef(null);
  const isLargeScreen = useMediaQuery({ minWidth: 1024 });
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // This will navigate to the previous URL
  };
  // const handleInputChange = (e) => {
  //   const value = e.target.value;
  //   if (value.includes(',') || value.includes(' ')) {
  //     // Split keywords by commas or spaces and filter out any empty values
  //     const newKeywords = value.split(/[, ]+/).filter(Boolean);
  //     setKeywords((prevKeywords) => [...prevKeywords, ...newKeywords]);
  //     setInputValue(''); // Reset input field
  //   } else {
  //     setInputValue(value); // Update input value
  //   }
  // };

  const handleInputChange = (e) => {
    setInputValue(e.target.value); // Update input value
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission or unwanted behavior
      if (inputValue.trim()) {
        // Add the input value as a new keyword if it's not empty
        setKeywords((prevKeywords) => [...prevKeywords, inputValue.trim()]);
        setInputValue(""); // Reset input field
      }
    }
  };

  const fetchRecp = async () => {
    try {
      const res = await fetchRecps(user?.token, dispatch);
     
      // Ensure that you're correctly checking the response structure
      if (res?.success) {
        setLoading(false);
      } else {
        setError("Something went wrong Refresh");
      }
    } catch (error) {
      setError("Error fetching data. Refresh");
    } finally {
      // Ensure loading is set to false whether successful or failed
      setLoading(false);
    }
  };
 
  const handleImageButtonClick = async () => {
    // Trigger the hidden file input when the button is clicked
    fileInputRef.current.click();

    //  const res = await handleFileUpload(files)
    //  setImageUrls(res)
  };

  //   register,
  //   handleSubmit,
  //   reset,
  //   formState: { errors },
  // } = useForm();
  // let  imageUrl;
  // let file
  // const handleImageUpload = () => {
  //   const input = document.createElement('input');
  //   input.setAttribute('type', 'file');
  //   input.setAttribute('accept', 'image/*');
  //   input.click();

  //   input.onchange = async () => {
  //     file = input.files[0];
  //     if (file) {
  //        imageUrl = await handleFileUpload(file); // calls the Cloudinary upload function
  //       if (imageUrl) {
  //         const quill = this.quill;
  //         const range = quill.getSelection();
  //         quill.insertEmbed(range.index, 'image', imageUrl);
  //         quill.format('image', {
  //           width: '200px', // specify the width
  //           height: 'auto',
  //           display: 'flex',
  //           alignItems: 'center',
  //         });
  //       }
  //     }
  //   };
  // };
  // console.log('FILEEEEE', file)
  // console.log('IMAGEURLLL', imageUrl)
  // const modules = {
  //     "emoji-toolbar": true,
  //         "emoji-textarea": true,
  //         "emoji-shortname": true,
  //   toolbar: {
  //     container: [
  //       [{ header: '1' }, { header: '2' }, { font: [] }],
  //       [{ list: 'ordered' }, { list: 'bullet' }],
  //       ['bold', 'italic', ],
  //       [{ align: [] }],

  //       [ 'image', ],
  //     ],

  //   },
  // };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const uri = files.length > 0 ? await handleFileUpload(files) : [];
     
      const newData = {
        keywords,
        content, // Add Quill editor content
        image: uri, // Add uploaded images
      };
      // const newData = uri ? { ...data, image: uri } : data;
      const res = await apiRequest({
        url: "/post/create-recp",
        data: newData,
        token: user?.token,
        method: "POST",
      });
      if (res?.status === "failed") {
        setErrMsg(res);
      } else {
        // reset({
        //   description: "",
        // });
        setLoading(false);
        navigate("/");
        setFiles([]);
        setContent("");
        setErrMsg("");
        await fetchRecp();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const toolbarOptions = {
    container: "#custom-toolbar",
  };

  return (
    <div
      className={`w-full h-screen ${
        isLargeScreen
          ? "lg:fixed lg:z-50 lg:inset-0 bg-black bg-opacity-50"
          : ""
      } pr-0 pl-0 overflow-y-auto`}
    >
      {loading ? (
        <Spinner />
      ) : (
        <div
          className={`flex items-center justify-center ${
            isLargeScreen ? "min-h-screen px-4 text-center" : ""
          }`}
        >
          {/* Semi-transparent overlay for large screens */}
          {isLargeScreen && (
            <div
              className="fixed inset-0 bg-black opacity-50"
              onClick={toggleCreate}
            ></div>
          )}

          {/* Modal Content */}
          <span
            className={`${
              isLargeScreen
                ? "hidden sm:inline-block sm:align-middle sm:h-screen"
                : ""
            }`}
            aria-hidden="true"
          ></span>

          <div
            className={`inline-block align-bottom bg-ivory rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle max-w-lg w-full ${
              isLargeScreen ? "lg:max-w-md lg:rounded-lg" : "w-full"
            }`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
          >
            {/* Close Button */}
            <div
              className={`flex justify-between ${
                isLargeScreen ? "lg:px-6 lg:pt-5 lg:pb-2" : "p-4"
              }`}
            >
              {isLargeScreen ? (
                <button onClick={toggleCreate} className="text-black">
                  <MdClose size={22} />
                </button>
              ) : (
                <button onClick={goBack}>
                  <IoMdArrowBack size={21} className="" />
                </button>
              )}
            </div>

            {/* Editor Container */}
            <div className="editor-container p-4">
              <div className="flex justify-end">
                <button
                  className="bg-secondary m-2 px-2 py-2 font-bold text-lg rounded"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
              <div className="editor-content border-gray border-2">
                <ReactQuill
                  ref={reactQuillRef}
                  value={content}
                  onChange={setContent}
                  modules={{
                    toolbar: toolbarOptions,
                    "emoji-toolbar": true,
                    "emoji-textarea": true,
                    "emoji-shortname": true,
                  }}
                  placeholder="Write your post here..."
                />
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  multiple
                  onChange={(e) => setFiles(Array.from(e.target.files))}
                />
                <div>
                  <label htmlFor=""> Enter each keyword and press Enter</label>
                  <input
                    type="text"
                    placeholder="Enter keywords"
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    className="border p-2 rounded"
                  />

                  <div className="flex flex-wrap gap-2 mt-2">
                    {keywords.map((keyword, index) => (
                      <span key={index} className="bg-gray-200 p-1 rounded">
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Custom Toolbar */}
              <div id="custom-toolbar" className="p-2">
                <button className="ql-bold" />
                <button className="ql-italic" />
                
                <button className="ql-list" value="ordered" />
                <button className="ql-list" value="bullet" />
                <button className="ql-header" value="1" />
                <button className="ql-header" value="2" />
                <button onClick={handleImageButtonClick}>
                  <AiFillPicture />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateRecp;
