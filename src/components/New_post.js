import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import "../css/New_post.css";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { useNavigate } from "react-router-dom";
const New_post = () => {
  var user_token = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(user_token?.user_id);
  const [post_name, setPost_name] = useState("");
  const [tag_name, setTag_name] = useState("");
  const [blog, setBlog] = useState("");
  const [post_header, setPost_header] = useState("");
  const [post_content, setPost_content] = useState();

  const navigate = useNavigate();

  const [editorContent, setEditorContent] = useState("");
  // var selectedFile;

  const [selectedFile, setSelectedFile] = useState([]);

  const postUser = () => {
    let token = user_token.access;
    let item = { user, post_name, tag_name, blog, post_header, post_content };
    const formData = new FormData();

    formData.append("images", selectedFile);
    formData.append("user", user_token.user_id);
    formData.append("post_name", post_name);
    formData.append("tag_name", tag_name);
    formData.append("blog", blog);
    formData.append("post_header", post_header);
    formData.append("post_content", post_content);

    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: formData,
    };
    fetch("http://35.90.113.221/user_post/", requestOptions)
      .then((detail) => detail.json())
      .then((resp) => {
        if (resp) {
          console.log("item post ", resp);
        }
        if (resp.id) {
          alert("Post Successfully Created");
          navigate("/blog");
        } else {
          alert("Bad Request, Please select Blog");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const [previewurl, setPreviewurl] = useState("");

  const onFileChange = (e) => {
    setSelectedFile(e.target?.files[0]);
    setPreviewurl(URL.createObjectURL(e.target?.files[0]));
  };

  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    fetch("http://35.90.113.221/blogs/")
      .then((response) => response.json())
      .then((data) => {
        setBlogs(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const handlechange = (event) => {
    var ids = event.target.value;
    setBlog(ids);
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12 ">
            <Navbar />
          </div>

          <div className="col-sm-12 ">
            <h4 className="h4profile">Create a new post</h4>
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

          {/* <div className=" bg-primary" style={{width:10}}>1</div>
                    <div className=" bg-info">1</div>
                    <div className="col-sm-12 bg-danger">1</div> */}
        </div>
      </div>

      <div className="container-fluid ">
        <div className="row">
          <div className="col-sm-12">
            <div className="postpublishcard">
              <div className="card postcard">
                <div className="card-body">
                  <input
                    className="postinput"
                    type="text"
                    placeholder="Post Title"
                    name="post_name"
                    value={post_name}
                    onChange={(e) => setPost_name(e.target.value)}
                  />
                  <textarea
                    className="discriptioninput"
                    type="text"
                    placeholder="Discription"
                    name="post_header"
                    value={post_header}
                    onChange={(e) => setPost_header(e.target.value)}
                  />
                  <div className="coverdiv">
                    <p className="cover">Cover</p>

                    <img src={selectedFile?.name} alt="" />

                    <input
                      onChange={onFileChange}
                      style={{ backgroundImage: `url(${previewurl}` }}
                      className="browse"
                      type="file"
                      name="images"
                      accept="image/*"
                    />

                    <label htmlFor="file">
                      <b>Drop or select file</b>
                      <br />
                      <br />
                      <p>
                        Drop files here or click{" "}
                        <span
                          style={{
                            color: "green",
                            textDecoration: "underline",
                          }}
                        >
                          browse{" "}
                        </span>{" "}
                        through your machine
                      </p>
                      <img src="images\Screenshot (147).png" />
                    </label>
                  </div>
                </div>
              </div>

              <div className="card publishcard">
                <div className="card-body">
                  <select className="dropdown" onChange={handlechange}>
                    <option>Select a blog</option>
                    {blogs.map((blog) => (
                      <option key={blog.id} value={blog.id}>
                        {blog.blog_name}
                      </option>
                    ))}
                  </select>
                  <input
                    className="tagsinput"
                    type="text"
                    placeholder="Tags"
                    name="tag_name"
                    value={tag_name}
                    onChange={(e) => setTag_name(e.target.value)}
                  />
                  <input
                    className="metainput"
                    type="text"
                    placeholder="Meta title"
                    readOnly
                  />
                  <textarea
                    className="description"
                    type="text"
                    placeholder="Meta discription"
                  />
                  <input
                    className="ketakeyinput"
                    type="text"
                    placeholder="Meta keywords"
                  />
                </div>
              </div>
            </div>

            <div className="postContentWithButton">
              <p className="content">Content</p>

              <div className="card editor">
                <CKEditor
                  editor={ClassicEditor}
                  data={editorContent}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setPost_content(data);
                  }}
                  value={post_content}
                />
              </div>

              <div className="buttons">
                <button className="btn btn-light previewbutton">Preview</button>

                <button
                  onClick={() => postUser()}
                  type="submit"
                  className="btn postbutton"
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default New_post;
