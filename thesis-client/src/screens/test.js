import React from 'react';
import { Animated } from 'react-native';
import { connect } from 'react-redux';
import { DangerZone } from 'expo';
import PropTypes from 'prop-types';
import LoginView from '../components/login-component';
import { initiateLogin } from '../actions/user-actions';

const { Lottie } = DangerZone;

class TestContainer extends React.Component {
  static navigationOptions = {
    title: 'Login',
    header: null,
  };

  static propTypes = {
    initiateLogin: PropTypes.func.isRequired,
    disableButton: PropTypes.bool.isRequired,
  };

  state = {
    progress: new Animated.Value(0),
  }

  componentDidMount() {
    Animated.timing(this.state.progress, {
      toValue: 1,
      duration: 5000,
    }).start();
  }

  render = () => (
    <Lottie source={require('../assets/animation/loader.json')} progress={this.state.progress} />
    // <LoginView
    //   disableButton={this.props.disableButton}
    //   _handlePressAsync={this.props.initiateLogin}
    // />
  );
}

const mapDispatchToProps = {
  initiateLogin,
};

function mapStateToProps(state) {
  return {
    disableButton: state.loginButton.enabled,
  };
}

const Test = connect(mapStateToProps, mapDispatchToProps)(TestContainer);

export default Test;
