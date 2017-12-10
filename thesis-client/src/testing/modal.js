import React from 'react';
import { StyleSheet, Button, View, Text } from 'react-native';
import Modal from 'react-native-modal';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { initiateLogin, initiateLoginDemo } from '../actions/user-actions';

class ModalView extends React.Component {
  state = {
    visibleModal: false,
  };

  // _renderButton = (text, onPress) => (
  //   <TouchableOpacity onPress={onPress}>
  //     <View>
  //       <Text>Some text</Text>
  //     </View>
  //   </TouchableOpacity>
  // );

  render = () => (
    <View style={styles.container}>
      <Modal
        style={styles.modalContent}
        isVisible={this.state.visibleModal}
      >
        <View>
          <Text>Hello!</Text>
          <Button
            onPress={() => this.setState({ visibleModal: false })}
            title="Close"
          />
          {/* {this._renderButton('Close', () => this.setState({ visibleModal: null }))} */}
        </View>
      </Modal>
      <Button
        onPress={() => this.setState({ visibleModal: true })}
        title="Modal"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  paragraph: {
    fontSize: 18,
    textAlign: 'center',
  },
});

const mapDispatchToProps = {
  initiateLogin,
  initiateLoginDemo,
};

function mapStateToProps(state) {
  return {
    disableButton: state.loginButton.enabled,
  };
}

// const testModal = connect(mapStateToProps, mapDispatchToProps)(ModalView);

export default ModalView;
