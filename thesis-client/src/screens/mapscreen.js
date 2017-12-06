import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { connect } from 'react-redux';
import Map from '../components/map-component';

// eslint-disable-next-line
class MapScreen extends Component {
  static propTypes = {
    activeTrip: PropTypes.shape({}),
  };

  static defaultProps = {
    activeTrip: {},
  };

  render() {
    const { activeTrip } = this.props;
    return (
      <View>
        <Map activeTrip={activeTrip} />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    activeTrip: state.activeTrip,
  };
}

export default connect(mapStateToProps)(MapScreen);
