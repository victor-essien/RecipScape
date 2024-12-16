import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { useState, useEffect } from "react";
import { Spinner } from "../components";
import { fetchRecp } from "../utils";
const ImageViewer = ({ posts }) => {
 
  const { id, index } = useParams();
  const { user } = useSelector((state) => state.user);
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const currentIndex = parseInt(index, 10);

  const fetchRecip = async () => {
    try {
      const res = await fetchRecp(user?.token, id);

      if (res?.success === true) {
        setPost(res.data);
       

        setLoading(false);
        setError(null);
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
  useEffect(() => {
    setLoading(true);
    fetchRecip();
  }, [id]);

  if (loading) return <Spinner />;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!post || !post.image || !post.image[currentIndex]) {
    return <p>Image not found.</p>;
  }
  const imageUrl = post.image[currentIndex];
  // Function to go to the next image
  const goToNextImage = () => {
    if (currentIndex + 1 < post.image.length) {
      navigate(`/recp/${id}/photo/${parseInt(currentIndex) + 1}`);
    }
  };

  // Function to go to the previous image
  const goToPrevImage = () => {
    if (currentIndex - 1 >= 0) {
      navigate(`/recp/${id}/photo/${parseInt(currentIndex) - 1}`);
    }
  };

  return (
    <>
      {!loading ? (
        <div className="pt-3">
          <div className="fixed inset-0 flex  justify-center ">
            <button className="absolute   top-4 right-4 text-white z-50 ">
              <Link to={"/"}>
                <IoMdClose size={21} className="" />
              </Link>
            </button>
            <div className="absolute inset-0 bg-[#000] opacity-70"></div>
            <div className="relative max-w-full max-h-full p-4">
              <img
                src={imageUrl}
                alt="Post Image"
                className="object-contain w-full h-full"
              />
              <div className="absolute inset-0 flex justify-between items-center px-4">
                {currentIndex > 0 && (
                  <button
                    onClick={goToPrevImage}
                    className="text-white bg-black bg-opacity-50 px-4 py-2 rounded-md"
                  >
                    <FaChevronLeft />
                  </button>
                )}
                {currentIndex + 1 < post.image.length && (
                  <button
                    onClick={goToNextImage}
                    className="text-white bg-black bg-opacity-50 px-4 py-2 rounded-md"
                  >
                    <FaChevronRight />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default ImageViewer;
