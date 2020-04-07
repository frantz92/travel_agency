import React from 'react';
import styles from './OrderOption.scss';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import DatePicker from 'react-datepicker';
import PropTypes from 'prop-types';

const OrderOptionDate = ({currentValue, setOptionValue}) => (
  <div className={styles.inputSmall}>
    <DatePicker
      value={currentValue}
      placeholderText={'Select a date'}
      onChange={setOptionValue}
      selected={currentValue}
    />
  </div>
);

OrderOptionDate.propTypes = {
  setOptionValue: PropTypes.func,
  currentValue: PropTypes.any,
};

export default OrderOptionDate;
