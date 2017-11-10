import Expo from 'expo'
import React, {Component} from 'react'
import {StyleSheet, Text, View, ActivityIndicator, Image} from "react-native"
import firebase from 'firebase'
import {NavigationActions} from 'react-navigation'
import {LoginButton} from '../components/LoginButton/index'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Fumi } from 'react-native-textinput-effects'

export default class Login extends Component {
  state ={
    showSpinner: true,
  }
    componentDidMount() {
      // firebase.auth().signOut()
        firebase.auth().onAuthStateChanged(auth => {
              if (auth) {
                this.firebaseRef = firebase.database().ref('users')
                this.firebaseRef.child(auth.uid).on('value', snap => {
                  const user = snap.val()
              if (user != null) {
                this.firebaseRef.child(auth.uid).off('value')
                this.goHome(user)
              }
            })
          } else {
            this.setState({showSpinner: false})
          }
        })
      }

      goHome(user) {
        const resetAction = NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: 'AstroChart',  params: {user}}),
          ],
        })
        this.props.navigation.dispatch(resetAction)
      }

    authenticate = (token) => {
        const provider = firebase.auth.FacebookAuthProvider
        const credential = provider.credential(token)
        return firebase.auth().signInWithCredential(credential)
      }

      createUser = (uid, userData) => {
        const defaults = {
          uid,
          distance: 5,
          ageRange: [18, 25],
        }
        firebase.database().ref('users').child(uid).update({...userData, ...defaults})
      }

    login = async () => {
      this.setState({showSpinner:true})
        const ADD_ID = '708957842638133'
        const options = {
          permissions: ['public_profile', 'user_birthday', 'user_work_history', 'email'],
        }
        const {type, token} = await Expo.Facebook.logInWithReadPermissionsAsync(ADD_ID, options)
        if (type === 'success') {
          const fields = ['id', 'first_name', 'last_name', 'gender', 'birthday', 'work']
          const response = await fetch(`https://graph.facebook.com/me?fields=${fields.toString()}&access_token=${token}`)
          const userData = await response.json()
          const {uid} = await this.authenticate(token)
          this.createUser(uid, userData)
        }
      }

    render() {
        return (
            <View style={styles.container}>
            <Image
              resizeMode={"cover"}
              source={require('../images/bg-login.jpg')}
              style={styles.loginBackground}
              >
              { this.state.showSpinner ? <ActivityIndicator animating={this.state.showSpinner} /> :
                <View style={{height: 50}}>
                  <Fumi
                    label={'Course Name'}
                    iconClass={FontAwesomeIcon}
                    iconName={'university'}
                    iconColor={'#f95a25'}
                    iconSize={20}
                  />
                  <Fumi
                    label={'Course Name'}
                    iconClass={FontAwesomeIcon}
                    iconName={'university'}
                    iconColor={'#f95a25'}
                    iconSize={20}
                  />
                  <LoginButton
                      onPress={this.login}
                  />
                </View>}
              </Image>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems:'center',
    },
    loginBackground:{
      flex: 1,
      width:'100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
})
