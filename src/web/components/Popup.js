import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

const customStyles = {
  overlay: {
    zIndex: 99999,
  },
};

const buttonStyle = {
  position: 'absolute',
  right: 0,
  top: 0,
};

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
      <Modal {...this.props} style={customStyles}>
        <button onClick={onRequestClose} style={buttonStyle}>Close</button>

        {this.props.children}
      </Modal>
    );
  }
}

export default Popup;
