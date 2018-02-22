import React from 'react';
import PropTypes from 'prop-types';
import { Container, Content } from 'native-base';

import Loading from '../Loading';
import Error from '../Error';
import Header from '../Header';
import Cover from './Cover';
import TypeList from './TypeList';

const PublicProfile = ({
  loading,
  error,
  publicName,
  userPersonalities,
}) => {
  if (loading) return <Loading />;

  if (error) return <Error />;

  return (
    <Container>
      <Content>
        <Cover />

        <Content padder>
          <Header
            title={`${publicName}'s Personality Profile`}
            content={`These are the personality types ${publicName} has chosen as public.`}
          />
        </Content>

        <TypeList personalities={userPersonalities} />
      </Content>
    </Container>
  );
};

PublicProfile.propTypes = {
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  publicName: PropTypes.string.isRequired,
  userPersonalities: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

PublicProfile.defaultProps = {
  error: null,
};

export default PublicProfile;
