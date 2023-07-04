import "../css/Profilepic.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Profilepic = () => {
  var user_token = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(user_token?.user_id);
  const [imgfile, setUploadimg] = useState("");
  const [selectedFile, setSelectedfile] = useState("");
  const [selectedFiles, setSelectedfiles] = useState("");
  const [imgfile1, setUploadimg1] = useState("");

  const navigate = useNavigate();

  // const postUser = () => {
  //   let token = user_token.access;

  //   const formData = new FormData();

  //   formData.append("images", selectedFile);
  //   formData.append("background_image", selectedFiles);
  //   formData.append("user", user_token.user_id);
  //   console.log(formData);

  //   const requestOptions = {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "multipart/form-data",
  //       Authorization: "Bearer " + token,
  //     },
  //     body: formData,
  //   };

  //   fetch("http://35.90.113.221/user_profile_pic/", requestOptions)
  //     .then((resp) => {
  //       console.log("Profilepic Response ", resp);
  //       alert("Profilepic Response");
  //       navigate("/Blog");
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };

  const postUser = async () => {
    let token = user_token.access;
    console.log(token, "token");

    const formData = new FormData();

    formData.append("images", selectedFile);
    formData.append("background_image", selectedFiles);
    formData.append("user", user_token.user_id);
    console.log(formData);

    try {
      const response = await axios.post(
        "http://35.90.113.221/user_profile_pic/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + token,
          },
        }
      );
      console.log(response);
      if (response.data.images && response.data.background_image) {
        alert("Both Images Uploaded Successfully");
        navigate("/Blog");
      } else if (response.data.images && !response.data.background_image) {
        alert("Profile Picture Uploaded Successfully");
        navigate("/Blog");
      } else if (!response.data.images && response.data.background_image) {
        alert("Background Picture Uploaded Successfully");
        navigate("/Blog");
      } else if (!response.data.images && !response.data.background_image) {
        alert("No Images Uploaded");
        navigate("/Blog");
      }
    } catch (error) {
      console.log(error);
      alert(error.request.responseText);
    }
  };

  var onFileChange = (e) => {
    setSelectedfile(e.target.files[0]);
    setUploadimg(URL.createObjectURL(e.target.files[0]));
  };

  var onFileChange1 = (e) => {
    setSelectedfiles(e.target.files[0]);
    setUploadimg1(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <>
      <div className="container-fluid ">
        <div className="row">
          <div className="col-sm-5 div4">
            <div className="card signincard">
              <img src="images\logo.png" className="logo" />
              <h1>
                <b>Hi, Welcome Back</b>
              </h1>
              <img src="images\illustration_login.png" className="book" />
            </div>
          </div>
          <div className="col-sm-7 div8">
            <div className="myprofilepicdiv">
              <img id="myprofilepic" src={imgfile} />
            </div>
            <label htmlFor="file" className="filelabel btn">
              Choose Profile Image
            </label>
            <input
              onChange={onFileChange1}
              type="file"
              id="files"
              name="images"
              accept="image/*"
            />

            <div className="backgroundimage col-sm-10 ">
              <img id="mybgpic" src={imgfile1} />
              <div className="profileimage">
                <input
                  onChange={onFileChange}
                  type="file"
                  id="file"
                  name="images"
                  accept="image/*"
                />
              </div>
              <label htmlFor="files" className="fileslabel btn">
                Choose Background Image
              </label>
            </div>

            <button
              onClick={postUser}
              type="submit"
              className="btn-primary profilesubmit"
            >
              submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Profilepic;
