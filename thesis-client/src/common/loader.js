import React from 'react';
import { DangerZone } from 'expo';

const { Lottie } = DangerZone;
const loader = require('../assets/animation/phonological.json');

export default class LoadingAnimation extends React.Component {
  state = {
    animation: loader,
    loop: true,
  }

  render = () => (
    <Lottie
      loop={this.state.loop}
      ref={animation => {
        this.animation = animation;
        if (animation) {
          animation.play();
        }
      }}
      source={this.state.animation}
      style={{
        width: 400,
        height: 400,
        zIndex: 10,
      }}
    />
  );
}
