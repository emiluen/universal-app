import React from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  FormGroup,
  Input,
  Button,
} from 'reactstrap';

import { TemplateWrapper } from '../Templates/Templates';
import Popup from '../Popup';

class Cover extends React.Component {
  static propTypes = {
    editable: PropTypes.bool,
    name: PropTypes.string,
    imageUrl: PropTypes.string,
  };

  static defaultProps = {
    editable: false,
    name: null,
    imageUrl: null,
  };

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
    const { editable, name, imageUrl } = this.props;

    const image = (
      <img
        src={imageUrl}
        className="cover__image"
        alt="http://some-placeholder-bakcup"
      />
    );

    return (
      <div className="cover">
        <TemplateWrapper>
          <div className="cover__container">
            {editable ?
              <Button color="link" onClick={this.openModal}>
                {image}
              </Button>
              :
              <div>
                {image}
              </div>
            }
            <div className="cover__container__name">
              <h2>Personality Profile</h2>
              <span>{name}</span>
            </div>
          </div>

          <Popup
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal}
            contentLabel="Example Modal"
          >
            <h2>Upload File</h2>
            <div style={{
              backgroundColor: 'gray',
              height: 120,
              width: 120,
              borderRadius: 60,
              }}
            />
            <Form onSubmit={this.onFileUpload} style={{ marginTop: 20 }}>
              <FormGroup>
                <Input
                  id="file-picker"
                  className="btn btn-default btn-choose"
                  type="file"
                  name="file"
                  onChange={this.onFileChange}
                />
              </FormGroup>
            </Form>

            <Button style={{ marginTop: 20 }} color="primary" onClick={this.onFileUpload}>
              Upload
            </Button>
          </Popup>
        </TemplateWrapper>
      </div>
    );
  }
}

export default Cover;
