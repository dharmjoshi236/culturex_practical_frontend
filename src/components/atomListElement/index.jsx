import { useState } from "react";
import { Container, Button, Row, Col, Card, Form } from "react-bootstrap";
import moment from 'moment'

const ListItemElement = (props)=> {
    const [data, setData] = useState(props.data);
    
    const filePath = import.meta.env.VITE_API_MEDIA_URL + data.fileName;
    return (
        <Card onClick={()=> props.callApiForView(data.fileName, data.fileType)} key={props.key} className="shadow-lg border-0 mb-3 text-center">
          <Card.Body style={{"padding":"0px", "borderRadius": "0.5rem", "background":"none"}}>
            {data.fileType == "video/mp4"? 
            (
              <video
              muted
              autoPlay
              width={'100%'}
              height={'auto'}
              loop
              style={{
                width: "100%",
                maxHeight: "300px",
                objectFit: "cover",
                borderRadius: "0.5rem"
              }}
              // className="img-fluid"
            >
              <source src={filePath} type="video/mp4" />
            </video>
            ): <img src={filePath} width={'100%'} alt="image" style={{'objectFit':"cover", "maxHeight":"300px", "borderRadius":"0.5rem"}} className="img-fluid" />}
          </Card.Body>
        </Card>
    )
}

export default ListItemElement;