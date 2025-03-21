import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { Container, Col, Row } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import {postRequest} from '../../helpers/apiHelpers'

const AuthModule = (props) => {
  const { clientId } = props;
  const navigate = useNavigate();
  const callBackendToVerify = async (response) => {
    try {
      let responseFromWebServer = await postRequest("/auth/callback", response, false);

      if (responseFromWebServer.status == 200) {
        localStorage.setItem("token", responseFromWebServer.data.data.token);
        navigate("/home", { replace: true });
        toast.success("Login successfull", { autoClose: 2000 });
      }
    } catch (error) {
      console.log("error ", error);
      toast.error("Unable to login, Try again", { autoClose: 2000 });
    }
  };
  return (
    <Container className="text-center mt-5 mb-5 w-100">
      <div className="d-flex justify-content-center align-items-center mb-5 mt-5">
        <Col md={5} className="m-5">
          <Row md={10} className="shadow-lg p-3 mb-5 bg-body rounded">
            <h3 className="mb-3">Welcome to Memory Lane!</h3>
            <p className="mb-5 text-center w-100">
              Memory Lane is designed to make it easy for you to preserve the
              special moments in life. We believe in the power of memories and
              aim to provide you with a safe, easy-to-use platform to keep those
              moments close. Start uploading today and let us help you relive
              your happiest moments, any time.
            </p>
            <GoogleOAuthProvider clientId={clientId}>
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  console.log(credentialResponse);
                  callBackendToVerify(credentialResponse);
                }}
                onError={() => {
                  console.log("Login Failed");
                }}
              />
            </GoogleOAuthProvider>
          </Row>
        </Col>
      </div>
    </Container>
  );
};

export default AuthModule;
