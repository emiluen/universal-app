/* global window */
import React from 'react';
import { Col, Nav, NavItem } from 'reactstrap';
import { Link } from 'react-router-dom';

const HomeNavItem = () => (
  <Link className={`nav-link ${window.location.pathname.startsWith('/personalities') && 'active'}`} to="/" style={{ color: 'white' }}>
    <span>Home</span>
  </Link>
);

const PersonalitiesNavItem = () => (
  <Link className={`nav-link ${window.location.pathname.startsWith('/personalities') && 'active'}`} to="/personalities" style={{ color: 'white' }}>
    <span>Personalities</span>
  </Link>
);

const SidebarNavItems = () => (
  <div>
    <NavItem>
      <Link className={`nav-link ${window.location.pathname === '/' && 'active'}`} to="/">
        <i className="icon-home" /> <span>Home</span>
      </Link>
    </NavItem>
    <NavItem>
      <Link className={`nav-link ${window.location.pathname.startsWith('/recipe') && 'active'}`} to="/recipes">
        <i className="icon-notebook" /> <span>Recipes</span>
      </Link>
    </NavItem>
    <NavItem>
      <Link className={`nav-link ${window.location.pathname.startsWith('/personalities') && 'active'}`} to="/personalities">
        <i className="icon-notebook" /> <span>Personalities</span>
      </Link>
    </NavItem>
  </div>
);

const Sidebar = () => (
  <div>
    <Col sm="3" md="2" className="d-none d-sm-block sidebar">
      <Nav vertical>
        {SidebarNavItems()}
      </Nav>
    </Col>
  </div>
);

export { Sidebar, HomeNavItem, PersonalitiesNavItem, SidebarNavItems };
