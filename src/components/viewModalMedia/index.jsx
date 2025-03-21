import { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const ViewModalForMedia = (props) => {
  const [fileUrl, setFileUrl] = useState(props.fileUrl);

  return (
    <>
      <Modal show={props.show} onHide={props.handleModalClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>View Media</Modal.Title>
        </Modal.Header>

        <Modal.Body className="text-center">
          {props.IsImage ? (
            <img src={fileUrl} alt="image" className="img-fluid" />
          ) : (
            <video
              controls
              style={{
                width: "100%",
                maxHeight: "500px",
                objectFit: "contain",
              }}
            >
              <source src={fileUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ViewModalForMedia;
