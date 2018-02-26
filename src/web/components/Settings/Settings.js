import React from 'react';
import PropTypes from 'prop-types';
import {
  Alert,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from 'reactstrap';
import { Link } from 'react-router-dom';

import { TemplateContainer } from '../Templates/Templates';
import Loading from '../Loading';

import UpdateProfileContainer from '../../../containers/UpdateProfile';
import UpdateProfileComponent from './UpdateProfile';

import UpdatePrivacyContainer from '../../../containers/UpdatePrivacy';
import UpdatePrivacyComponent from './UpdatePrivacy';

class Settings extends React.Component {
  static propTypes = {
    error: PropTypes.string,
    success: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    loggedIn: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    error: null,
    success: null,
  };

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1',
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  render() {
    const {
      error,
      success,
      loading,
      loggedIn,
    } = this.props;

    // Loading
    if (loading) return <Loading />;

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
            {!!error && <Alert color="danger">{error}</Alert>}
            {!!success && <Alert color="success">{success}</Alert>}

            <Nav tabs>
              <NavItem>
                <NavLink onClick={() => { this.toggle('1'); }}>
                  Profile
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick={() => { this.toggle('2'); }}>
                  Privacy
                </NavLink>
              </NavItem>
            </Nav>

            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId="1">
                <UpdateProfileContainer Layout={UpdateProfileComponent} />
              </TabPane>
              <TabPane tabId="2">
                <UpdatePrivacyContainer Layout={UpdatePrivacyComponent} />
              </TabPane>
            </TabContent>
          </div>
        }
      </TemplateContainer>
    );
  }
}

export default Settings;
