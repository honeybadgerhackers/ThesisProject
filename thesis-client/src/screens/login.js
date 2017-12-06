import React from 'react';
import { Alert, AsyncStorage } from 'react-native';
import { AuthSession } from 'expo';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import jwtDecode from 'jwt-decode';
import LoginView from '../components/login-component';
import { initiateLogin } from '../actions/user-actions';

class LoginContainer extends React.Component {
  static navigationOptions = {
    title: 'Login',
    header: null,
  };

  static propTypes = {
    initiateLogin: PropTypes.func.isRequired,
  };

  state = {
    disableButton: false,
  }

  _onValueChange = async (item, selectedValue) => {
    try {
      await AsyncStorage.setItem(item, selectedValue);
    } catch (error) {
      console.log(`AsyncStorage error: ${error.message}`);
    }
  }

  render = () => (
    <LoginView
      disableButton={this.state.disableButton}
      _handlePressAsync={this.props.initiateLogin}
    />
  );
}

const mapDispatchToProps = {
  initiateLogin,
};

const Login = connect(null, mapDispatchToProps)(LoginContainer);

export default Login;
