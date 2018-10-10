import React, { PureComponent } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import Button from './Button';

export default class Bus extends PureComponent {
  calculatePrice(capacity, hasAC, miles, year) {
    let priceObj = {};
    // calculate base price
    // note: no base price included in instructions for 16 seat bus
    // using $100,000 for anything less than 24 seats
    let base = 0;
    let mutiplyerAC = hasAC ? 0.03 : 0;
    let multiplyerYear = year <= 1972 ? 0.34 : 0;
    let reductionMiles = miles - 100000 > 0 ? (miles - 100000) * 0.1 : 0;

    if (capacity >= 36) base = 160000;
    else if (capacity >= 24) base = 120000;
    else base = 100000;

    priceObj.total = base + base * mutiplyerAC + base * multiplyerYear - reductionMiles;
    priceObj.base = base;
    priceObj.mutiplyerAC = mutiplyerAC;
    priceObj.multiplyerYear = multiplyerYear;
    priceObj.reductionMiles = reductionMiles;

    return priceObj;
  }

  render() {
    const { id, capacity, hasAC, miles, year } = this.props;
    const priceObj = this.calculatePrice(capacity, hasAC, miles, year);
    return (
      <View style={styles.bus}>
        <Text>Bus ID: {id}</Text>

        {/* do not display base price if no adjustments */}
        {priceObj.base !== priceObj.total && <Text>Base Price: ${priceObj.base.toFixed(2)}</Text>}
        <Text>Maximum Capacity: {capacity} passengers</Text>

        {/* display price adjustment for AC if applicable */}
        <Text>Air Conditioner: {hasAC ? `+3% ($${priceObj.base * 0.03})` : 'Not Included'}</Text>
        <Text>Odometer: {miles} miles</Text>

        {/* display price adjustment for miles if applicable */}
        {priceObj.reductionMiles && (
          <Text style={styles.green}>
            {priceObj.reductionMiles &&
              `*100K+ MILES SAVINGS* (-$${priceObj.reductionMiles.toFixed(2)})`}
          </Text>
        )}
        <Text>Year: {year}</Text>

        {/* display price adjustment for year if applicable */}
        {priceObj.multiplyerYear && (
          <Text style={styles.red}>
            {priceObj.mutiplyerYear && `*HISTORIC* +34% ($${priceObj.base * 0.34})`}
          </Text>
        )}
        <Text>Purchase Price: ${priceObj.total.toFixed(2)}</Text>

        {/* onClick triggers no action for toy app */}
        <Button text="Purchase" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bus: {
    marginVertical: 20
  },
  red: {
    color: 'red'
  },
  green: {
    color: 'green'
  }
});

Bus.propTypes = {
  id: PropTypes.string,
  capacity: PropTypes.number,
  hasAC: PropTypes.bool,
  miles: PropTypes.number,
  price: PropTypes.number,
  status: PropTypes.string,
  year: PropTypes.number
};
