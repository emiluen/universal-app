import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
} from 'reactstrap';

import TemplateContainer from '../Templates/TemplateContainer';
import Error from '../Error';
import Loading from '../Loading';
import Cover from './Cover';
import TypeList from './TypeList';

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
  }

  static defaultProps = {
    member: {},
    error: null,
  }

  onLogout = () => this.props.logout().then(() => this.props.history.push('/login'));

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
      <div>
        {!loggedIn &&
          <TemplateContainer>
            <div>
              <span>You are not logged in!</span>
            </div>
            <Link to="/login">Login</Link>
          </TemplateContainer>
        }
        {loggedIn &&
          <div>
            <Cover editable name={`${member.firstName} ${member.lastName}`} imageUrl={member.imageUrl} />

            <TemplateContainer>
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
            </TemplateContainer>
          </div>
        }
      </div>
    );
  }
}

export default withRouter(Profile);
