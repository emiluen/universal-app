import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';

import { TemplateWrapper } from '../Templates/Templates';

const Cover = ({
  name,
  imageUrl,
  onImageClick,
}) => {
  const image = (
    <img
      src={imageUrl}
      className="cover__image"
      alt="http://some-placeholder-backup"
    />
  );

  return (
    <div className="cover">
      <TemplateWrapper>
        <div className="cover__container">
          {onImageClick ?
            <Button color="link" onClick={onImageClick}>
              {image}
            </Button>
            :
            <div>
              {image}
            </div>
          }
          <div className="cover__container__name">
            <h2>Personality Profile</h2>
            <span>{name}</span>
          </div>
        </div>
      </TemplateWrapper>
    </div>
  );
};

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
