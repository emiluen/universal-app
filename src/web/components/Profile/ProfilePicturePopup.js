import React from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from 'reactstrap';
import AvatarEditor from 'react-avatar-editor';

class ProfilePicturePopup extends React.Component {
  static propTypes = {
    onImageCropped: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      image: null,
      step: 'FILE-UPLOAD',
    };

    this.onFileChange = this.onFileChange.bind(this);
  }

  onFileChange = (event) => {
    const image = event.target.files[0];

    this.setState({ image, step: 'FILE-CROP' });
  }

  onClickSave = () => {
    if (this.editor) {
      // This returns a HTMLCanvasElement, it can be made into a data URL or a blob,
      // drawn on another canvas, or added to the DOM.
      const canvas = this.editor.getImageScaledToCanvas();

      canvas.toBlob(blob => this.props.onImageCropped(blob), 'image/jpeg', 1);
    }
  }

  setEditorRef = (editor) => {
    this.editor = editor;
  };

  render() {
    const uploadMode = this.state.step === 'FILE-UPLOAD';

    return (
      <div className="text-center">
        {uploadMode ?
          <div className="profile-picture-popup__file">
            <h2>Upload Profile Picture</h2>

            <Form>
              <FormGroup>
                <Input
                  id="file"
                  name="file"
                  type="file"
                  accept="image/*"
                  onChange={this.onFileChange}
                />
                <Label
                  className="btn btn-primary"
                  for="file"
                >
                  Choose a file...
                </Label>
              </FormGroup>
            </Form>
          </div>
        :
          <div className="profile-picture-popup__crop">
            <AvatarEditor
              ref={this.setEditorRef}
              image={this.state.image}
              width={250}
              height={250}
              crossOrigin="anonymous"
              border={50}
              scale={1.2}
            />
            <Button
              color="primary"
              onClick={this.onClickSave}
            >
              Save
            </Button>
          </div>
        }
      </div>
    );
  }
}

export default ProfilePicturePopup;
