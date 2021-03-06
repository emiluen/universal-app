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
import classnames from 'classnames';

import { TemplateContainer } from '../Templates/Templates';
import Loading from '../Loading';
import Link from '../Link';

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
            <Link button color="primary" to="/login">Login</Link>
          </div>
        }
        {loggedIn &&
          <div>
            <h1>Settings</h1>

            {!!error && <Alert color="danger">{error}</Alert>}
            {!!success && <Alert color="success">{success}</Alert>}

            <Nav tabs>
              <NavItem style={{ cursor: 'pointer' }}>
                <NavLink className={classnames({ active: this.state.activeTab === '1' })} onClick={() => { this.toggle('1'); }}>
                  Profile
                </NavLink>
              </NavItem>
              <NavItem style={{ cursor: 'pointer' }}>
                <NavLink className={classnames({ active: this.state.activeTab === '2' })} onClick={() => { this.toggle('2'); }}>
                  Privacy
                </NavLink>
              </NavItem>
            </Nav>

            <TabContent activeTab={this.state.activeTab} style={{ marginTop: 40 }}>
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
