import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LoginView from '../components/login-component';
import { initiateLogin } from '../actions/user-actions';

class LoginContainer extends React.Component {
  static navigationOptions = {
    title: 'Login',
    header: null,
  };

  static propTypes = {
    initiateLogin: PropTypes.func.isRequired,
    disableButton: PropTypes.bool.isRequired,
  };

  render = () => (
    <LoginView
      disableButton={this.props.disableButton}
      _handlePressAsync={this.props.initiateLogin}
    />
  );
}

const mapDispatchToProps = {
  initiateLogin,
};

function mapStateToProps(state) {
  console.log('inside login container', state.loginButton.enabled);
  return {
    disableButton: state.loginButton.enabled,
  };
}

const Login = connect(mapStateToProps, mapDispatchToProps)(LoginContainer);

export default Login;
