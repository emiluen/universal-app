import React from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  FormGroup,
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
      <div>
        {uploadMode ?
          <div>
            <h2>Upload File</h2>

            <Form style={{ marginTop: 20 }}>
              <FormGroup>
                <Input
                  className="btn btn-default btn-choose"
                  id="file-picker"
                  name="file"
                  type="file"
                  accept="image/*"
                  onChange={this.onFileChange}
                />
              </FormGroup>
            </Form>
          </div>
        :
          <div>
            <AvatarEditor
              ref={this.setEditorRef}
              image={this.state.image}
              width={250}
              height={250}
              crossOrigin="anonymous"
              border={50}
              scale={1.2}
            />
            <Button color="primary" onClick={this.onClickSave}>
              Save
            </Button>
          </div>
        }
      </div>
    );
  }
}

export default ProfilePicturePopup;
