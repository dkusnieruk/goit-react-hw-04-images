import propTypes from 'prop-types';
import css from '../ImageGallery/imageGallery.module.css';
import ButtonLoadMorePics from 'components/Button/ButtonLoadMore';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ pictures, totalHits, onClickModal, updateCount }) => {
  return (
    <>
      <ul className={css.gallery}>
        {pictures.map((picture, index) => {
          return (
            <ImageGalleryItem
              onClickModal={onClickModal}
              picture={picture}
              index={index}
              webformatURL={picture.webformatURL}
              largeFormatURL={picture.largeImageURL}
              tags={picture.tags}
            />
          );
        })}
      </ul>
      <div className={css.buttonPlace}>
        {totalHits - pictures.length > 0 && (
          <ButtonLoadMorePics updateCount={updateCount} />
        )}
      </div>
    </>
  );
};
// }

ImageGallery.propTypes = {
  totalHits: propTypes.number,
  onClick: propTypes.func,
  tags: propTypes.string,
  apiImg: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.string,
      largeFormatURL: propTypes.string,
      webformatURL: propTypes.string,
    })
  ),
};

export default ImageGallery;
