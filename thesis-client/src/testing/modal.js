import React from 'react';
import { StyleSheet, Button, View, Text, Alert } from 'react-native';
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
        isVisible={this.state.visibleModal}
      >
        <View style={styles.modalContent}>
          <View style={styles.modalBody}>
            <Text>Hello!</Text>
          </View>
          <View style={styles.buttons}>
            <View style={styles.button}>
              <Button
                onPress={() => this.setState({ visibleModal: false })}
                title="Close"
              />
            </View>
            <View style={styles.button}>
              <Button
                onPress={() => this.setState({ visibleModal: false })}
                title="Close"
              />
            </View>
          </View>
          {/* {this._renderButton('Close', () => this.setState({ visibleModal: null }))} */}
        </View>
      </Modal>
      <Button
        onPress={() => this.setState({ visibleModal: true })}
        title="Modal"
      />
      <Button
        onPress={() => Alert.alert(
          'test',
          'alert example',
        [
          { text: 'No', onPress: () => console.log('pressed no')},
          {
            text: 'Yes',
            onPress: () => () => console.log('pressed yes'),
          },
        ]
      )}
        title="Alert"
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 22,
    borderRadius: 10,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalBody: {
    paddingBottom: 20,
  },
  paragraph: {
    fontSize: 18,
    textAlign: 'center',
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'stretch',
    borderTopWidth: 0.75,
    borderColor: 'rgba(0, 0, 0, 0.05)',
  },
  button: {
    flex: 2,
    borderLeftWidth: 0.75,
    borderColor: 'rgba(0, 0, 0, 0.05)',
    paddingHorizontal: 22,
    paddingVertical: 10,
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
