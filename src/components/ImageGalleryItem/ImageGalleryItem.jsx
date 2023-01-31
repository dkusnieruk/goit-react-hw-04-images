import propTypes from 'prop-types';
import css from '../ImageGalleryItem/imageGalleryItem.module.css';

const ImageGalleryItem = ({
  picture,
  largeFormatURL,
  onClickModal,
  tags,
  webformatURL,
}) => {
  return (
    <li key={picture.id} id={picture.id}>
      <div
        className={css.link}
        href={largeFormatURL}
        onClick={() => onClickModal(largeFormatURL, tags)}
        title={tags}
      >
        <img src={webformatURL} alt={tags} className={css.image} />
      </div>
    </li>
  );
};

ImageGalleryItem.propTypes = {
  largeFormatURL: propTypes.string,
  onClickModal: propTypes.func,
  id: propTypes.number,
  webformatURL: propTypes.string,
  title: propTypes.string,
  tags: propTypes.string,
};

export default ImageGalleryItem;
