import React from "react";
import "../css/BlogopenAman.css";
import Navbar from "./Navbar";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import CircularProgress from "@material-ui/core/CircularProgress";
import Fade from "react-reveal/Fade";
import Jump from "react-reveal/Jump";

const BlogopenAman = () => {
  //LOADER
  const [load, setLoad] = useState(false);
  //LOADER

  // ONCLICK SHOW OR HIDE
  //   const [show, setShow] = useState(false);
  //   const [rshow, setRshow] = useState(false);
  // ONCLICK SHOW OR HIDE

  let { id } = useParams();
  var user_token = JSON.parse(localStorage.getItem("user"));
  let token = user_token?.access;

  useEffect(() => {
    data();
  }, []);

  //POST DETAIL GET API
  const [detail, setDetail] = useState([]);
  const data = async () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    };

    fetch(`http://35.90.113.221/postdetail/${id}`, requestOptions).then(
      (resp) => {
        const { body } = resp;
        setLoad(body);
        resp.json().then((resp) => {
          console.log(resp);
          setDetail(resp);
        });
      }
    );
  };
  //POST DETAIL GET API

  // COMMENT POST API intrigation
  var user_token = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(user_token?.user_id);
  const [text, settext] = useState("");
  const [Post, setPost] = useState(id);
  const postUser = () => {
    let token = user_token.access;
    let item = { user, text, Post };
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
        data();
        settext("");
      })
      .catch((error) => {
        // console.error(error);
      });
  };
  // COMMENT POST API

  //REPLY POST API
  var user_token = JSON.parse(localStorage.getItem("user"));
  const [content, setcontent] = useState("");
  const postreplyUser = (Comments) => {
    let token = user_token.access;
    let item = { user, Comments, content };
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
          console.log("item post ", resp);
        }
        data();
        setcontent("");
      })
      .catch((error) => {
        // console.error(error);
      });
  };
  // REPLY POST API

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
      data();
    });
  };
  //LIKE POST API

  //popup for comments
  const [activeComment, setActiveComment] = useState(null);
  const [showReplySection, setShowReplySection] = useState(false);
  const [replyButtonText, setReplyButtonText] = useState("Reply");

  const handleCommentClick = (comment) => {
    console.log(comment);
    if (activeComment && activeComment.id === comment.id) {
      // if the same comment is clicked twice, collapse the reply section
      setActiveComment(null);
      setShowReplySection(false);
      setReplyButtonText("Reply"); // show the reply button again
    } else {
      // otherwise, show the reply section for the new comment
      setActiveComment(comment);
      setShowReplySection(true);
      setReplyButtonText("Cancel"); // show the cancel button
    }
  };
  //popup for comments

  //popup for replys
  const [activeReply, setactiveReply] = useState("");
  const [showReply2Section, setshowReply2Section] = useState(false);
  const [replyButton2Text, setreplyButton2Text] = useState("Reply");

  const handlereplyClick = (comment) => {
    if (activeReply && activeReply.id === comment.id) {
      // if the same comment is clicked twice, collapse the reply section
      setactiveReply(null);
      setshowReply2Section(false);
      setreplyButton2Text("Reply"); // show the reply button again
    } else {
      // otherwise, show the reply section for the new comment
      setactiveReply(comment);
      setshowReply2Section(true);
      setreplyButton2Text("Cancel"); // show the cancel button
    }
  };
  // console.log("load", load);
  //popup for replys

  console.log(detail, "likes");

  return (
    <>
      {load ? (
        <div className="container-fluid">
          <div className="row" style={{ justifyContent: "center" }}>
            <Navbar />
            <div className="col-sm-12">
              <h4 className="h4profile">Post Details</h4>
              <a href="#" className="dashboard">
                Dashboard
              </a>
              <FiberManualRecordIcon className="dot1" />
              <a href="#" className="user">
                Blog
              </a>
              <FiberManualRecordIcon className="dot2" />
              <p className="ui">New Post</p>
            </div>
            <div className="col-sm-10 postdetaildiv">
              <div className="imgContainer">
                <div className="imgContainer1">
                  <img
                    className="detailimg1"
                    src={"http://35.90.113.221" + detail.images}
                  />
                  <img
                    className="detailimg1black"
                    src="\images\blog\download.jpg"
                  />
                  <p className="detailp">{detail.post_header}</p>
                  <p className="detailp9">
                    Update Date :
                    {new Date(detail.update_date).toString().slice(0, 24)}
                  </p>

                  <div className="figCaption">
                    {/* <div> */}
                    <img
                      className="detailimg3"
                      src={"http://35.90.113.221" + detail.user?.user.images}
                    ></img>
                    {/* </div> */}
                    <div
                      className="d-flex flex-column justify-content-around"
                      style={{ height: "100%" }}
                    >
                      <p className="detailp2">
                        {detail.user?.first_name} {detail.user?.last_name}
                      </p>
                      <p className="detailp3">
                        {new Date(detail.created_date).toString().slice(0, 24)}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="likeContainer d-flex">
                  <button
                    onClick={() => likePost(detail.id)}
                    className="blogopenheart"
                  >
                    {/* <i className="fa fa-heart"></i> */}
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRO_QM1sWq2FVwcCxurpcBe9zQ79waYMJwSKJjRRJLHOQ&s"
                      alt="Like Button"
                      className="likeIcon"
                    />
                  </button>
                  <p className="detailp10">{detail.total_likes}</p>
                  {detail.liked_by?.slice(-3).map((itemsss, i) => (
                    <img
                      className="blogopenlikeimage2"
                      src={"http://35.90.113.221" + itemsss.user?.images}
                    />
                  ))}
                </div>
              </div>

              <hr />

              <div className="blue">
                <p className="detailp4">#{detail.blog}</p>
                <p className="detailp5">{detail.tag_name}</p>
                <p className="detailp6">{detail.post_name}</p>
                <p className="detailp7">Description:</p>
                <div
                  className="detailp8"
                  dangerouslySetInnerHTML={{ __html: detail.post_content }}
                  
                >
                  {/* <p>{detail.post_content}</p> */}
                </div>
              </div>
              <hr />

              <div className="makeComment">
                <p className="detailp11">Comments</p>
                <div className="postSendBtn">
                  <textarea
                    className="discriptioncomment"
                    placeholder="Write a comment......"
                    name="text"
                    value={text}
                    onChange={(e) => settext(e.target.value)}
                  />
                  <button
                    className="discriptioncommsend"
                    type="submit"
                    onClick={() => postUser(detail.id)}
                  >
                    Post Comment
                  </button>
                </div>
              </div>
              <hr />
              <div className="commentsss">
                {detail.comment?.map((comment) => (
                  <div key={comment.cid} className="discriptioncommentshow">
                    <img
                      className="discriptioncommentshowimg1"
                      src={"http://35.90.113.221" + comment?.user?.user?.images}
                    />
                    <p className="discriptioncommentshow1">
                      {comment.user?.first_name} {comment.user?.last_name}
                    </p>
                    <p className="discriptioncommentshow2">
                      {new Date(comment.datetime).toString().slice(0, 24)}
                    </p>
                    <p className="discriptioncommentshow3">{comment.text} </p>

                    <button
                      className="discriptioncommentshowbutton1"
                      type="button"
                      onClick={() => handleCommentClick(comment)}
                    >
                      {activeComment && activeComment.cid === comment.cid
                        ? replyButtonText
                        : "Reply"}
                    </button>
                    {showReplySection &&
                      activeComment &&
                      activeComment.cid === comment.cid && (
                        <div>
                          <Jump>
                            {" "}
                            <input
                              className="discriptioncommentshowinput"
                              type="text"
                              placeholder="Reply...."
                              name="content"
                              value={content}
                              onChange={(e) => setcontent(e.target.value)}
                            />
                          </Jump>
                          <Jump>
                            {" "}
                            <button
                              onClick={() => postreplyUser(comment.cid)}
                              type="submit"
                              className="discriptioncommentshowbutton2"
                            >
                              Reply
                            </button>
                          </Jump>
                        </div>
                      )}

                    <hr className="blogopenhr3" />

                    {comment.reply?.map((replys) => (
                      <div
                        key={replys.rid}
                        style={{
                          marginTop: 30,
                          position: "relative",
                          bottom: "20px",
                        }}
                      >
                        <img
                          className="discriptioncommentshowimg2"
                          src={
                            "http://35.90.113.221" + replys?.user?.user?.images
                          }
                        />
                        <p className="commrepp1">
                          {replys.user.first_name} {replys.user.last_name}
                        </p>
                        <p className="commrepp2">
                          {new Date(replys.datetime).toString().slice(0, 24)}
                        </p>
                        <p className="commrepp3">{replys.content}</p>

                        <button
                          className="replydiscriptioncommentshowbutton1"
                          type="button"
                          onClick={() => handlereplyClick(replys)}
                        >
                          {activeReply && activeReply.rid === replys.rid
                            ? replyButton2Text
                            : "Reply"}
                        </button>
                        {showReply2Section &&
                          activeReply &&
                          activeReply.rid === replys.rid && (
                            <div>
                              <Fade left>
                                {" "}
                                <input
                                  className="replydiscriptioncommentshowinput"
                                  type="text"
                                  placeholder="Reply...."
                                  name="content"
                                  value={content}
                                  onChange={(e) => setcontent(e.target.value)}
                                />
                              </Fade>
                              <Fade left>
                                {" "}
                                <button
                                  onClick={() => postreplyUser(comment.cid)}
                                  type="submit"
                                  className="replydiscriptioncommentshowbutton2"
                                >
                                  Reply
                                </button>
                              </Fade>
                            </div>
                          )}
                        <hr className="blogopenhr4" />
                      </div>
                    ))}
                  </div>
                ))}
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
    </>
  );
};

export default BlogopenAman;
