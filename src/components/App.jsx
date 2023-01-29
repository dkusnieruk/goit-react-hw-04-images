import { useState, useEffect } from 'react';
import SearchBar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import fetchImages from '../fetchImages/fetchImages';
import Loader from './Loader/Loader';

function App() {
  const [pictures, setPictures] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState();
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState('');
  const [imageSrc, setImageSrc] = useState('');
  const [imageAlt, setImageAlt] = useState('');
  let [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState();

  const onChange = event => {
    const { value } = event.target;

    setFilter(value);
    setPage(1);
  };

  const onSubmit = async event => {
    setIsLoading(true);

    event.preventDefault();
    const response = await fetchImages(page, filter);

    setPictures(response.data.hits);
    setTotalHits(response.data.totalHits);
    setIsLoading(false);
  };

  useEffect(() => {
    const getPhotos = async () => {
      setIsLoading(true);

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
  }, [response]);

  const onClickModal = (largeFormatURL, tags) => {
    setShowModal(true);
    setImageSrc(largeFormatURL);
    setImageAlt(tags);
  };

  const onClose = () => {
    document.addEventListener(`keydown`, event => {
      if (event.key === 'Escape') {
        setShowModal(false);
      }
    });
    setShowModal(false);
  };

  const updateCount = async () => {
    setIsLoading(true);
    setPage((page = page + 1));

    const newImages = await fetchImages(page, filter);

    setPictures([...pictures, ...newImages.data.hits]);
    setTotalHits(totalHits);
    setIsLoading(false);
  };

  // async didComponentUpdate(prevState) {
  //   if (this.state.page !== prevState.page) {
  //     await this.getPhotos();
  //   } else {
  //     return false;
  //   }
  // }

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
              response={response}
              onClickModal={onClickModal}
              updateCount={updateCount}
              totalHits={totalHits}
            />
          </>
        )}
        {showModal && (
          <Modal imageSrc={imageSrc} imageAlt={imageAlt} onClose={onClose} />
        )}
      </div>
    </>
  );
}
// }

export default App;
