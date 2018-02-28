import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

import { TemplateContainer } from './Templates/Templates';

class Popup extends React.Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onRequestClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
  };

  componentWillMount() {
    Modal.setAppElement('body');
  }

  render() {
    const { onRequestClose } = this.props;

    return (
      <Modal {...this.props} overlayClassName="popup__overlay" className="popup__container">
        <a onClick={onRequestClose} className="popup__close">
          <i className="icon-close" />
        </a>

        <TemplateContainer>
          <div className="popup__content">
            {this.props.children}
          </div>
        </TemplateContainer>
      </Modal>
    );
  }
}

export default Popup;
