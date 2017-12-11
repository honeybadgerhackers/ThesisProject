import React from 'react';
import { StyleSheet, Button, View, Text, Alert, Image, Easing } from 'react-native';
import { LinearGradient } from 'expo';
import Modal from 'react-native-modal';
import Rating from 'react-native-rating';
import { appColors } from '../constants';
import { getGoogleRouteImage } from '../utilities/api-calls';

const images = {
  starFilled: require('../assets/icons/star_filled.png'),
  starUnfilled: require('../assets/icons/star_unfilled.png'),
};

const buttonColor = appColors.aquamarine;

class ModalView extends React.Component {
  state = {
    visibleModal: false,
    googleMapImage: null,
  };

  componentWillMount = () => {
    const image = getGoogleRouteImage('cywuDvzvdPz@Nw@xFqBnNsAnJZHZ?dAMt@E~@Jb@Dv@d@pChBh@^XRZR|CvBhGbE|CpBjGjEzGhE|@`@nE|HaG~EmDtCRp@NjA@|@Gr@Sv@_@tAIlA@|@NtAVn@hH|OzCnG}DjCtA`Dt@tAPLj@t@PTLTRh@^vAdAbEBVt@nGXvCZ`Kv@tUl@bRMxK_KQsO]uCE');
    this.setState({ googleMapImage: image });
  }

  render = () => (
    <View style={styles.container}>
      <Modal
        isVisible={this.state.visibleModal === 1}
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
                source={{uri: this.state.googleMapImage}}
              />
            </View>
            <View style={styles.paragraph}>
              <Text style={styles.text}>Julia St to Soniat St</Text>
            </View>
          </View>
          <View style={styles.buttons}>
            <View style={styles.buttonLeft}>
              <Button
                onPress={() => this.setState({ visibleModal: false })}
                title="No"
                color={buttonColor}
              />
            </View>
            <View style={styles.buttonRight}>
              <Button
                onPress={() => {
                  this.setState({ visibleModal: false });
                  setTimeout(() => {
                    this.setState({ visibleModal: 2});
                  }, 400);
                }}
                title="Yes"
                color={buttonColor}
              />
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        isVisible={this.state.visibleModal === 2}
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
                  selectedStar={images.starFilled}
                  unselectedStar={images.starUnfilled}
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
                onPress={() => this.setState({ visibleModal: false })}
                title="Save"
                color={buttonColor}
              />
            </View>
          </View>
        </View>
      </Modal>
      <Button
        onPress={() => this.setState({ visibleModal: 1 })}
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

export default ModalView;
