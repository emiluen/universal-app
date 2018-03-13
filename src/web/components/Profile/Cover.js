import React from 'react';
import PropTypes from 'prop-types';

import { TemplateWrapper } from '../Templates/Templates';
import Avatar from '../Avatar';
import Link from '../Link';

const Cover = ({
  name,
  imageUrl,
  onImageClick,
}) => (
  <div className="cover">
    <TemplateWrapper>
      <div className="cover__container">
        {onImageClick ?
          <Link onClick={onImageClick}>
            <Avatar className="cover__avatar" imageUrl={imageUrl} />
          </Link>
          :
          <Avatar className="cover__avatar" imageUrl={imageUrl} />
        }
        <div className="cover__container__name">
          <h1>Personality Profile</h1>
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
