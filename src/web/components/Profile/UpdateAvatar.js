import React from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import AvatarEditor from 'react-avatar-editor';
import Button from '../Button';

class UpdateAvatar extends React.Component {
  static propTypes = {
    onImageCropped: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      image: null,
      scale: 1,
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

  handleScale = (event) => {
    const scale = parseFloat(event.target.value);
    this.setState({ scale });
  }

  render() {
    const uploadMode = this.state.step === 'FILE-UPLOAD';

    return (
      <div className="text-center">
        {uploadMode ?
          <div className="update-avatar__file">
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
                  className="button btn btn-primary"
                  for="file"
                >
                  Choose a file...
                </Label>
              </FormGroup>
            </Form>
          </div>
        :
          <div className="update-avatar__crop">
            <AvatarEditor
              ref={this.setEditorRef}
              image={this.state.image}
              width={250}
              height={250}
              crossOrigin="anonymous"
              border={50}
              scale={parseFloat(this.state.scale)}
            />
            <Input
              name="scale"
              type="range"
              onChange={this.handleScale}
              min="1"
              max="2"
              step="0.01"
              defaultValue="1"
            />
            <Button
              button
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

export default UpdateAvatar;
