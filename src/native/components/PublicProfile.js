import React from 'react';
import PropTypes from 'prop-types';
import { Container, Content, H3, View, Text } from 'native-base';

import Loading from './Loading';
import Error from './Error';

const PublicProfile = ({
  loading,
  error,
  firstName,
  personalities,
}) => {
  if (loading) return <Loading />;

  if (error) return <Error />;

  return (
    <Container>
      <Content>
        <H3>This is the public profile for - {firstName}</H3>
        {personalities.map(item => (
          <View key={item.id}>
            <Text>{item.name}</Text>
          </View>
        ))
        }
      </Content>
    </Container>
  );
};

PublicProfile.propTypes = {
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  firstName: PropTypes.string.isRequired,
  personalities: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

PublicProfile.defaultProps = {
  error: null,
};

export default PublicProfile;
