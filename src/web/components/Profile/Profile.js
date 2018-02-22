import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import {
  Row,
  Col,
  Card,
  CardImg,
  CardHeader,
  CardBody,
  Form,
  Label,
  Input,
  Button,
  FormGroup,
} from 'reactstrap';

import TemplateContainer from '../Templates/TemplateContainer';
import Error from '../Error';
import Loading from '../Loading';
import Cover from './Cover';
import TypeList from './TypeList';

class Profile extends React.Component {
  static propTypes = {
    member: PropTypes.shape({
      uid: PropTypes.string,
      firstName: PropTypes.string,
      email: PropTypes.string,
    }),
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    userPersonalities: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    logout: PropTypes.func.isRequired,
    loggedIn: PropTypes.bool.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    uploadImageFromFile: PropTypes.func.isRequired,
  }

  static defaultProps = {
    member: {},
    error: null,
  }

  constructor(props) {
    super(props);
    this.state = {
      image: null,
    };
  }

  onLogout = () => this.props.logout().then(() => this.props.history.push('/login'));

  onFileChange = (event) => {
    const image = event.target.files[0];

    this.setState({ image });
  }

  onFileUpload = (event) => {
    event.preventDefault();
    this.props.uploadImageFromFile(this.state.image, this.props.member.uid);
    // .then(() => console.log('Profile updated'))
    // .catch(e => console.log(`Error: ${e}`));
  }

  render() {
    const {
      member, loading, error, userPersonalities, loggedIn,
    } = this.props;

    if (loading) {
      return <Loading />;
    }

    if (error) {
      return <Error content={error} />;
    }

    return (
      <TemplateContainer>
        {!loggedIn &&
          <div>
            <div>
              <span>You are not logged in!</span>
            </div>
            <Link to="/login">Login</Link>
          </div>
        }
        {loggedIn &&
          <div>
            <Cover />

            <Row>
              <Card style={{ maxWidth: 200 }}>
                <CardImg top src={member.imageUrl} alt="Alternative title" />
              </Card>
            </Row>

            <Row>
              <Form onSubmit={this.onFileUpload}>
                <FormGroup style={{ marginTop: 20 }}>
                  <Label>File name</Label>
                  <Input
                    type="file"
                    name="file"
                    onChange={this.onFileChange}
                  />
                </FormGroup>

                <Button style={{ marginTop: 20 }} color="primary">Upload</Button>
              </Form>
            </Row>

            <Row>
              <Col lg={{ size: 6, offset: 3 }}>
                <Card>
                  <CardHeader>Personality Profile</CardHeader>
                  <CardBody>
                    <p>{member.firstName}</p>
                    <p>{member.email}</p>
                    <TypeList personalities={userPersonalities} />
                    <button onClick={this.onLogout}>Log out</button>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        }
      </TemplateContainer>
    );
  }
}

export default withRouter(Profile);
