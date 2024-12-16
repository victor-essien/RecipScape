import axios from 'axios'
import { SetRecps } from '../redux/recpSlice'

const API_URL = '' //ADD your backend url

export const API = axios.create({
    baseURL: API_URL,
    responseType: "json"
})

export const apiRequest = async ({url, token, data, method}) => {
    try {
        const result  = await API(url, {
            method: method || "GET",
            data:data,
            headers: {
                "content-type": "application/json",
                Authorization: token ? `Bearer ${token}`: "",
            }
        })
        
        return result?.data
    } catch (error) {
        const err = error.response.data;
        console.log(err)
        return {status: err.success, message: err.message}
    }
}
// For multiple files
export const handleFileUpload = async (uploadFile) => {
    console.log('uploadFile', uploadFile.length)
    const uploadPromises = uploadFile.map(async(file) =>{
        const formData = new FormData();
    formData.append("file", file)
    formData.append("upload_preset", "recipscape")

    try {
        const response = await axios.post(
            `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_ID}/image/upload`,
            formData
        );
        console.log(response)
        return response.data.secure_url;
    } catch (error) {
        console.log(error)
    }
    })
   
        return Promise.all(uploadPromises); 
}

export const handleSingleFileUpload = async (uploadFile) => {
    const formData = new FormData();
    formData.append("file", uploadFile)
    formData.append("upload_preset", "recipscape")

    try {
        const response = await axios.post(
            `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_ID}/image/upload`,
            formData
        );
      
        return response.data.secure_url;
    } catch (error) {
        console.log(error)
    }
}

export const fetchRecps = async (token, dispatch, uri, data) => {
    try {
        const res = await apiRequest({
            url: uri || "/post",
            token: token,
            method: "POST",
            data: data || {},
        });
        
         
            dispatch(SetRecps(res?.data));
            return res;
            
    } catch (error) {
        console.log(error)
    }
}
// export const fetchUserRecp = async (token, id) => {
//     console.log('CALLELDDLDELLELELELELELELELELLELELELELELELEL')
//     try {
//         console.log('idddd', id)
//         const res = await apiRequest({
//             url: `/post/user-recp`,
//             token: token,
//             method:"POST",
//             data:{useId: id}
           
//         })
//         console.log('dddddd', res)
//         return res
//     } catch (error) {
//         console.log(error)
//     }
// }

// export const fetchUserRecp = async (token, id) => {
//     console.log('CALLED API Request to Fetch User Recipes');
    
//     if (!token || !id) {
//       console.error('Token or User ID is missing');
//       return;
//     }
  
//     try {
//         const uri = id === undefined ? "/users/get-user" : "/users/get-user/" + id;
//       console.log('Requesting user posts for ID:', id);
//       const res = await apiRequest({
//         url: uri,
//         token: token,
//         method: "POST",
//         // Corrected typo "useId" to "userId"
//       });
//       console.log('Response from API:', res);
//       return res;
//     } catch (error) {
//       console.error('Error in fetchUserRecp:', error);
//       throw error;  // Re-throw the error to handle it in the calling function
//     }
//   };
  
export const fetchRecp = async (token,id,username, data,   ) => {
  
    
    try {
        const res = await apiRequest({
            url:  `/post/${username}/${id}`,
            token: token,
            method:"POST",
          
        })
       
        return res
    } catch (error) {
        console.log(error)
    }
}

// export const fetchRecp = async ({url, token, id, username}) => {
//     try {
//         const res = await apiRequest ({
//             url: url ||`/post/${username}/${id}`,
//             token: token,
//             method:"POST"
//         })
//         console.log('responsegotten', res)
//     } catch (error) {
//         console.log(error)
//     }
// }
export const likeRecp = async ({url, token, }) => {
    try {
        
        const res = await apiRequest({
            url: url,
            
            token: token,
            method:"POST"
        })
        return res;
    } catch (error) {
        console.log(error)
    }
}

export const likeRecpComment = async ({url, token}) => {
    try {
        const res = await apiRequest({
            url:url,
            token:token,
            method:'POST'
        })
        return res
    } catch (error) {
        console.log(error)
    }
}

export const search = async (url) => {
    try {
        const res = await apiRequest ({
            url:url,
            method:"GET",
        })
        return res
    } catch (error) {
        console.log(error)
    }
}
export const createBookmark = async ({pid, token}) => {
    console.log('piddd', pid)
    console.log('piddtokend', token)
    try {
        
        const res = await apiRequest({
            url: `/post/bookmark/${pid}`,
            method:"POST",
            token: token,
           
        })
        return res;
    } catch (error) {
        console.log(error)
    }
}
export const getUserInfo = async({token, id}) => {
    try {
        
        const uri = id === undefined|| null ? "/users/get-user" : "/users/get-user/" + id;
                console.log('use',id)
        const res = await apiRequest({
            url: uri,
            token: token,
            method: "POST",
     
            
        });

        if(res?.message === "Authentication failed") {
            localStorage.removeItem("user");
            window.alert("User session expired. Login again.");
            window.location.replace("/login")
        }
        return res 
    } catch (error) {
        console.log(error)
    }
}

export const followAction = async (token, id) => {
    try {
        const res = await apiRequest ({
            url: "/users/follow-user",
            token: token,
            method: "POST",
            data: {followId: id}
        })
        return res
    } catch (error) {
        console.log(error)
    }
}

export const unfollowAction = async (token, id) => {
    try {
        const res = await apiRequest ({
            url: "/users/unfollow-user",
            token: token,
            method: "POST",
            data: {followId: id}
        })
    } catch (error) {
        console.log(error)
    }
}

export const fetchFollowing = async (token) => {
    try {
        const res = await apiRequest ({
            url: "/users/fetch-following",
            token: token,
            method: "POST"
        })
        return res
    } catch (error) {
        console.log(error)
    }
}
export const fetchFollowers = async (token) => {
    try {
        const res = await apiRequest ({
            url: "/users/fetch-followers",
            token: token,
            method: "POST"
        })
        return res
    } catch (error) {
        console.log(error)
    }
}
export const  getComments = async ({token, username, postId}) => {
    try {
        const res = await apiRequest ({
            url: `/post/comments/${username}/${postId}`,
            token: token,
            method: "POST"
        })
        return res
    } catch (error) {
        console.log(error)
    }
}
export const getComment = async ({token, commentId}) => {
    try {
        const res = await apiRequest ({
            url:`/post/get-comment/comment/${commentId}`,
            token: token,
            method: "POST"
        })
        return res
    } catch (error) {
        console.log(error)
    }
}

export const getReplies = async ({token, commentId}) => {
try {
    const res = await apiRequest({
        url:`/post/commet/getreplies/${commentId}`,
        token:token,
        method:"POST"
    })
        return res
} catch (error) {
    console.log(error)
}
}

export const postReply = async ({token, commentId, comment, from, replyuserName}) => {
    try {

        const newData = {
            comment,
            from,
            replyuserName
        }
      const res = await apiRequest({
        url: `/post/addreply/comment/${commentId}`,
        data:newData,
        token:token,
        method: "POST"
      })
        return res
    } catch (error) {
        console.log(error)
    }
}
export const viewBookmarks = async (token) => {
    try {
        const res = await apiRequest ({
            url: '/post/bookmarks',
            token: token,
            method:"POST"
        })
        return res
    } catch (error) {
        console.log(error)
    }
}