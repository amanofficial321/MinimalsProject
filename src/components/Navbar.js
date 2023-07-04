import React from "react";
import GroupIcon from "@mui/icons-material/Group";
import { Link, useNavigate } from "react-router-dom";
import "../css/Navbar.css";
import { useEffect, useState } from "react";
import {Modal} from 'react-bootstrap';
import {Button} from 'react-bootstrap';

const Navbar = () => {
  var user_token = JSON.parse(localStorage.getItem("user"));
  let token = user_token?.access;
  const [user_profile_pic, setUser_profile_pic] = useState([]);

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
      "http://35.90.113.221/user_profile_pic/",

      requestOptions
    ).then((resp) => {
      // console.log(resp);
      resp.json().then((resp) => {
        setUser_profile_pic(resp);
      });
    });
  }, []);

  const navigate = useNavigate();

  // console.log(user_profile_pic)

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    navigate('/')
  } ;
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="col-lg-12  sticky-top navbar-background">
        <ul style={{ listStyle: "none" }}>
          <li>
            {user_profile_pic && user_profile_pic.length > 0 ? (
              user_profile_pic.map((picture, index) => (
                <div class="dropdown ">
                  {picture.images ? (
                    <img
                      className="navprofile dropdown-toggle"
                      key={index}
                      src={"http://35.90.113.221" + picture.images}
                      alt={`Profile Picture ${index}`}
                      data-bs-toggle="dropdown"
                    />
                  ) : (
                    <img
                      className="navprofile dropdown-toggle"
                      src="https://svgsilh.com/svg/659651.svg"
                      data-bs-toggle="dropdown"
                    />
                  )}

                  <ul class="dropdown-menu">
                    <li>
                      <Link class="dropdown-item" to={"/Profile"}>
                        Profile Section
                      </Link>
                    </li>
                    <li>
                      <div
                        class="dropdown-item"

                         onClick={
                           () =>{
                            localStorage.removeItem("user");
                            handleShow()
                            // navigate("/");
                           }
                           
                         }
                      >
                        Logout
                      </div>
                      <Modal show={show} onHide={handleClose}>
                      <Modal.Header closeButton>
                        <Modal.Title> <h3>Logout</h3> </Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        
                        <h5> Logout Successful</h5>
                        
                        <h5>Redirecting to Home Page</h5>
                        
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                          Close
                        </Button>
                        
                      </Modal.Footer>
                    </Modal>
                    </li>
                  </ul>
                </div>
              ))
            ) : (
              <div class="dropdown navprofile">
                <img
                  className="navprofile dropdown-toggle"
                  src="https://svgsilh.com/svg/659651.svg"
                  data-bs-toggle="dropdown"
                />

                <ul class="dropdown-menu">
                  <li>
                    <Link class="dropdown-item" to={"/Profile"}>
                      Profile Section
                    </Link>
                  </li>
                  <li>
                    <div
                      class="dropdown-item"
                      // onClick={() => {
                      //   localStorage.removeItem("user");
                      //   alert("Logout Successful  Redirecting to Login Page");
                      //   navigate("/");
                      // }}
                      onClick={handleShow}
                    >
                      Logout
                    </div>
                   
                  </li>
                </ul>
              </div>
            )}
          </li>
          <li>
            <a className="nav-link" href="#">
              <GroupIcon className="navgroup" />
            </a>
          </li>
          <li>
            <a className="nav-link" href="#">
              <img className="navflag" src="\images\us.png" />{" "}
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};
export default Navbar;
