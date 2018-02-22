import React from 'react';
import PropTypes from 'prop-types';

import TemplateContainer from '../Templates/TemplateContainer';
import Loading from '../Loading';
import Error from '../Error';
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
    <TemplateContainer>
      <Cover />
      <h1>{publicName}</h1>
      <TypeList personalities={userPersonalities} />
    </TemplateContainer>
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
