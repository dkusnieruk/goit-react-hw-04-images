import { useState, useEffect } from 'react';
import SearchBar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import fetchImages from '../fetchImages/fetchImages';
import Loader from './Loader/Loader';

const App = () => {
  const [pictures, setPictures] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState({
    show: false,
    imageSrc: '',
    imageAlt: '',
  });
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState();

  const onChange = event => {
    const { value } = event.target;

    setFilter(value);
    setPage(1);
  };

  const onSubmit = async event => {
    setIsLoading(true);

    event.preventDefault();
    setPage(1);
    const response = await fetchImages(page, filter);
    setPictures(response.data.hits);
    setTotalHits(response.data.totalHits);
    setIsLoading(false);
  };

  useEffect(() => {
    const getPhotos = async () => {
      setIsLoading(true);
      setPage(1);
      if (filter === 0 || filter === '') {
        setPictures([]);
        setIsLoading(false);
      } else
        try {
          const response = await fetchImages(page, filter);
          setPictures(response.data.hits);
          setTotalHits(response.data.totalHits);
        } catch (error) {
          setError({ error });
        } finally {
          setIsLoading(false);
        }
    };
    getPhotos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClickModal = (largeFormatURL, tags) => {
    setShowModal({ show: true, imageSrc: largeFormatURL, imageAlt: tags });
  };

  const onClose = () => {
    document.addEventListener(`keydown`, event => {
      if (event.key === 'Escape') {
        setShowModal({ show: false, imageSrc: '', imageAlt: '' });
      }
    });
    setShowModal({ show: false, imageSrc: '', imageAlt: '' });
  };

  const updateCount = async () => {
    setIsLoading(true);
    setPage(page + 1);

    const newImages = await fetchImages(page + 1, filter);
    setPictures([...pictures, ...newImages.data.hits]);
    setTotalHits(totalHits);
    setIsLoading(false);
  };

  return (
    <>
      <div>
        <SearchBar onChange={onChange} onSubmit={onSubmit} />
        {error && <p>Whoops, something went wrong: {error.message}</p>}
        {isLoading && <Loader />}
        {pictures.length > 0 && (
          <>
            <ImageGallery
              page={page}
              pictures={pictures}
              onClickModal={onClickModal}
              updateCount={updateCount}
              totalHits={totalHits}
            />
          </>
        )}
        {showModal.show && <Modal showModal={showModal} onClose={onClose} />}
      </div>
    </>
  );
};
// }

export default App;
