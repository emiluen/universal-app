import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';

import { TemplateWrapper } from '../Templates/Templates';
import Avatar from '../Avatar';

const Cover = ({
  name,
  imageUrl,
  onImageClick,
}) => (
  <div className="cover">
    <TemplateWrapper>
      <div className="cover__container">
        {onImageClick ?
          <Button color="link" onClick={onImageClick}>
            <Avatar className="cover__avatar" imageUrl={imageUrl} />
          </Button>
          :
          <Avatar className="cover__avatar" imageUrl={imageUrl} />
        }
        <div className="cover__container__name">
          <h2>Personality Profile</h2>
          <span>{name}</span>
        </div>
      </div>
    </TemplateWrapper>
  </div>
);

Cover.propTypes = {
  name: PropTypes.string,
  imageUrl: PropTypes.string,
  onImageClick: PropTypes.func,
};

Cover.defaultProps = {
  name: null,
  imageUrl: null,
  onImageClick: null,
};

export default Cover;
