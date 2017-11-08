import React, {Component} from 'react'
import { TouchableHighlight, StyleSheet, View, Text } from 'react-native'
import {FontAwesome} from '@expo/vector-icons';
import styles from "./Style"


export default class LoginButton extends Component {
    render() {
        return (
            <TouchableHighlight
                style= {styles.container}
                onPress={this.props.onPress}
            >
                <View style={styles.buttonConainer}>
                    <FontAwesome name={'facebook-f'} size={20} color={'white'}  />
                    <Text style={styles.buttonText} >
                        Login With Facebook
                    </Text>
                </View>
            </TouchableHighlight>
        )
    }
}