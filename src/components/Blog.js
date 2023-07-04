import React from "react";
import Navbar from "./Navbar";
import "../css/Blog.css";
import SearchIcon from "@mui/icons-material/Search";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import AddIcon from "@mui/icons-material/Add";
import TextsmsRoundedIcon from "@mui/icons-material/TextsmsRounded";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Zoom from "react-reveal/Zoom";
import CircularProgress from "@material-ui/core/CircularProgress";
import GroupIcon from "@mui/icons-material/Group";
const Blog = () => {
  const [blog, setBlog] = useState([]);
  const [selectedOption, setSelectedOption] = useState("latest");
  const [post, setPost] = useState(null);
  const postUser = () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
    fetch(
      `http://35.90.113.221/Category/?sort_order=${selectedOption}`,
      requestOptions
    ).then((resp) => {
      resp.json().then((resp) => {
        setPost(resp);
        // setLoading(false);
        setBlog(resp);
      });
    });
  };
  useEffect(() => {
    postUser();
  }, [selectedOption]);
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  // const [blog, setBlog] = useState([]);
  // const [post, setPost] = useState(null);

  // useEffect(() => {
  //   const requestOptions = {
  //     method: "GET",
  //     redirect: "follow",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json",
  //       // Authorization:
  //       //     'Bearer ' + token,
  //     },
  //   };

  //   fetch(
  //     "http://35.90.113.221/view_all_posts/",

  //     requestOptions
  //   ).then((resp) => {
  //     const { body } = resp;
  //     setPost(body);
  //     resp.json().then((resp) => {
  //       // console.log(resp);
  //       setBlog(resp);
  //     });
  //   });
  // }, []);

  return (
    <>
      {post ? (
        <div className="container-fluid ">
          <div className="row">
            <Navbar />
            <div className="col-sm-12 ">
              <h4 className="h4profile">Blog</h4>
              <a href="#" className="dashboard">
                Dashboard
              </a>
              <FiberManualRecordIcon className="dot1" />
              <a href="#" className="user">
                Blog
              </a>
              <FiberManualRecordIcon className="dot2" />
              <p className="ui">New Post</p>
              <Link to="/New_post">
                {" "}
                <button className="btn pluspostbutton">
                  <AddIcon className="addicon" />
                  New Post
                </button>
              </Link>
              {/* <div > */}
              
              <input
                className="searchpost"
                type="Search"
                placeholder="Search post..."
              ></input>
              <SearchIcon className="blogsearchicon" />
              {/* </div> */}
              
              <select
                className="blogselect"
                value={selectedOption}
                onChange={handleOptionChange}
              >
                <option value="latest">Latest</option>
                <option value="popular">Populer</option>
                <option value="oldest">Oldest</option>
              </select>

              <div className="fcontainer">
                {blog.map((item, j) => (
                  <Zoom key={j}>
                    <div className="fitem">
                      <Link
                        style={{ textDecoration: "none" }}
                        to={`Blogopen/${item.id}`}
                      >
                        <img
                          className="blog4img1"
                          src={"http://35.90.113.221" + item.user.user.images}
                        ></img>
                        <img
                          style={{ width: 311, height: 200 }}
                          src={"http://35.90.113.221" + item.images}
                          className="blog4img2"
                        ></img>
                        <p className="blog4p1">{item.post_name}</p>
                        <p style={{ color: "black" }} className="blog4p2">
                          {item.tag_name}
                        </p>
                        <p className="blogpagedate">
                          {new Date(item.created_date).toString().slice(0, 24)}
                        </p>
                        <TextsmsRoundedIcon className="blog4commenticon w3-large" />
                        <p className="blog4commenticonp">
                          {item.comment.length}
                        </p>
                      </Link>
                    </div>
                  </Zoom>
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
export default Blog;

// useEffect(() => {
//     const requestOptions = {
//         method: 'GET',
//         redirect: 'follow',
//         headers: {
//             'Content-Type': 'application/json',
//             Accept: 'application/json',
//             // Authorization:
//             //     'Bearer ' + token,
//         },
//     };

//     const fetchData = () => {
//         fetch(
//             'http://35.90.113.221/view_all_posts/',
//             requestOptions,
//         ).then(resp => {
//             const { body } = resp
//             setPost(body)
//             resp.json().then(resp => {
//                 // console.log(resp);
//                 setBlog(resp);

//             });
//         });
//     }

//     // Fetch data every 5 seconds
//     const interval = setInterval(() => {
//         fetchData();
//     }, 5000);

//     // Clean up the interval on unmount
//     return () => clearInterval(interval);
// }, []);
