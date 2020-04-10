import React from 'react';
import PropTypes from 'prop-types';
import {Row, Col} from 'react-flexbox-grid';
import pricing from '../../../data/pricing.json';
import {formatPrice} from '../../../utils/formatPrice';
import {calculateTotal} from '../../../utils/calculateTotal';
import settings from '../../../data/settings';

import OrderSummary from '../OrderSummary/OrderSummary';
import OrderOption from '../OrderOption/OrderOption';
import Button from '../../common/Button/Button';

const sendOrder = (options, tripCost, tripName, tripId) => {
  const totalCost = formatPrice(calculateTotal(tripCost, options));
  if(options.name=='' || options.contact==''){
    alert('You must enter Your name and contact number!');
  } else {
    const payload = {
      ...options,
      tripName,
      tripId,
      totalCost,
    };

    const url = settings.db.url + '/' + settings.db.endpoint.orders;

    const fetchOptions = {
      cache: 'no-cache',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };

    fetch(url, fetchOptions)
      .then(function(response){
        return response.json();
      }).then(function(parsedResponse){
        console.log('parsedResponse', parsedResponse);
      });
  }
};

const OrderForm = ({tripCost, options, setOrderOption, tripName, tripId}) => (
  <Row>
    {pricing.map(option => (
      <Col md={4} key={option.id}>
        <OrderOption {...option} currentValue={options[option.id]} setOrderOption={setOrderOption}/>
      </Col>
    ))}

    <Col xs={12}>
      <OrderSummary tripCost={tripCost} options={options}/>
    </Col>
    <Button onClick={() => sendOrder(options, tripCost, tripName, tripId)}>Order now!</Button>
  </Row>
);

OrderForm.propTypes = {
  tripCost: PropTypes.string,
  tripName: PropTypes.string,
  tripId: PropTypes.string,
  options: PropTypes.object,
  setOrderOption: PropTypes.func,
};

export default OrderForm;
