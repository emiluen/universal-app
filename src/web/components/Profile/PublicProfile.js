import React from 'react';
import PropTypes from 'prop-types';

import { TemplateContainer } from '../Templates/Templates';
import Loading from '../Loading';
import Error from '../Error';
import Cover from './Cover';
import TypeList from './TypeList';
import EmptyState from '../EmptyState';

const PublicProfile = ({
  loading,
  error,
  publicName,
  publicImageUrl,
  userPersonalities,
}) => {
  if (loading) return <Loading />;

  if (error) return <Error />;

  return (
    <div>
      <Cover name={publicName} imageUrl={publicImageUrl} />
      <TemplateContainer>
        {userPersonalities.length ?
          <TypeList personalities={userPersonalities} />
          :
          <EmptyState
            title="Uh oh..."
            message="This user does not have any public personality types."
          />
        }
      </TemplateContainer>
    </div>
  );
};

PublicProfile.propTypes = {
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  publicName: PropTypes.string.isRequired,
  publicImageUrl: PropTypes.string.isRequired,
  userPersonalities: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

PublicProfile.defaultProps = {
  error: null,
};

export default PublicProfile;
