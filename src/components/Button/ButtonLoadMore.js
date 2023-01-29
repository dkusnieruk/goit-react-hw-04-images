import propTypes from 'prop-types';

import css from '../Button/button.module.css';

function ButtonLoadMorePics (props) {
  
    return (
      <button
        onClick={props.updateCount}
        id="LoadMore"
        className={css.button}
      >
        Load More Pics
      </button>
    );
  }


ButtonLoadMorePics.propTypes = {
  updateCount: propTypes.func,
};

export default ButtonLoadMorePics;
