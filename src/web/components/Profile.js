import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardTitle,
  CardText,
  CardBody,
} from 'reactstrap';
import Error from './Error';
import Loading from './Loading';

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
      member, loading, error, userPersonalities,
    } = this.props;
    const loggedIn = !!(member && member.email);

    if (loading) {
      return <Loading />;
    }

    if (error) {
      return <Error content={error} />;
    }

    const cards = userPersonalities.map(personality => (
      <div key={`${personality.id}`}>
        <Card>
          <CardBody>
            <CardTitle>
              <Link to={`/personalities/${personality.id}`}>{personality.name}</Link>
            </CardTitle>
            <CardText>{personality.tagline}</CardText>
            <Card>
              <Link to={`/personalities/${personality.id}/types/${personality.type.id}`}>{personality.type.name}</Link>
            </Card>
          </CardBody>
        </Card>
      </div>
    ));

    return (
      <div>
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
            <Row>
              <Col lg={{ size: 6, offset: 3 }}>
                <Card>
                  <CardHeader>Personality Profile</CardHeader>
                  <CardBody>
                    <p>{member.firstName}</p>
                    <p>{member.email}</p>
                    {cards}
                    <button onClick={this.onLogout}>Log out</button>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        }
      </div>
    );
  }
}

export default withRouter(Profile);
