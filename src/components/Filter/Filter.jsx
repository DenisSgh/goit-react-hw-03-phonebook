import PropTypes from 'prop-types';
import s from './Filter.module.css';

const Filter = ({ value, changeFilter }) => {
  return (
    <label className={s.label}>
      Find contacts by name
      <input
        className={s.input}
        name="filter"
        type="text"
        placeholder="Type contact name"
        value={value}
        onChange={changeFilter}
      />
    </label>
  );
};

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  changeFilter: PropTypes.func.isRequired,
};

export default Filter;
