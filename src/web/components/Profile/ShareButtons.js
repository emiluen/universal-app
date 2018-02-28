import React from 'react';
import PropTypes from 'prop-types';
import { Row } from 'reactstrap';
import {
  FacebookShareButton,
  TwitterShareButton,
  EmailShareButton,
  LinkedinShareButton,
  PinterestShareButton,
  FacebookIcon,
  TwitterIcon,
  EmailIcon,
  LinkedinIcon,
  PinterestIcon,
} from 'react-share';

const ShareButtons = ({ shareObject }) => (
  <Row className="share-buttons">
    <FacebookShareButton
      className="share-buttons__button"
      // Development url causes error, probably because its not secure/certified
      url={shareObject.url}
      quote={shareObject.title}
    >
      <FacebookIcon
        size={32}
        round
      />
    </FacebookShareButton>

    <TwitterShareButton
      className="share-buttons__button"
      url={shareObject.url}
      title={shareObject.title}
      hashtags={shareObject.hashtags}
    >
      <TwitterIcon
        size={32}
        round
      />
    </TwitterShareButton>

    <LinkedinShareButton
      className="share-buttons__button"
      url={shareObject.url}
      title={shareObject.title}
      description={shareObject.message}
    >
      <LinkedinIcon
        size={32}
        round
      />
    </LinkedinShareButton>

    <PinterestShareButton
      className="share-buttons__button"
      url={shareObject.url}
      media={shareObject.imageUrl}
      description={shareObject.message}
    >
      <PinterestIcon
        size={32}
        round
      />
    </PinterestShareButton>

    <EmailShareButton
      className="share-buttons__button"
      url={shareObject.url}
      subject={shareObject.title}
      body={shareObject.messageUrl}
    >
      <EmailIcon
        size={32}
        round
      />
    </EmailShareButton>
  </Row>
);

ShareButtons.propTypes = {
  shareObject: PropTypes.shape({
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    messageUrl: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    hashtags: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default ShareButtons;
