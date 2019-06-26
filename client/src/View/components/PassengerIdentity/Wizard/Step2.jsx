import React from 'react';
import{ Row, Col, FormGroup, ControlLabel,Image} from 'react-bootstrap';

import photo_rules from '../../../assets/img/passport.png';
import Button from '../../../elements/CustomButton/CustomButton.jsx';
import SweetAlert from 'react-bootstrap-sweetalert';
import Webcam from "react-webcam";

class Step2 extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            picture: null,
            pictureError: false,
            alert: null,
            camera:false,
            pic2preview:null,
        };
        this.hideAlert = this.hideAlert.bind(this);
        this.getBase64 = this.getBase64.bind(this);
        this.isValidated = this.isValidated.bind(this);
        this.activateCamera = this.activateCamera.bind(this);
        this.showImage = this.showImage.bind(this);
    }

    showImage(file){
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            this.setState({
                pic2preview: reader.result,
                picture: file.name,
                camera:false,
                pictureError: true,
            });
        };
    }

    setRef = webcam => {
        this.webcam = webcam;
    };

    dataURLtoFile(dataurl, filename) {
        let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, {type:mime});
    }

    capture = () => {
        // Take a pic from webcam
        let imageSrc = this.webcam.getScreenshot();

        // Save Webcam Image in localref={this.mainPanel}

        let file = this.dataURLtoFile(imageSrc, 'passport.png');
        this.props.loadPassengerPassport({pic2:file});
        this.showImage(file);

    };

    isValidated(){
        // Must have a pic in order to move to the next step
        if(this.state.picture!==null){
            this.setState({
                pictureError: true,
                alert: null
            });
        }else{
            this.setState({
                alert: <SweetAlert
                    warning
                    style={{display: "block",marginTop: "-100px"}}
                    title="Please select an image!"
                    onConfirm={() => this.hideAlert()}
                    onCancel={() => this.hideAlert()}
                    confirmBtnBsStyle="info"
                >
                </SweetAlert>
            })
        }
        return this.state.pictureError;
    }


    getBase64(e) {
        this.props.loadPassengerPassport({pic2:e.target.files[0]});
        this.showImage(e.target.files[0]);
        this.setState({
            pictureError: true,
            alert: null
        });
    }

    hideAlert(){
        this.setState({
            alert: null
        });
    }

    activateCamera(){
        // Left position
        if(this.state.camera===false && this.state.pic2preview===null){
            return (
                <Col md={5} mdOffset={1}>
                    <br/>
                    <div style={{textAlign: 'center'}}>
                        <Image src={photo_rules} rounded />
                    </div>
                    <br/><br/>
                    <ControlLabel>Passport first page must be valid and display a clear facial picture of the passenger.</ControlLabel>
                </Col>
            );
        }else if(this.state.camera===false &&  this.state.pic2preview!==null){
            return(
                <Col md={5} mdOffset={1}>
                    <div style={{textAlign: 'center'}}>
                        <Image height={280} src={this.state.pic2preview} rounded />
                    </div>
                </Col>
            );
        }else {
            return(
                <Col md={5} mdOffset={1}>
                    <div style={{textAlign: 'center'}}>
                        <Webcam
                            ref={this.setRef}
                            audio={false}
                            screenshotFormat="image/jpeg"
                        />
                        <Button bsStyle="warning" onClick={this.capture} fill wd>Take picture</Button>
                    </div>
                </Col>
            );
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    render(){
        return (
            <div className="wizard-step">
                <br/>
                <h5 className="text-center">Scan passenger passport: ({this.state.picture})</h5>
                <br/>
                {this.state.alert}
                <Row>
                    {this.activateCamera()}
                    <Col md={5}>
                        <FormGroup>
                            <br/><br/><br/><br/>
                            <div style={{textAlign: 'center'}}>
                                <input id="myInput" type="file" ref={(ref) => this.upload = ref} onChange={this.getBase64} style={{ display: 'none' }} />
                                <Button bsStyle="default" onClick={(e) => this.upload.click() } fill wd>Upload a picture</Button>
                                <br/>
                            </div>
                            <br/>
                            <div style={{textAlign: 'center'}}>
                                -- OR --
                            </div>
                            <br/>
                            <div style={{textAlign: 'center'}}>
                                <Button bsStyle="warning" onClick={() => {this.setState({ camera:true })}} fill wd>Use Camera</Button>
                            </div>
                            <br/>
                        </FormGroup>
                    </Col>
                </Row>
            </div>
        );
    }
}


export default Step2;
