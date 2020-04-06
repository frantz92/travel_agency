import React from 'react';
import PropTypes from 'prop-types';

import {calculateTotal} from '../../../utils/calculateTotal';
import {formatPrice} from  '../../../utils/formatPrice';

import styles from './OrderSummary.scss';

const OrderSummary = ({tripCost, options}) => {
  const totalPrice = calculateTotal(formatPrice(tripCost), options);
  return (
    <h2 className = {styles.component}>
      Total:
      <strong> ${totalPrice}</strong>
    </h2>
  );
};

OrderSummary.propTypes = {
  tripCost: PropTypes.string,
  options: PropTypes.object,
};

export default OrderSummary;
