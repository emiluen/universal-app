import React from 'react';
import PropTypes from 'prop-types';
import { Container, Content, H3 } from 'native-base';

const PersonalityList = ({
  personalities,
}) => {
  console.log('personalities', personalities);

  return (
    <Container>
      <Content>
        <H3>Personality List Component</H3>
      </Content>
    </Container>
  );
};

PersonalityList.propTypes = {
  personalities: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default PersonalityList;
