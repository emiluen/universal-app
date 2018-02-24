import React from 'react';
import {
  Row,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from 'reactstrap';

import Popup from '../Popup';

class Cover extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false,
      image: null,
    };

    this.onFileChange = this.onFileChange.bind(this);
    this.onFileUpload = this.onFileUpload.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  onFileChange = (event) => {
    const image = event.target.files[0];

    this.setState({ image });
  }

  onFileUpload = (event) => {
    event.preventDefault();
    console.log('this.state.image', this.state.image);
    // this.props.uploadImageFromFile(this.state.image, this.props.member.uid);
    // .then(() => console.log('Profile updated'))
    // .catch(e => console.log(`Error: ${e}`));
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  render() {
    return (
      <div>
        <h2>COVER COMPONENT</h2>
        <Button color="primary" onClick={this.openModal}>Open popup</Button>

        <Popup
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          contentLabel="Example Modal"
        >
          <div>
            <Row>
              <Form onSubmit={this.onFileUpload}>
                <FormGroup style={{ marginTop: 20 }}>
                  <Label>File name</Label>
                  <Input
                    id="file-picker"
                    type="file"
                    name="file"
                    onChange={this.onFileChange}
                  />
                </FormGroup>

                <Button style={{ marginTop: 20 }} color="primary">Upload</Button>
              </Form>
            </Row>
          </div>
        </Popup>
      </div>
    );
  }
}

export default Cover;
