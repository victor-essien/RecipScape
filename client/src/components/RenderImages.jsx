import { Link } from "react-router-dom";

const RenderImages = ({ recp }) => {
  if (recp.image.length === 1) {
    return (
      <Link to={`/recp/${recp?._id}/photo/0`}>
        <img
          className="w-full max-h-[400px] object-cover rounded-md"
          src={recp.image[0]}
          alt="Image"
        />
      </Link>
    );
  } else if (recp.image.length === 2) {
    return (
      <div className="grid grid-cols-2 gap-1">
        {recp.image.map((url, index) => (
          <Link to={`/recp/${recp?._id}/photo/${index}`}>
            <img
              key={index}
              className="w-full max-h-[300px] object-cover rounded-md"
              src={url}
              alt={`Image ${index + 1}`}
            />
          </Link>
        ))}
      </div>
    );
  } else if (recp.image.length === 3) {
    return (
      <div className="grid grid-cols-5 gap-2 py-4">
        <div className="col-span-2 flex flex-col gap-2">
          <Link to={`/recp/${recp?._id}/photo/1`}>
            <img
              src={recp.image[0]}
              alt=""
              className="h-full w-full max-h-[150px] object-cover rounded-md"
            />
          </Link>
          <Link to={`/recp/${recp?._id}/photo/2`}>
            <img
              src={recp.image[1]}
              alt=""
              className="h-full w-full max-h-[150px] object-cover rounded-md"
            />
          </Link>
        </div>
        <Link to={`/recp/${recp?._id}/photo/3`} className="col-span-3">
          <img
            src={recp.image[2]}
            alt=""
            className="h-full w-full max-h-[300px] object-cover rounded-md"
          />
        </Link>
      </div>
    );
  } else if (recp.image.length === 4) {
    return (
      <div className="grid grid-cols-2 gap-1">
        {recp.image.map((url, index) => (
          <img
            key={index}
            className="w-full max-h-[200px] object-cover rounded-md"
            src={url}
            alt={`Image ${index + 1}`}
          />
        ))}
      </div>
    );
  } else {
    return null;
  }
};
export default RenderImages;
