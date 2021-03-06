import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'reactstrap';

import Member from '../../../containers/Member';
import Header from '../Header/Header';
import Footer from '../Footer';

const Template = ({ children }) => (
  <div>
    <Member Layout={Header} />
    {children}

    <Container fluid>
      <Footer />
    </Container>
  </div>
);

Template.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Template;
