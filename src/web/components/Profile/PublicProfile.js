import React from 'react';
import PropTypes from 'prop-types';

import Loading from '../Loading';
import Error from '../Error';

const PublicProfile = ({
  loading,
  error,
  firstName,
  userPersonalities,
}) => {
  if (loading) return <Loading />;

  if (error) return <Error />;

  return (
    <div>
      <h1>{firstName}</h1>
      {userPersonalities.map(item => (
        <div key={item.id}>
          <span>{item.name}</span>
        </div>
      ))
      }
    </div>
  );
};

PublicProfile.propTypes = {
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  firstName: PropTypes.string.isRequired,
  userPersonalities: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

PublicProfile.defaultProps = {
  error: null,
};

export default PublicProfile;
