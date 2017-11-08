import React, {Component} from 'react'
import {View, Text, Animated, PanResponder, Dimensions } from 'react-native'
import styles from './styles'

const {width, height} = Dimensions.get('window')
export default class SimpleScroller extends Component {
    componentWillMount() {
        this.pan = new Animated.Value(0)
        this.scrollResponder = PanResponder.create({
          onStartShouldSetPanResponder: () => true,
          onPanResponderGrant: () => {
            this.pan.setOffset(this.pan._value)
            this.pan.setValue(0)
          },
          onPanResponderMove: Animated.event([
            null,
            {dx:this.pan},
          ]),
          onPanResponderRelease: (e, {vx}) => {
            this.pan.flattenOffset()
            let move = Math.round(this.pan._value / width) * width
            if (Math.abs(vx) > 0.25) {
                const direction = vx / Math.abs(vx)
                const scrollPos = direction > 0 ? Math.ceil(this.pan._value / width) : Math.floor(this.pan._value / width)
                move = scrollPos * width
              }
            const scrollMin = (this.props.screens.length - 1) * -width
            Animated.spring(this.pan, {
              toValue: this.clamb(move, scrollMin, 0),
              bounciness: 0,
            }).start()
          },
        })
      }
    clamb = (num, min, max) => {
        return num <= min ? min : num >= max ? max : num
    }
    render() {
        const animatedStyles = {
            transform: [
                {translateX: this.pan},
            ],
        }
        const scrollerWidth = this.props.screens.length * width
        return (
            <Animated.View
            style={[styles.container, animatedStyles, {width: scrollerWidth}]}
            {...this.scrollResponder.panHandlers}
            >
                {this.props.screens.map((screen, i) =>
                    <View key={i} style={{width, height}}>
                        {screen}
                    </View>
                )}
             </Animated.View>
        )
    }
}
