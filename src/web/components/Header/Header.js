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

// import Config from '../../../constants/config';
import Link from '../Link';
import Avatar from '../Avatar';

const HomeNavItem = () => (
  <Link className="nav-link" to="/">
    <span>Home</span>
  </Link>
);

const PersonalitiesNavItem = () => (
  <Link className={`nav-link ${window.location.pathname.startsWith('/personalities') && 'active'}`} to="/personalities">
    <span>Personality Tests</span>
  </Link>
);

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
        <Navbar light color="white" expand="sm" className="fixed-top">
          <Link to="/" className="navbar-brand">
            <img className="header__logo" src="https://images.contentful.com/adbfifosu0wp/a2EkNMLLH2oamq0McU80c/399dcea973b78c79d6ce1962a02fedfa/logo.png" alt="Logo" />
          </Link>
          <Nav className="justify-content-center" style={{ marginLeft: 50 }}>
            <NavItem className="d-none d-sm-block">
              {HomeNavItem()}
            </NavItem>
            <NavItem className="d-none d-sm-block">
              {PersonalitiesNavItem()}
            </NavItem>
          </Nav>
          <NavbarToggler onClick={this.toggleDropDown} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <div className="d-block d-sm-none">
                {HomeNavItem()}
                {PersonalitiesNavItem()}
              </div>
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
                        <Link link color="secondary" to="/profile">Personality Profile</Link>
                      </DropdownItem>
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
