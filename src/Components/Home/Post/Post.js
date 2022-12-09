import React, { useState, useEffect } from "react";
import "./Post.css";
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";
import PollOutlinedIcon from "@mui/icons-material/PollOutlined";
import SentimentSatisfiedAltOutlinedIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import Avatar from "@mui/material/Avatar";
import { storage } from "../../../Firebase/Firebase";
import db from "../../../Firebase/Firebase";
import firebase from "firebase/compat/app";
import LinearProgress from "@mui/material/LinearProgress";
import InputEmoji from "react-input-emoji";
import { useSelector } from "react-redux";

import {
  CalendarIcon,
  ChartBarIcon,
  EmojiHappyIcon,
  PhotographIcon,
  XIcon,
} from "@heroicons/react/outline";

function Post() {
  const [img, setImg] = useState(null);

  const [show, setShow] = useState(false);
  const [pshow, setPshow] = useState(false);
  const [progress, setProgress] = React.useState(0);
  const user = useSelector((state) => state.login.user);
  const [image, setImage] = useState(null);
  console.log(pshow)
  const [text, setText] = useState("");

  const handleImg = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
      setImage(e.target.files[0]);
    }
    reader.onload = (eventResult) => {
      setImg(eventResult.target.result);
      // setImage(eventResult.target.result);
    };

    // setShow(true);
  };

  const handleUplode = () => {
    if (image) {
     
      const uploadTask = storage.ref(`/images/${image.name}`).put(image);
      //initiates the firebase side uploading
      uploadTask.on(
        "state_changed",
        (snapShot) => {
          const ps = Math.round(
            (snapShot.bytesTransferred / snapShot.totalBytes) * 100
          );
          setProgress(ps);
          setPshow(true);
        },
        (err) => {
          //catches the errors
          console.log(err);
        },
        () => {
          // gets the functions from storage refences the image storage in firebase by the children
          // gets the download url then sets the image from firebase as the value for the imgUrl key:
          storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then((img) => {
              console.log(img);
              db.collection("tweet").add({
                timetamp: firebase.firestore.FieldValue.serverTimestamp(),
                avatar: user.avatar,
                title: text,
                img: img,
                varified: true,
                username: user.username,
                name: user.name,
              });
              setImg(null)
              setText("");
              setPshow(false);
            });
        }
      )
    }else{
      db.collection("tweet").add({
        timetamp: firebase.firestore.FieldValue.serverTimestamp(),
        avatar: user.avatar,
        title: text,
        img: "",
        varified: true,
        username: user.username,
        name: user.name,
      });
      setImg(null)
      setText("");
      setPshow(false);

    }
  };

  return (
    <>
      <div className={`border-b border-gray-700 p-3 flex space-x-3 overflow-y-scroll scrollbar-hide `}> 
      {/* ${loading && "opacity-60"} */}
          <img
            src={user.avatar}
            alt=""
            className="h-11 w-11 rounded-full cursor-pointer"
            // onClick={signOut}
          />
          <div className="divide-y divide-gray-700 w-full">
            <div className={`${image && "pb-7"} ${text && "space-y-2.5"}`}>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="What's happening?"
                rows="2"
                className="bg-transparent outline-none text-[#d9d9d9] text-lg placeholder-gray-500 tracking-wide w-full min-h-[50px]"
              />
        
              {img && (
                  <div className="relative">
                    <div
                      className="absolute w-8 h-8 bg-[#15181c] hover:bg-[#272c26] bg-opacity-75 rounded-full flex items-center justify-center top-1 left-1 cursor-pointer"
                      onClick={() => setImg(null)}
                    >
                      <XIcon className="text-white h-5" />
                    </div>
                    <img
                      src={img}
                      alt=""
                      className="rounded-2xl max-h-80 object-contain"
                    />
                  </div>
                )}
              </div>
              <div className="flex items-center justify-between pt-2.5">
                <div className="flex items-center">
                  <label htmlFor="media">
                    <input
                      type="file"
                      accept="image/*"
                      id="media"
                      multiple
                      onChange={(e) => handleImg(e)}
                    />
                    <div
                      className="icon"
                    >
                      <PhotographIcon className="text-[#1d9bf0] h-[22px]" />
                    </div>
                     
                  </label>
                
                  <div className="icon rotate-90">
                    <ChartBarIcon className="text-[#1d9bf0] h-[22px]" />
                  </div>

                  <div className="icon" >
                    <EmojiHappyIcon className="text-[#1d9bf0] h-[22px]" >

                    </EmojiHappyIcon>
                    {/* <InputEmoji
                      value={text}
                      onChange={setText}
                      cleanOnEnter
                      onEnter={(e) => setText(e.target.value)}
                      placeholder="Type a message"
                    /> */}
                  </div>
                  <div className="icon" >
                    <LocationOnOutlinedIcon  className="text-[#1d9bf0] h-[22px]"/>
                  </div>
                </div>
                <button
                  className="bg-[#1d9bf0] text-white rounded-full px-4 py-1.5 font-bold shadow-md hover:bg-[#1a8cd8] disabled:hover:bg-[#1d9bf0] disabled:opacity-50 disabled:cursor-default"
                  disabled={!text && !img}
                  onClick={handleUplode}
                >
                  Tweet
                </button>
              </div>
              <LinearProgress
                variant="determinate"
                value={progress}
                className={pshow ? "runPross" : "closePross"}
              />
            </div>
      </div>
    </>
  );
}

export default Post;

// import React, { useRef,useState, useEffect } from "react";
// import "./Post.css";
// import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";
// import PollOutlinedIcon from "@mui/icons-material/PollOutlined";
// import SentimentSatisfiedAltOutlinedIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
// import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
// import Avatar from "@mui/material/Avatar";
// import { storage } from "../../../Firebase/Firebase";
// import db from "../../../Firebase/Firebase";
// import firebase from "firebase/compat/app";
// import LinearProgress from "@mui/material/LinearProgress";
// import InputEmoji from "react-input-emoji";
// import { useSelector } from "react-redux";

// import {
//   CalendarIcon,
//   ChartBarIcon,
//   EmojiHappyIcon,
//   PhotographIcon,
//   XIcon,
// } from "@heroicons/react/outline";

// function Post() {
//   const [img, setImg] = useState(null);

//   const [show, setShow] = useState(false);
//   const [pshow, setPshow] = useState(false);
//   const [progress, setProgress] = React.useState(0);
//   const user = useSelector((state) => state.login.user);
//   const [image, setImage] = useState(null);

//   const [text, setText] = useState("");

//   const [loading, setLoading] = useState(false);
//   const filePickerRef = useRef(null);

//   const handleImg = (e) => {
//     const reader = new FileReader();
//     if (e.target.files[0]) {
//       reader.readAsDataURL(e.target.files[0]);
//       setImage(e.target.files[0]);
//     }
//     reader.onload = (eventResult) => {
//       setImg(eventResult.target.result);
//       setImage(eventResult.target.result);
//       console.log(img,image)
//     };
    
//     setShow(true);
//   };

//   // const handleImg = (e) => {
//   //   const reader = new FileReader();
//   //   if (e.target.files[0]) {
//   //     reader.readAsDataURL(e.target.files[0]);
//   //   }

//   //   reader.onload = (readerEvent) => {
//   //     setImage(readerEvent.target.result);
//   //   };
//   // };

//   const handleUplode = () => {
//     if (loading) return;
//     setLoading(true);
//     const uploadTask = storage.ref(`/images/${image.name}`).put(image);
//     //initiates the firebase side uploading
//     uploadTask.on(
//       "state_changed",
//       (snapShot) => {
//         const ps = Math.round(
//           (snapShot.bytesTransferred / snapShot.totalBytes) * 100
//         );
//         setProgress(ps);
//         setPshow(true);
//       },
//       (err) => {
//         //catches the errors
//         console.log(err);
//       },
//       () => {
//         // gets the functions from storage refences the image storage in firebase by the children
//         // gets the download url then sets the image from firebase as the value for the imgUrl key:
//         storage
//           .ref("images")
//           .child(image.name)
//           .getDownloadURL()
//           .then((img) => {
//             console.log(img);
//             db.collection("tweet").add({
//               timetamp: firebase.firestore.FieldValue.serverTimestamp(),
//               avatar: user.avatar,
//               title: text,
//               img: img,
//               varified: true,
//               username: user.username,
//               name: user.name,
//             });

//             setText("");
//             setPshow(false);
//             setLoading(false);
//           });
//       }
//     );
//   };

  


//   return (
//     <>
//       <div
//       className={`border-b border-gray-700 p-3 flex space-x-3 overflow-y-scroll scrollbar-hide ${
//         loading && "opacity-60"
//       }`}
//     >
//       <img
//         src={user.avatar}
//         alt=""
//         className="h-11 w-11 rounded-full cursor-pointer"
//         // onClick={signOut}
//       />
//       <div className="divide-y divide-gray-700 w-full">
//         <div className={`${image && "pb-7"} ${text && "space-y-2.5"}`}>
//           <textarea
//             value={text}
//             onChange={(e) => setText(e.target.value)}
//             placeholder="What's happening?"
//             rows="2"
//             className="bg-transparent outline-none text-[#d9d9d9] text-lg placeholder-gray-500 tracking-wide w-full min-h-[50px]"
//           />

//           {image && (
//             <div className="relative">
//               <div
//                 className="absolute w-8 h-8 bg-[#15181c] hover:bg-[#272c26] bg-opacity-75 rounded-full flex items-center justify-center top-1 left-1 cursor-pointer"
//                 onClick={() => setImage(null)}
//               >
//                 <XIcon className="text-white h-5" />
//               </div>
//               <img
//                 src={image}
//                 alt=""
//                 className="rounded-2xl max-h-80 object-contain"
//               />
//             </div>
//           )}
//         </div>
//         {!loading && (
//           <div className="flex items-center justify-between pt-2.5">
//             <div className="flex items-center">
//                <div
//                 className="icon"
//                 onClick={() => filePickerRef.current.click()}
//               >
//                 <PhotographIcon className="text-[#1d9bf0] h-[22px]" />
//                 <input
//                   type="file"
//                   ref={filePickerRef}
//                   hidden
//                   // onChange={addImageToPost}

//                   accept="image/*"
//                   id="media"
//                   multiple
//                   onChange={(e) => handleImg(e)}
//                 />
//               </div>

//              {/* <div className="icon rotate-90">
//                 <ChartBarIcon className="text-[#1d9bf0] h-[22px]" />
//               </div>

//               <div className="icon" onClick={() => setShowEmojis(!showEmojis)}>
//                 <EmojiHappyIcon className="text-[#1d9bf0] h-[22px]" />
//               </div>

//               <div className="icon">
//                 <CalendarIcon className="text-[#1d9bf0] h-[22px]" />
//               </div> */}
//               <LinearProgress
//                 variant="determinate"
//                 value={progress}
//                 className={pshow ? "pp ps" : "pp"}
//               />

//               {/* {showEmojis && (
//                 <Picker
//                   onSelect={addEmoji}
//                   style={{
//                     position: "absolute",
//                     marginTop: "465px",
//                     marginLeft: -40,
//                     maxWidth: "320px",
//                     borderRadius: "20px",
//                   }}
//                   theme="dark"
//                 />
//               )} */}
//             </div>
//             <button
//               className="bg-[#1d9bf0] text-white rounded-full px-4 py-1.5 font-bold shadow-md hover:bg-[#1a8cd8] disabled:hover:bg-[#1d9bf0] disabled:opacity-50 disabled:cursor-default"
//               disabled={!text && !image}
//               onClick={handleUplode}
//             >
//               Tweet
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//       {/* <div className="post">
//         <div className="post__top">
//           <Avatar src={user.avatar} />
//           <InputEmoji
//             value={text}
//             onChange={setText}
//             cleanOnEnter
//             onEnter={(e) => setText(e.target.value)}
//             placeholder="Type a message"
//           />
//         </div>
//         <div className="post__bottom">
//           <label htmlFor="media">
//             <input
//               type="file"
//               accept="image/*"
//               id="media"
//               multiple
//               onChange={(e) => handleImg(e)}
//             />
//             <InsertPhotoOutlinedIcon />
//           </label>
//           <div onClick={() => setShow(true)}>
//             <SentimentSatisfiedAltOutlinedIcon />
//           </div>
//           <PollOutlinedIcon />
//           <LocationOnOutlinedIcon />
//           <button className="btn" onClick={handleUplode}>
//             Tweet
//           </button>
//         </div>
//         <LinearProgress
//           variant="determinate"
//           value={progress}
//           className={pshow ? "pp ps" : "pp"}
//         />
//       </div>
//       <div className={show ? "img__preview img__preview_show" : "img__preview"}>
//         <img src={img} />
//         <button className="button" onClick={() => setShow(false)}>
//           Choose
//         </button>
//       </div>
//       <div
//         className={show ? "layer_show layer" : "layer"}
//         onClick={() => setShow(false)}
//       ></div> */}
//     </>
//   );
// }

// export default Post;
