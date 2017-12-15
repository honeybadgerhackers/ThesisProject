import React, {Component} from "react";
import {
  ActivityIndicator,
  Button,
  Image,
  Share,
  StatusBar,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from "react-native";
import Exponent, { Constants, ImagePicker, registerRootComponent } from "expo";
import { appColors } from "../constants";

export default class AddPhoto extends Component {
  state = {
    image: null,
    uploading: false,
  };

  _maybeRenderUploadingOverlay = () => {
    if (this.state.uploading) {
      return (
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: "rgba(0,0,0,0.4)",
              alignItems: "center",
              justifyContent: "center",
            },
          ]}
        >
          <ActivityIndicator color="#fff" animating size="large" />
        </View>
      );
    }
  };

  _maybeRenderImage = () => {
    let { image } = this.state;
    if (!image) {
      return;
    }

    return (
      <View style={{
        shadowColor: 'rgba(0,0,0,1)',
        shadowOpacity: 0.2,
        shadowOffset: { width: 4, height: 4 },
        shadowRadius: 5,
        alignItems: "center",
        justifyContent: "center",
      }}
      >
        <TouchableHighlight onPress={() => this._share()}>
          <Image source={{ uri: image }} style={{ width: 50, height: 50 }} />
        </TouchableHighlight>
      </View>
    );
  };

  _share = () => {
    Share.share({
      message: "New Route on BIKE MAP NOLA!",
      title: "Check out this photo",
      url: this.state.image,
    });
  };

  _takePhoto = async () => {
    let imageTaken = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
    });
    this._handleImagePicked(imageTaken);
  };

  _pickImage = async () => {
    let imagePicked = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
    });
    this._handleImagePicked(imagePicked);
  };

  _handleImagePicked = imageResult => {
      this.setState({ uploading: true });

      if (!imageResult.cancelled) {
        this.props.getImage(imageResult.base64);
        this.setState({
          image: imageResult.uri,
        });
      }
    this.setState({ uploading: false });
  };

  render() {
    let { image } = this.state;

    return (
      <View>
        <View style={{
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "space-around",
          }}
        >
          <Button color={appColors.aquamarine} onPress={this._pickImage} title="Upload Photo" />
          <Button color={appColors.aquamarine} onPress={this._takePhoto} title="Take Photo" />
        </View>
        <View style={{
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}
        >
          <View style={{
            width: 150,
            height: 60,
            flexDirection: 'row',
            justifyContent: 'center',
          }}
          >
            {this._maybeRenderImage()}
          </View>
          {this._maybeRenderUploadingOverlay()}
        </View>
      </View>
    );
  }
}
