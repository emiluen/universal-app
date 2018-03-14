/* global window */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Nav,
  Navbar,
  NavItem,
  Collapse,
  DropdownMenu,
  DropdownItem,
  NavbarToggler,
  DropdownToggle,
  UncontrolledDropdown,
} from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { Flag } from 'flag';

// import Config from '../../../constants/config';
import Link from '../Link';
import Avatar from '../Avatar';

class Header extends Component {
  static propTypes = {
    member: PropTypes.shape({
      firstName: PropTypes.string,
      email: PropTypes.string,
    }),
    logout: PropTypes.func.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
  }

  static defaultProps = {
    member: {},
  }

  constructor(props) {
    super(props);

    this.toggleDropDown = this.toggleDropDown.bind(this);
    this.state = { isOpen: false };
  }

  onLogout = () => this.props.logout().then(() => this.props.history.push('/login'));

  toggleDropDown = () => this.setState({ isOpen: !this.state.isOpen });

  render() {
    const { member } = this.props;
    const loggedIn = !!(member && member.email);

    return (
      <header>
        <Navbar light color="white" expand="md" className="fixed-top">
          <Link to="/" className="navbar-brand">
            <img className="header__logo" src="/logo.png" alt="Logo" />
          </Link>
          <NavbarToggler onClick={this.toggleDropDown} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav navbar>
              <NavItem>
                <Link className={`nav-link ml-md-4 ${window.location.pathname.startsWith('/personalities') && 'active'}`} to="/personalities">
                  <Flag
                    name="quizzes"
                    render={() => <span>Personality Tests</span>}
                    fallbackRender={() => <span>Personality Typologies</span>}
                  />
                </Link>
              </NavItem>
            </Nav>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <Link className={`nav-link mr-md-4 ${window.location.pathname === '/profile' && 'active'}`} to="/profile">
                  <span>My Personality Profile</span>
                </Link>
              </NavItem>
              <UncontrolledDropdown nav>
                <DropdownToggle nav caret>
                  {loggedIn ? (
                    member.imageUrl ?
                      <Avatar small className="header__avatar" imageUrl={member.imageUrl} />
                      : `Hi, ${member.firstName}`
                  ) : 'My Account'}
                </DropdownToggle>
                <DropdownMenu>
                  {!loggedIn &&
                    <div>
                      <DropdownItem>
                        <Link link color="secondary" to="/login">Login</Link>
                      </DropdownItem>
                      <DropdownItem>
                        <Link link color="secondary" to="/sign-up">Sign Up</Link>
                      </DropdownItem>
                    </div>
                  }
                  {loggedIn &&
                    <div>
                      <DropdownItem>
                        <Link link color="secondary" to="/settings">Settings</Link>
                      </DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem onClick={this.onLogout} style={{ cursor: 'pointer' }}>
                        Logout
                      </DropdownItem>
                    </div>
                  }
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </header>
    );
  }
}

export default withRouter(Header);
