import "../css/Profile.css";
import Navbar from "./Navbar";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import CollectionsIcon from "@mui/icons-material/Collections";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import CircularProgress from "@material-ui/core/CircularProgress";
import Fade from "react-reveal/Fade";
import { useNavigate } from "react-router-dom";
const Profile = () => {
  // ONCLICK SHOW OR HIDE
  const [show, setShow] = useState(false);
  const [replyVisible, setReplyVisible] = useState(false);
  const [selectedComment, setSelectedComment] = useState(null);
  const handleReplyClick = (cid) => {
    setSelectedComment(cid);
    setReplyVisible(true);
  };

  const handleReplyCancel = () => {
    setSelectedComment(null);
    setReplyVisible(false);
    setcontent("");
  };

  const postreplyUser = (cid) => {
    // implement your post reply logic here
    console.log(`Replying to comment with ID: ${cid}`);
  };
  // const handleReplyClick = (commentId) => {
  //   console.log("reply clicked", commentId);
  //   setShow(!show);
  //   setSelectedComment(commentId);
  // };
  // ONCLICK SHOW OR HIDE
  var user_token = JSON.parse(localStorage.getItem("user"));
  // console.log(user_token)
  let token = user_token?.access;

  // ABOUT GET API
  const [about, setabout] = useState([]);
  const getAbout = () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    fetch(" http://35.90.113.221/user_about_view/", requestOptions).then(
      (respp) => {
        respp.json().then(async (respp) => {
          setabout(respp);
          setDescription(about.length > 0 ? about[0].description : "");
          setLocation(about.length > 0 ? about[0].location : "");
          setEmail(about.length > 0 ? about[0].email : "");
          setWorkad_at(about.length > 0 ? about[0].workad_at : "");
          setStudied_at(about.length > 0 ? about[0].Studied_at : "");
        });
      }
    );
  };
  useEffect(() => {
    getAbout();
  }, []);

  // -------------------------------

  // SOCIAL GET API
  const [social, setsocial] = useState([]);
  const GetSocial = () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    fetch("http://35.90.113.221/user_social_view/", requestOptions).then(
      (resp) => {
        resp.json().then(async (resp) => {
          setsocial(resp);
          setLinkedin(social.length > 0 ? social[0].linkedin : "");
          setTwitter(social.length > 0 ? social[0].twitter : "");
          setInstagram(social.length > 0 ? social[0].instagram : "");
          setFacebook(social.length > 0 ? social[0].facebook : "");
        });
      }
    );
  };
  useEffect(() => {
    GetSocial();
  }, []);

  //--------------------------------------------------------------

  //USER_POST GET API
  const [userpost, setUserpost] = useState([]);
  const [visible, setVisible] = useState(3);
  const [post, setPost] = useState(null);
  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 3);
  };

  useEffect(() => {
    getdata();
  }, []);

  const getdata = async () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    };

    fetch(
      "http://35.90.113.221/post_view_user/",

      requestOptions
    ).then((resp) => {
      const { body } = resp;
      setPost(body);
      resp.json().then((resp) => {
        console.log(resp);
        setUserpost(resp);
      });
    });
  };
  //---------------------------------------------------------

  //PROFILEPIC AND BACKGROUND IMG GET API
  const [user_profile_pic, setUser_profile_pic] = useState([]);
  const getUser = () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    fetch("http://35.90.113.221/user_profile_pic/", requestOptions).then(
      (resp) => {
        resp.json().then((resp) => {
          setUser_profile_pic(resp);
        });
      }
    );
  };
  useEffect(() => {
    getUser();
  }, []);

  // useEffect(() => {
  //   const requestOptions = {
  //     method: "GET",
  //     redirect: "follow",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json",
  //       Authorization: "Bearer " + token,
  //     },
  //   };

  //   fetch(
  //     "http://35.90.113.221/user_profile_pic/",

  //     requestOptions
  //   ).then((resp) => {
  //     resp.json().then((resp) => {
  //       // console.log(resp);
  //       setUser_profile_pic(resp);
  //     });
  //   });
  // }, [user_profile_pic]);
  //-----------------------------------------------------------
  // NAME GET API
  const [name, setName] = useState([]);
  useEffect(() => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    };

    fetch(
      "http://35.90.113.221/show/",

      requestOptions
    ).then((resp) => {
      resp.json().then((resp) => {
        // console.log(resp);
        setName(resp);
      });
    });
  }, [token]);
  //-----------------------------------------------------------

  //COMMENT POST API
  var user_token = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(user_token?.user_id);
  const [text, settext] = useState("");
  // const [Post, setPost] = useState("");

  const commentpostUser = (Post) => {
    // console.log(Post)
    // console.log(user_token)
    let token = user_token.access;
    let item = { user, text, Post };
    // console.log(item)
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(item),
    };

    fetch("http://35.90.113.221/Comments/", requestOptions)
      .then((detail) => detail.json())
      .then((resp) => {
        if (resp) {
          // console.log('item post ', resp)
        }
        getdata();
      })
      .catch((error) => {
        // console.error(error);
      });
  };
  //----------------------------------------------

  //REPLY POST API

  var user_token = JSON.parse(localStorage.getItem("user"));
  // const [Comments, setComments] = useState("cid");
  const [content, setcontent] = useState("");

  const postUser = (Comments) => {
    // console.log(user_token)
    let token = user_token.access;
    let item = { user, Comments, content };
    // console.log(item)
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(item),
    };

    fetch("http://35.90.113.221/reply/", requestOptions)
      .then((detail) => detail.json())
      .then((resp) => {
        if (resp) {
          // console.log('item post ', resp)
        }
        getdata();
      })
      .catch((error) => {
        // console.error(error);
      });
  };
  //-----------------------------------------------

  //like POST API

  const likePost = (Post) => {
    let token = user_token.access;
    let item = { Post };
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(item),
    };

    fetch("http://35.90.113.221/like/" + Post, requestOptions).then((resp) => {
      if (resp) {
        // console.log('item post ', resp)
      }
      getdata();
    });
  };
  //-----------------------------------------------

  //-----------------------------------------------
  var user_token = JSON.parse(localStorage.getItem("user"));
  const [description, setDescription] = useState();
  const [location, setLocation] = useState();
  const [email, setEmail] = useState();
  const [workad_at, setWorkad_at] = useState();
  const [Studied_at, setStudied_at] = useState("");

  const aboutupdate = () => {
    // console.log(user_token)
    let token = user_token.access;
    let item = { user, description, location, email, workad_at, Studied_at };
    // console.log(item)
    const requestOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(item),
    };

    fetch("http://35.90.113.221/user_about_update/", requestOptions)
      .then((resp) => {
        setDescription(description);
        if (resp) {
          getAbout();
          alert("Edited Successfully");
        }
      })
      .catch((error) => {
        alert("Error Occured", error);
      });
  };
  //-----------------------------------------------

  //-----------------------------------------------
  var user_token = JSON.parse(localStorage.getItem("user"));
  const [linkedin, setLinkedin] = useState();
  const [twitter, setTwitter] = useState();
  const [instagram, setInstagram] = useState();
  const [facebook, setFacebook] = useState();

  const socialupdate = () => {
    // console.log(user_token)
    let token = user_token.access;
    let item = { user, linkedin, twitter, instagram, facebook };
    // console.log(item)
    const requestOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(item),
    };

    fetch("http://35.90.113.221/user_social_update/", requestOptions)
      .then((resp) => {
        if (resp) {
          GetSocial();
          stateupdate();
          alert("Edited Successfully");
        }
      })
      .catch((error) => {
        alert("Error Occured", error);
      });
  };

  // ==================[update state after update]=====================//
  const stateupdate = () => {
    setLinkedin();
    setTwitter();
    setInstagram();
    setFacebook();
  };

  //-----------------------------------------------

  //-----------------------------------------------
  var user_token = JSON.parse(localStorage.getItem("user"));
  const [imgfile, setUploadimg] = useState("");
  const [selectedFile, setSelectedfile] = useState(null);
  const [selectedFiles, setSelectedfiles] = useState(null);
  const [imgfile1, setUploadimg1] = useState("");

  const imageupdate = () => {
    // console.log(user_token)

    let token = user_token.access;

    const formData = new FormData();

    formData.append("images", selectedFile);
    formData.append("background_image", selectedFiles);
    formData.append("user", user_token.user_id);
    // console.log(formData)
    console.log(selectedFile);
    console.log(selectedFiles);

    const requestOptions = {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: formData,
    };

    fetch("http://35.90.113.221/user_profile_pic_update/", requestOptions)
      // .then(detail => detail.json())
      .then((resp) => {
        if (resp) {
          console.log(resp);
          getUser();
        }
      })
      .catch((error) => {
        console.error("ankit" + error);
      });
  };

  var onFileChange = (e) => {
    setSelectedfile(e.target.files[0]);
    setUploadimg(URL.createObjectURL(e.target.files[0]));
  };

  var onFileChange1 = (e) => {
    setSelectedfiles(e.target.files[0]);
    setUploadimg1(URL.createObjectURL(e.target.files[0]));
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("Logout");
    localStorage.removeItem("user");
    alert("Logout Successful /n Redirecting to Login Page");
    navigate("/");
  };

  //-----------------------------------------------
  return (
    <>
      {post ? (
        <div className="container-fluid">
          <div className="row">
            {/* NAVBAR */}
            <Navbar />
            {/* NAVBAR */}

            {/* PROFILE AND BACKGROUND IMAGE */}
            <div className="col-lg-12">
              <a
                onClick={handleLogout}
                className="buttonLogout btn btn-secondary"
              >
                Logout
              </a>
              <h4 className="h4profile">Profile</h4>
              <a href="#" className="dashboard">
                Dashboard
              </a>
              <FiberManualRecordIcon className="dot1" />
              <a href="#" className="user">
                User
              </a>
              <FiberManualRecordIcon className="dot2" />
              <p className="ui">My App UI</p>
              <div className="profilecard1">
                {user_profile_pic.map((item) => (
                  <img
                    key={item.id}
                    className="river"
                    src={"http://35.90.113.221" + item.background_image}
                  ></img>
                ))}
                {name.map((item) => (
                  <p key={item.email} className="usernamee">
                    {item.first_name} {item.last_name}
                  </p>
                ))}
                {name.map((item) => (
                  <p key={item.email} className="work">
                    {item.email}
                  </p>
                ))}
                {user_profile_pic.map((item) => (
                  <img
                    key={item.id}
                    className="profile2"
                    src={"http://35.90.113.221" + item.images}
                  ></img>
                ))}
                <button
                  className="piceditbutton btn"
                  type="button"
                  data-toggle="modal"
                  data-target="#picupdatemodel"
                >
                  Edit
                  <ModeEditOutlineOutlinedIcon className="aboutediticon" />
                </button>
              </div>
            </div>
            {/* PROFILE AND BACKGROUND IMAGE */}

            <div className="col-md-12 test">
              <div className="row">
                {/* ABOUT AND SOCIAL  */}
                <div className="col-sm-4 ">
                  <div className="card card1">
                    {about.map((item) => (
                      <div key={item.user} className="card-body">
                        <p className="p1">About</p>
                        <p> {item.description}</p>
                        <LocationOnIcon />
                        <p className="p3">
                          Live at{" "}
                          <span style={{ fontWeight: 700 }}>
                            {item.location}
                          </span>
                        </p>
                        <EmailIcon className="p4icon" />
                        <p className="p4">{item.email}</p>
                        <BusinessCenterIcon className="p5icon" />
                        <p className="p5">
                          Manager at{" "}
                          <span style={{ fontWeight: 700 }}>
                            {item.Studied_at}
                          </span>
                        </p>
                        <BusinessCenterIcon className="p6icon" />
                        <p className="p6">Studied at {item.workad_at}</p>
                        <button
                          className="abouteditbutton"
                          type="button"
                          data-toggle="modal"
                          data-target="#myModal"
                          onClick={() => getAbout()}
                        >
                          Edit
                          <ModeEditOutlineOutlinedIcon className="aboutediticon" />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="card card3">
                    {social.map((item) => (
                      <div className="card-body">
                        <p className="p13">Social</p>
                        <img
                          className="linkedin"
                          src="images\icons8-linkedin-a-business-and-employment-oriented-service-mobile-app-24.png"
                        />
                        <p className="p23">
                          {" "}
                          <a href="https://www.linkedin.com/in/caitlyn.kerluke">
                            {item.linkedin}
                          </a>{" "}
                        </p>
                        <img
                          className="twitter"
                          src="images\icons8-twitter-48.png"
                        />
                        <p className="p33">
                          {" "}
                          <a href="https://www.linkedin.com/in/caitlyn.kerluke">
                            {item.twitter}
                          </a>{" "}
                        </p>
                        <img
                          className="instagram"
                          src="images\icons8-instagram-48.png"
                        />
                        <p className="p43">
                          {" "}
                          <a href="https://www.linkedin.com/in/caitlyn.kerluke">
                            {item.instagram}
                          </a>{" "}
                        </p>
                        <img
                          className="facebook"
                          src="images\icons8-facebook-48.png"
                        />
                        <p className="p53">
                          {" "}
                          <a href="https://www.linkedin.com/in/caitlyn.kerluke">
                            {item.facebook}
                          </a>{" "}
                        </p>
                        <button
                          className=" abouteditbutton"
                          type="button"
                          data-toggle="modal"
                          data-target="#myupdateModal"
                          onClick={() => GetSocial()}
                        >
                          Edit
                          <ModeEditOutlineOutlinedIcon className="aboutediticon" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                {/* ABOUT AND SOCIAL  */}

                {/* THINKING AND POST */}
                <div className="col-sm-8 " style={{ paddingRight: "6rem" }}>
                  <div className="card card2">
                    <div className="card-body">
                      <input
                        type="text"
                        placeholder="Share what you are thinking here..."
                      />
                      <AddPhotoAlternateIcon className="addphoto" />
                      <AttachFileIcon className=" attatch" />
                      <button className="btn btn-success post">Post</button>
                    </div>
                  </div>

                  {userpost.map((item) => (
                    <div key={item.id} className="card card4">
                      <div className="card-body">
                        <div className="subdiv">
                          <img
                            className="card4profile"
                            src={
                              "http://35.90.113.221" + item.user?.user.images
                            }
                          />
                          <p className="card4ui">{item.tag_name}</p>
                          {/* <p className="card4ui">{item.post_content}</p> */}
                          {/* <p className="card4ui">{item.post_header}</p> */}
                          {/* <p className="card4ui">{item.post_name}</p> */}

                          <p className="card4date">
                            Created Date :
                            {new Date(item.created_date)
                              .toString()
                              .slice(0, 24)}
                          </p>
                          {/* <p className="card4date">
                            Updated Date :
                            {new Date(item.update_date).toString().slice(0, 24)}
                          </p> */}
                          <p className="card4p1">{item.post_name}</p>
                        </div>
                        <div className="imagewithlike">
                          <img
                            className="feed"
                            src={"http://35.90.113.221" + item.images}
                          />
                          <div className="likescontainer">
                            <button
                              className="heartbutton"
                              onClick={() => likePost(item.id)}
                            >
                              <i className="fa fa-heart proheart"></i>
                            </button>
                            <p className="a36">{item.total_likes}</p>

                            {item.liked_by?.slice(-3).map((itemsss, i) => (
                              <img
                                className="card4img1"
                                src={
                                  "http://35.90.113.221" + itemsss.user?.images
                                }
                              />
                            ))}
                          </div>
                        </div>

                        {/* <hr className="profilehr" /> */}

                        <div className="commentsection">
                          <div className="commentscroll">
                            {item.comment.map((items) => (
                              <div className="comment1">
                                <div className="commenternameanddate">
                                  <p className="resumep1">
                                    {items.user.first_name +
                                      " " +
                                      items.user.last_name}
                                  </p>
                                  <p className="resumep3">
                                    {new Date(items.datetime)
                                      .toString()
                                      .slice(0, 15)}
                                  </p>
                                </div>

                                <p className="resumep2">{items.text}</p>
                                {/* new code  */}
                                {/* <Fade left> */}
                                <div>
                                  {selectedComment === items.cid &&
                                    replyVisible && (
                                      <div
                                        style={{
                                          flexDirection: "row",
                                          marginTop: "10px",
                                        }}
                                      >
                                        <div className="replyinputdiv">
                                          {user_profile_pic.map(
                                            (item, index) => (
                                              <img
                                                key={index}
                                                src={
                                                  "http://35.90.113.221" +
                                                  item.images
                                                }
                                                style={{
                                                  height: "35px",
                                                  width: "35px",
                                                  borderRadius: 30,
                                                  marginRight: "5px",
                                                }}
                                              />
                                            )
                                          )}
                                          <input
                                            type="text"
                                            placeholder="Write a reply"
                                            placeholderTextColor={"#C4C4C4"}
                                            className="replys"
                                            value={content}
                                            onChange={(e) =>
                                              setcontent(e.target.value)
                                            }
                                          />
                                          <button
                                            onClick={() => postUser(items.cid)}
                                            type="submit"
                                            className="btn replysubmit"
                                          >
                                            <b style={{ color: "white" }}>
                                              <SendIcon className="replysendico" />
                                            </b>
                                          </button>
                                        </div>

                                        <button
                                          onClick={() => handleReplyCancel()}
                                          className="doreply"
                                        >
                                          Cancel
                                        </button>
                                      </div>
                                    )}
                                  {!replyVisible && (
                                    <button
                                      className="doreply"
                                      onClick={() =>
                                        handleReplyClick(items.cid)
                                      }
                                    >
                                      Reply
                                    </button>
                                  )}
                                </div>
                                {/* </Fade> */}
                                {/* end */}
                                {/* <button
                                  className="doreply"
                                  type="button"
                                  onClick={() => handleReplyClick(items.cid)}
                                >
                                  {show === true ? "Cancel" : "Reply"}
                                </button>

                                <Fade left>
                                  <div className="replyinputdiv">
                                    {selectedComment === items.cid && show && (
                                      <input
                                        type="text"
                                        className="replys"
                                        placeholder="Reply...."
                                        name="content"
                                        value={content}
                                        onChange={(e) =>
                                          setcontent(e.target.value)
                                        }
                                      />
                                    )}
                                    {show && (
                                      <button
                                        onClick={() => postUser(items.cid)}
                                        type="submit"
                                        className="btn replysubmit"
                                      >
                                        <b style={{ color: "white" }}>
                                          <SendIcon className="replysendico" />
                                        </b>
                                      </button>
                                    )}
                                  </div>
                                </Fade> */}
                              </div>
                            ))}
                          </div>

                          <div className="sendReply">
                            {user_profile_pic.map((item) => (
                              <img
                                className="reply"
                                src={"http://35.90.113.221" + item.images}
                              ></img>
                            ))}
                            <input
                              className="card4input"
                              type="text"
                              placeholder="Write a comment ..."
                              name="text"
                              value={text}
                              onChange={(e) => settext(e.target.value)}
                            />
                            <button
                              className="z3"
                              onClick={() => commentpostUser(item.id)}
                              type="submit"
                            >
                              <SendIcon />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {/* THINKING AND POST */}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <CircularProgress
          style={{
            width: 80,
            height: 80,
            position: "absolute",
            left: "45%",
            top: "35%",
            color: "#f45ca5",
          }}
        />
      )}

      {/* About section update model */}
      <div className="modal fade" id="myModal" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body mb1">
              <p className="diseditp1">Discription :-</p>{" "}
              <input
                className="disedit1"
                type="text"
                placeholder="Discription"
                name="discription"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <p className="diseditp2">Location :-</p>{" "}
              <input
                className="disedit2"
                type="text"
                placeholder="Location"
                name="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <p className="diseditp3">Email :-</p>{" "}
              <input
                className="disedit3"
                type="text"
                placeholder="Email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <p className="diseditp4">Worked At :-</p>{" "}
              <input
                className="disedit4"
                type="text"
                placeholder="Worked At"
                name="studiedat"
                value={Studied_at}
                onChange={(e) => setStudied_at(e.target.value)}
              />
              <p className="diseditp5">Studied At :-</p>{" "}
              <input
                className="disedit5"
                type="text"
                placeholder="Studied At"
                name="workedat"
                value={workad_at}
                onChange={(e) => setWorkad_at(e.target.value)}
              />
              <button
                className="scludtbtn"
                data-dismiss="modal"
                type="button"
                onClick={aboutupdate}
              >
                Update
              </button>
              <button className="scludtbtn2" type="button" data-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* About section update model */}

      {/* social section update model */}
      <div className="modal fade" id="myupdateModal" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body mb2">
              <p className="diseditp1">LinkedIn :-</p>{" "}
              <input
                type="text"
                placeholder="LinkedIn"
                className="disedit1"
                name="linkedin"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
              />
              <p className="diseditp2">Twitter :-</p>{" "}
              <input
                type="text"
                placeholder="Twitter"
                className="disedit2"
                name="twitter"
                value={twitter}
                onChange={(e) => setTwitter(e.target.value)}
              />
              <p className="diseditp3">Instagram :-</p>{" "}
              <input
                type="text"
                placeholder="Instagram"
                className="disedit3"
                name="instagram"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
              />
              <p className="diseditp4">Facebook :-</p>{" "}
              <input
                type="text"
                placeholder="Facebook"
                className="disedit4"
                name="facebook"
                value={facebook}
                onChange={(e) => setFacebook(e.target.value)}
              />
              <button
                className="scludtbtna"
                type="button"
                onClick={socialupdate}
                data-dismiss="modal"
              >
                update
              </button>
              <button
                className="scludtbtna2"
                type="button"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* social section update model */}

      {/* profile pic section update model */}
      <div className="modal fade" id="picupdatemodel" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body mb2">
              <div className="col-sm-8 div8">
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
                </div>
                <label htmlFor="files" className="fileslabel btn">
                  Choose Background Image
                </label>

                <button
                  onClick={imageupdate}
                  type="submit"
                  className="btn-primary profilesubmit"
                  data-dismiss="modal"
                >
                  submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* profile pic section update model */}
    </>
  );
};
export default Profile;

{
  /* <i className="fa fa-ellipsis-v"></i> */
}
