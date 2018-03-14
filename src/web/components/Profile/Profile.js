import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Row } from 'reactstrap';
import { Flag } from 'flag';

import { TemplateContainer } from '../Templates/Templates';
import Error from '../Error';
import Loading from '../Loading';
import Link from '../Link';
import Cover from './Cover';
import TypeList from './TypeList';
import Popup from '../Popup';
import UpdateAvatar from './UpdateAvatar';
import ShareButtons from './ShareButtons';
import EmptyState from '../EmptyState';

class Profile extends React.Component {
  static propTypes = {
    member: PropTypes.shape({
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
    uploadImageFromBlob: PropTypes.func.isRequired,
    shareProfile: PropTypes.shape({}),
  }

  static defaultProps = {
    member: {},
    error: null,
    shareProfile: null,
  }

  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false,
    };

    this.saveImage = this.saveImage.bind(this);
  }

  onLogout = () => this.props.logout().then(() => this.props.history.push('/login'));

  saveImage = blob => this.props.uploadImageFromBlob(blob);
  // .then(() => console.log('Success'))
  // .catch(err => console.log('Error', err));

  openModal = () => this.setState({ modalIsOpen: true });

  closeModal = () => this.setState({ modalIsOpen: false });

  render() {
    const {
      member,
      loading,
      error,
      userPersonalities,
      shareProfile,
      loggedIn,
    } = this.props;

    if (loading) {
      return <Loading />;
    }

    if (error) {
      return <Error content={error} />;
    }

    const emptyStateButton = () => (
      <Link button color="primary" to="/personalities">
        <Flag
          name="quizzes"
          render={() => <span>Take Test</span>}
          fallbackRender={() => <span>Learn More</span>}
        />
      </Link>
    );

    return (
      <div>
        {!loggedIn &&
          <div>
            <Cover />

            <TemplateContainer>
              <EmptyState
                title="Start your Personality Profile"
                message="Learn more about yourself. Share your results with friends and family."
                button={<Link button color="primary" to="/sign-up">Sign Up</Link>}
                footer={<p>Already have an account? <Link link color="primary" to="/login">Login here</Link>.</p>}
              />
            </TemplateContainer>
          </div>
        }
        {loggedIn &&
          <div>
            <Cover
              name={`${member.firstName} ${member.lastName}`}
              imageUrl={member.imageUrl}
              onImageClick={this.openModal}
            />

            <TemplateContainer>
              <ShareButtons shareObject={shareProfile} />

              {userPersonalities.length ?
                <TypeList personalities={userPersonalities} />
                :
                <EmptyState
                  title="Start your Personality Profile"
                  message="Learn more about yourself. Share your profile with friends and family."
                  button={emptyStateButton()}
                />
              }
            </TemplateContainer>

            <Popup
              isOpen={this.state.modalIsOpen}
              onRequestClose={this.closeModal}
              contentLabel="Upload Profile Picture"
            >
              <UpdateAvatar
                onImageCropped={this.saveImage}
              />
            </Popup>
          </div>
        }
      </div>
    );
  }
}

export default withRouter(Profile);
