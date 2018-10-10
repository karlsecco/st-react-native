import React, { Component } from 'react';
import { StyleSheet, ScrollView, Text, TextInput, View } from 'react-native';
import axios from 'axios';
import Spinner from './Spinner';
import Bus from './Bus';

export default class Home extends Component {
  state = {
    buses: [],
    sortedBuses: [],
    seatsRequired: '',
    isLoading: false,
    error: null
  };

  async getBuses() {
    try {
      const busData = await axios.get(
        'https://sitetrakerrecruiting-developer-edition.na73.force.com/services/apexrest/getBusses'
      );
      this.setState({ buses: busData.data });
      // initial state from which to render, only display buses ready for use
      // alternatively could store in state only operational buses
      const sortedBuses = this.state.buses.filter(bus => bus.Status__c === 'Ready for Use');
      this.setState({ sortedBuses });
      console.log(this.state);
    } catch (error) {
      this.setState({ error });
    }
    this.setState({ isLoading: false });
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    this.getBuses();
  }

  async handleChange(input) {
    await this.setState({ seatsRequired: input });
    // only display buses ready for use
    // must re-filter onChange to compare input to all operational buses
    const readyBuses = this.state.buses.filter(bus => bus.Status__c === 'Ready for Use');
    const sortedBuses = readyBuses.filter(
      bus => bus.Maximum_Capacity__c >= Number(this.state.seatsRequired)
    );
    this.setState({ sortedBuses });
  }

  render() {
    const buses = this.state.sortedBuses.map(bus => (
      <Bus
        key={bus.Id}
        id={bus.Bus_ID__c}
        capacity={bus.Maximum_Capacity__c}
        hasAC={bus.Has_Air_Conditioning__c}
        miles={bus.Odometer_Reading__c}
        year={bus.Year__c}
        status={bus.Status__c}
      />
    ));

    return this.state.isLoading ? (
      <Spinner />
    ) : this.state.error ? (
      <View style={styles.error}>
        <Text>{this.state.error}</Text>
      </View>
    ) : (
      <ScrollView style={styles.home}>
        <Text style={styles.header}>View Buses for Sale</Text>
        <TextInput
          style={styles.input}
          onChangeText={input => this.handleChange(input)}
          placeholder="Enter minimum number seats required"
          value={this.state.seatsRequired}
        />
        {buses}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  error: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  header: {
    fontSize: 20,
    paddingBottom: 10
  },
  home: {
    marginVertical: 50,
    padding: 50,
    paddingTop: 0
  },
  input: {
    padding: 5,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'lightgray'
  }
});
