import React from 'react';
import PropTypes from 'prop-types';
import styles from './OrderOption.scss';

const OrderOptionText = ({currentValue, setOptionValue}) => (
  <div className={styles.number}>
    <input
      type='text'
      className={styles.input}
      value={currentValue}
      onChange={event => setOptionValue(event.currentTarget.value)}
      required
    />
  </div>
);

OrderOptionText.propTypes = {
  currentValue: PropTypes.string,
  setOptionValue: PropTypes.func,
};

export default OrderOptionText;
