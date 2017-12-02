import React from 'react';
import { Alert } from 'react-native';
import { AuthSession } from 'expo';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LoginView from '../components/login-component';
import { loginUser } from '../actions/user-actions';
import { FB_APP_ID, facebookAuthUri, SERVER_URI } from '../../config';

class LoginContainer extends React.Component {
  static navigationOptions = {
    title: 'Login',
    header: null,
  };

  static propTypes = {
    loginUser: PropTypes.func.isRequired,
  };

  state = {
    disableButton: false,
  }

  _handlePressAsync = async () => {
    const redirectUrl = AuthSession.getRedirectUrl();
    this.setState({ disableButton: true });
    // ! You need to add this url to your authorized redirect urls on your Facebook app ! //
    console.log({ redirectUrl });

    const { type, params: { code } } = await AuthSession.startAsync({
      authUrl: facebookAuthUri(FB_APP_ID, encodeURIComponent(redirectUrl)),
    });

    if (type !== 'success') {
      Alert.alert('Error', 'Uh oh, something went wrong');
      this.setState({ disableButton: false });
      return;
    }

    const userInfoResponse = await fetch(SERVER_URI, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code,
        redirectUrl,
      }),
    });

    const userData = await userInfoResponse.json();
    if (userData.type !== 'success!') {
      Alert.alert('Error', 'Unable to retrieve user data');
      this.setState({ disableButton: false });
      return;
    }
    const {
      email, first_name, last_name,
      picture: { data: { url } },
      accessToken: { access_token, expires_in },
    } = userData;
    const user = {
      first: first_name,
      last: last_name,
      profilePic: url,
      token: access_token,
      tokenExpires: expires_in,
      email,
    };
    console.log(user);

    this.setState({ disableButton: false });
    this.props.loginUser(user);
  };

  render = () => (
    <LoginView 
      disableButton={this.state.disableButton} 
      _handlePressAsync={this._handlePressAsync} 
    />
  );
}

const mapDispatchToProps = {
  loginUser,
};

const Login = connect(null, mapDispatchToProps)(LoginContainer);

export default Login;
