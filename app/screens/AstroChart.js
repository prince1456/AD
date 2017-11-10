import React, {Component} from 'react'
import {View, Text,Image, StyleSheet, StatusBar} from 'react-native'

export default class AstroChart extends Component {
    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                barStyle="light-content"
                />
                <Image
                resizeMode={"cover"}
                source={require('../images/astrobg.jpg')}
                style={styles.astroBg}
                >
                    <Text>Hallo</Text>
                </Image>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        
    },
    astroBg:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    }
})