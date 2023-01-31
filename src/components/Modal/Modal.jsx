import propTypes from 'prop-types';
import css from '../Modal/modal.module.css';

const Modal = ({ onClose, showModal }) => {
  return (
    <div className={css.overlay} onClick={onClose}>
      <div className={css.modal}>
        <img
          className={css.image}
          src={showModal.imageSrc}
          alt={showModal.imageAlt}
        />
      </div>
    </div>
  );
};

Modal.propTypes = {
  onClose: propTypes.func,
  showModal: propTypes.arrayOf(
    propTypes.shape({
      imageSrc: propTypes.string,
      imageAlt: propTypes.string,
    })
  ),
};

export default Modal;
