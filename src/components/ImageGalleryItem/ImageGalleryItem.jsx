import propTypes from 'prop-types';
import css from '../ImageGalleryItem/imageGalleryItem.module.css';

function ImageGalleryItem (props) {

    return (
      <li key={props.picture.id} id={props.picture.id}>
        <div
          className={css.link}
          href={props.largeFormatURL}
          onClick={() =>
            props.onClickModal(props.largeFormatURL, props.tags)
          }
          title={props.tags}
        >
          <img
            src={props.webformatURL}
            alt={props.tags}
            className={css.image}
          />
        </div>
      </li>
    );
  }


ImageGalleryItem.propTypes = {
  largeFormatURL: propTypes.string,
  onClickModal: propTypes.func,
  id: propTypes.number,
  webformatURL: propTypes.string,
  title: propTypes.string,
  tags: propTypes.string,
};

export default ImageGalleryItem;
