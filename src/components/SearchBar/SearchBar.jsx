import css from '../SearchBar/searchBar.module.css';
import propTypes from 'prop-types';

const SearchBar = ({ onSubmit, onChange, filter }) => {
  return (
    <header className="searchbar">
      <form className={css.form} onSubmit={onSubmit}>
        <input
          className={css.input}
          type="text"
          autoComplete="off"
          name="filter"
          autoFocus
          placeholder="Search images and photos"
          value={filter}
          onChange={onChange}
        />
        <button className={css.button} type="submit"></button>
      </form>
    </header>
  );
};

SearchBar.propTypes = {
  onSubmit: propTypes.func,
  filter: propTypes.string,
  onChange: propTypes.func,
};
export default SearchBar;
