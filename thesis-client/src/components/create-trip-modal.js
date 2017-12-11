import React from 'react';
import { StyleSheet, Button, View, Text, Image, Easing } from 'react-native';
import { LinearGradient } from 'expo';
import Modal from 'react-native-modal';
import Rating from 'react-native-rating';
import PropTypes from 'prop-types';
import { appColors } from '../constants';

const buttonColor = appColors.aquamarine;

const ModalView = ({
  visibleModal,
  googleMapImage,
  tripName,
  closeModal,
  openRatingModal,
  starIcons,
}) => {
  return (
    <View>
      <Modal
        isVisible={visibleModal === 1}
        backdropOpacity={0.70}
        backdropColor={appColors.logoBlue}
      >
        <View style={styles.modalContent}>
          <LinearGradient
            colors={['rgba(0,96,255,0.02)', 'transparent']}
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              height: 600,
            }}
          />
          <Text style={styles.header}>Save Trip</Text>
          <View style={styles.modalBody}>
            <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={{uri: googleMapImage}}
              />
            </View>
            <View style={styles.paragraph}>
              <Text style={styles.text}>{tripName}</Text>
            </View>
          </View>
          <View style={styles.buttons}>
            <View style={styles.buttonLeft}>
              <Button
                onPress={() => closeModal()}
                title="No"
                color={buttonColor}
              />
            </View>
            <View style={styles.buttonRight}>
              <Button
                onPress={() => {
                  closeModal();
                  setTimeout(() => {
                    openRatingModal();
                  }, 500);
                }}
                title="Yes"
                color={buttonColor}
              />
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        isVisible={visibleModal === 2}
        backdropOpacity={0.70}
        backdropColor={appColors.logoBlue}
      >
        <View style={styles.modalContent}>
          <LinearGradient
            colors={['rgba(0,96,255,0.02)', 'transparent']}
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              height: 600,
            }}
          />
          <Text style={styles.header}>Rate Your Ride</Text>
          <View style={styles.modalBody}>
            <View style={styles.ratingContainer}>
              <View style={styles.rating}>
                <Rating
                  onChange={rating => console.log(rating)}
                  selectedStar={starIcons.filled}
                  unselectedStar={starIcons.unfilled}
                  config={{
                    easing: Easing.inOut(Easing.ease),
                    duration: 350,
                  }}
                  stagger={80}
                  maxScale={1.4}
                  starStyle={{
                    width: 40,
                    height: 40,
                  }}
                />
              </View>
            </View>
          </View>
          <View style={styles.buttons}>
            <View style={styles.buttonLeft}>
              <Button
                onPress={() => closeModal()}
                title="Save"
                color={buttonColor}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    backgroundColor: 'rgba(0,0,0,0)',
    color: appColors.lightBlue,
    fontSize: 20,
    paddingBottom: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  paragraph: {
    backgroundColor: 'rgba(0,0,0,0)',
    padding: 15,
  },
  text: {
    color: appColors.lightBlue,
    fontSize: 18,
    textAlign: 'center',
  },
  modalContent: {
    backgroundColor: appColors.navyBlue,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 15,
    borderRadius: 10,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalBody: {
    backgroundColor: 'rgba(0,0,0,0)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    flexDirection: 'row',
  },
  image: {
    flex: 1,
    width: 330,
    height: 330,
  },
  ratingContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0)',
  },
  rating: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 5,
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'stretch',
    borderTopWidth: 0.75,
    borderColor: 'rgba(104, 146, 179, 0.25)',
  },
  buttonRight: {
    flex: 2,
    backgroundColor: 'rgba(0,0,0,0)',
    paddingHorizontal: 22,
    paddingVertical: 10,
    borderLeftWidth: 0.75,
    borderColor: 'rgba(104, 146, 179, 0.25)',
  },
  buttonLeft: {
    flex: 2,
    backgroundColor: 'rgba(0,0,0,0)',
    paddingHorizontal: 22,
    paddingVertical: 10,
  },
});

ModalView.propTypes = {
  visibleModal: PropTypes.number,
  googleMapImage: PropTypes.string,
  tripName: PropTypes.string,
  closeModal: PropTypes.func.isRequired,
  openRatingModal: PropTypes.func.isRequired,
  starIcons: PropTypes.shape({
    filled: PropTypes.number.isRequired,
    unfilled: PropTypes.number.isRequired,
  }).isRequired,
};

ModalView.defaultProps = {
  visibleModal: null,
  googleMapImage: null,
  tripName: null,
};

export default ModalView;
