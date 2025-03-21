import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useFormik } from "formik";
import addMediaFileValidationSchema from "../../../validationSchemas/addMediaSchema";
import { toast } from "react-toastify";
import { postRequest } from "../../helpers/apiHelpers";
import { useNavigate } from "react-router";

const AddMediaForm = (props) => {
  const [uploadedFile, setUploadedFile] = useState();
  const [onLoading, setOnLoading] = useState(false);
  const [fileName, setFileName] = useState();
  const navigate = useNavigate();

  const handleFileSubmit = async ()=> {
    try {
        setOnLoading(true);
        const formData = new FormData();
        formData.append("media", formik.values.media);

        let uploadMediaToServer = await postRequest("/media/upload", formData, true, {
            "Content-Type": "multipart/formdata"
        });

        console.log('upload ', uploadMediaToServer)
        if (uploadMediaToServer.status == 200) {
            toast.success(uploadMediaToServer.data.message, {autoClose: 2000});
            navigate("/home");
            setOnLoading(false);
        } else {
            toast.error(uploadMediaToServer.data.message, {autoClose: 2000});
            setOnLoading(false);
            setFileName("");
            formik.setFieldValue("media", "");
        }
    } catch (error) {
        console.log('error in media upload ', error);
        toast.error("Something went wrong in file submission");
        setFileName("");
        formik.setFieldValue("media", "");
        setOnLoading(false)
    }
  }
  const formik = useFormik({
    initialValues: {
      media: "",
    },
    validationSchema: addMediaFileValidationSchema,
    onSubmit: async (values) => {
      await handleFileSubmit();
    },
    onReset: ()=> {
        setFileName("");
        formik.setFieldValue("media", "");
    }
  });

  const handleChange = (e) => {
    formik.setFieldValue("media", e.target.files[0]);
    setFileName(e.target.files[0].fileName);
  };
  return (
    <Container className="text-center mt-5 mb-5 w-100">
      <div className="d-flex justify-content-center align-items-center mb-5 mt-5">
        <Col md={5} className="m-5">
          <Row md={10} className="shadow-lg p-3 mb-5 bg-body rounded">
            <h3 className="mb-3">Add your media files!</h3>

            <Container className="mt-3">
              <Form>
                <Row className="text-center">
                  <Col md={12}>
                    <div className="mb-3">
                      <Form.Label className="fw-semibold text-start w-100">
                        Upload Media
                      </Form.Label>
                      <Form.Control
                        type="file"
                        name="media"
                        className="no-outline"
                        value={fileName}
                        onChange={(e) => handleChange(e)}
                        onBlur={formik.handleBlur}
                      />
                      {formik.errors.media && formik.touched.media ? (
                        <p className="text-danger mb-0 pt-2 text-start">
                          {formik.errors.media}
                        </p>
                      ) : null}
                    </div>
                  </Col>
                </Row>
              </Form>
              <div className=" mt-2 d-flex justify-content-start">
                <Button
                  className="me-3"
                  variant="primary"
                  disabled={!(formik.isValid && formik.dirty) || onLoading}
                  onClick={formik.handleSubmit}
                >
                  Submit
                </Button>
                <Button
                  className="mr-2"
                  variant="danger"
                  disabled={onLoading}
                  onClick={formik.handleReset}
                >
                  Reset
                </Button>
              </div>
            </Container>
          </Row>
        </Col>
      </div>
    </Container>
  );
};

export default AddMediaForm;
