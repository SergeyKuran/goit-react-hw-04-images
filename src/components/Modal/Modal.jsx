import PropTypes from 'prop-types';

import css from './Modal.module.css';

const Modal = ({ image, handleOverlayClick, handleKeyDown }) => {
  return (
    <>
      <div className={css.overlay} onClick={handleOverlayClick}>
        <div className={css.modal} onKeyDown={handleKeyDown}>
          <img src={image} alt="" />
        </div>
      </div>
    </>
  );
};

Modal.propTypes = {
  image: PropTypes.string.isRequired,
  handleOverlayClick: PropTypes.func.isRequired,
  handleKeyDown: PropTypes.func.isRequired,
};

export default Modal;
