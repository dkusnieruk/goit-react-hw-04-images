import propTypes from 'prop-types';

import css from '../Button/button.module.css';

function ButtonLoadMorePics({ updateCount }) {
  return (
    <button onClick={updateCount} id="LoadMore" className={css.button}>
      Load More Pics
    </button>
  );
}

ButtonLoadMorePics.propTypes = {
  updateCount: propTypes.func,
};

export default ButtonLoadMorePics;
