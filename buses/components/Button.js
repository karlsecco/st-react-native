import React, { PureComponent } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

export default class Button extends PureComponent {
  render() {
    const { text } = this.props;
    return (
      <TouchableOpacity style={styles.button}>
        <Text style={styles.text}>{text}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: 'green',
    padding: 10,
    marginTop: 10
  },
  text: {
    color: 'white'
  }
});

Button.propTypes = {
  text: PropTypes.string
};
