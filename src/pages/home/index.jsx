import React, { useState, useEffect } from "react";
import { Container, Button, ButtonGroup, Row, Col } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import { postRequest } from "../../helpers/apiHelpers";
import ListItemElement from "../../components/atomListElement";
import ViewModalForMedia from "../../components/viewModalMedia";
import {useNavigate} from 'react-router-dom'

const HomePage = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [customLoading, setCustomLoading] = useState();
  const [mediaUrl, setMediaUrl] = useState();
  const [mediaList, setMediaList] = useState([]);
  const [showViewModal, setShowViewModal] = useState(false);
  const [isImageType, setIsImageType] = useState(false);
  const navigate = useNavigate();

  const callViewMediaApi = async (fileName, fileType) => {
    try {
      let buildMediaPath = import.meta.env.VITE_API_MEDIA_URL + fileName;
      if (fileType == "video/mp4") {
        setIsImageType(false);
      } else {
        setIsImageType(true);
      }
      setMediaUrl(buildMediaPath);
      setShowViewModal(true);
    } catch (error) {
      console.log("error in call api generate pdf ", error);
      throw error;
    }
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchMediaList = async () => {
      try {
        let response = await postRequest("/media/get-list", {}, true);
        if (response.status == 200) {
          console.log("response ", response.data.data);
          setMediaList([...response.data.data]);
          setIsLoading(false);
        }
      } catch (error) {
        console.log("error from the api helpser ", error);
        setIsLoading(false);
      }
    };

    fetchMediaList();
  }, []);

  const handleModalClose = () => {
    setShowViewModal(false);
  };

  const navigateToAddMedia = ()=> {
    navigate('/addMedia')
  }

  const logoutUser = ()=> {
    localStorage.removeItem("token");
    navigate("/login")
  }

  return (
    <Container>
      <div className="header text-center mb-3 mt-5">
        <h3>Welcome to Memories !</h3>
        <div className="d-flex justify-content-end align-items-center">
          <Button className="me-3" variant="dark" onClick={()=> navigateToAddMedia()}>Add Media</Button>
          <Button variant="danger" onClick={()=> logoutUser()}>Logout</Button>
        </div>
      </div>

      <Container
        className="mt-5"
        style={{
          overflowY: "auto",
          height: "60vh",
          paddingBlock: "15px",
          backgroundColor: "#e1e1db",
          borderRadius: "0.5rem",
          scrollBehavior: "smooth",
          scrollbarWidth: "none",
        }}
      >
        {isLoading ? (
          <Skeleton className="z-3" height={70} count={5} />
        ) : mediaList.length > 0 ? (
          <Row>
            {mediaList.map((listItem, index) => (
              <Col md={6}>
                <ListItemElement
                  callApiForView={callViewMediaApi}
                  key={index}
                  data={listItem}
                  isLoading={customLoading || isLoading}
                />
              </Col>
            ))}
              </Row>
        ) : (
          <h3
            style={{
              marginTop: "10rem",
              color: "black",
              textAlign: "center",
            }}
          >
            No Data Found
          </h3>
        )}
      </Container>
      {showViewModal ? (
        <ViewModalForMedia
          show={showViewModal}
          handleModalClose={handleModalClose}
          fileUrl={mediaUrl}
          IsImage={isImageType}
        />
      ) : null}
    </Container>
  );
};

export default HomePage;
