import React from 'react';
import PropTypes from 'prop-types';
import styles from './OrderOption.scss';
import {formatPrice} from '../../../utils/formatPrice';

const OrderOptionNumber = ({limits, currentValue, price, setOptionValue}) => (
  <div
    className={styles.number}
  >
    <input
      type='number'
      className={styles.inputSmall}
      value={currentValue}
      min={limits.min}
      max={limits.max}
      onChange={event => setOptionValue(event.currentTarget.value)}
    />
    ({formatPrice(price)})
  </div>
);

OrderOptionNumber.propTypes = {
  limits: PropTypes.object,
  min: PropTypes.number,
  max: PropTypes.number,
  currentValue: PropTypes.number,
  setOptionValue: PropTypes.func,
  price: PropTypes.string,
};

export default OrderOptionNumber;
