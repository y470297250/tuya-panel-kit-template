import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Animated, StyleSheet, Image, ViewPropTypes } from 'react-native';
import { Utils } from 'tuya-panel-kit';

const { convert, convertX: cx, convertY: cy } = Utils.RatioUtils;
// 轨道宽度
const RAIL_WIDTH = cx(303);
export default class CurtainStatic extends Component {
  static propTypes = {
    style: ViewPropTypes.style,
    value: PropTypes.number.isRequired,
    min: PropTypes.number,
    max: PropTypes.number,
    disabled: PropTypes.bool,
    curPower: PropTypes.string,
    curtainImg: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    curtainBg: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  };

  static defaultProps = {
    style: null,
    min: 0,
    max: 100,
    disabled: false,
    curPower: 'stop',
  };

  constructor(props) {
    super(props);
    this._curDeltaX = this.calcDeltaX(props.value);

    this.state = {
      value: new Animated.Value(props.value),
    };
    this.timer = null;
  }

  componentWillReceiveProps(nextProps) {
    const sliderEvents = ['open', 'close'];

    if (this.props.value !== nextProps.value && !nextProps.disabled) {
      this._curDeltaX = this.calcDeltaX(nextProps.value);
      this.state.value.setValue(nextProps.value);
    }
    if (nextProps.curPower === sliderEvents[0]) {
      this.state.value.setValue(0);
    }
    if (nextProps.curPower === sliderEvents[1]) {
      this.state.value.setValue(100);
    }
    if (nextProps.curPower === 'stop') {
      this.state.value.stopAnimation();
    }
  }

  calcDeltaX(value) {
    const { min, max } = this.props;
    if (value < min || value > max) {
      return;
    }
    const deltaX = (value / (max - min)) * (RAIL_WIDTH / 2);
    return deltaX;
  }

  render() {
    const { style, min, max, curtainBg, curtainImg } = this.props;

    return (
      <View style={[styles.container, style]}>
        <View style={{ alignItems: 'center' }}>
          <Image
            style={[
              styles.image__curtainBg,
              {
                position: 'absolute',
                top: 0,
                resizeMode: 'stretch',
              },
            ]}
            source={curtainBg}
          />
          <View style={styles.curtain}>
            <Animated.Image
              style={[
                styles.image__curtain,
                styles.image__left,
                {
                  top: convert(9),
                  left: convert(8),
                  width: this.state.value.interpolate({
                    inputRange: [0, max - min],
                    outputRange: [20, RAIL_WIDTH / 2 - cx(6)],
                  }),
                },
              ]}
              source={curtainImg}
              resizeMode="stretch"
            />
            <Animated.Image
              style={[
                styles.image__curtain,
                styles.image__right,
                {
                  top: convert(9),
                  right: convert(6),
                  transform: [
                    {
                      rotateY: '180deg',
                    },
                  ],
                  width: this.state.value.interpolate({
                    inputRange: [0, max - min],
                    outputRange: [20, RAIL_WIDTH / 2 - cx(10)],
                  }),
                },
              ]}
              source={curtainImg}
              resizeMode="stretch"
            />
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    width: cx(375),
    justifyContent: 'center',
  },

  image__curtainBg: {
    width: cx(375),
    height: cy(240),
  },

  image__curtain: {
    position: 'absolute',
    width: RAIL_WIDTH / 2 - cx(10),
    height: cy(240),
  },

  image__left: {
    left: 0,
  },

  image__right: {
    right: 0,
  },

  curtain: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: RAIL_WIDTH,
  },
});
