import {Location, Permissions } from 'expo'
import React from 'react';
import { StyleSheet, Text,
   View, Image, Dimensions,
  } from 'react-native';
import * as firebase from 'firebase'
import Geofire from 'geofire'
import Card from "../components/Card/card"
import {SimpleScroller} from "../components/SimpleScroller/index.js"
const windowWidth = Dimensions.get('window').width


export default class Home extends React.Component {
  state ={
    profileIndex: 0,
    profiles: [],
  }

  componentWillMount() {
    const {uid} = this.props.navigation.state.params.user
    this.updateUserLocation(uid)
    this.getProfile(uid)
  }
  getUser = (uid) => {
    return firebase.database().ref('users').child(uid).once('value')
  }

  getProfile = async (uid) => {
    const geoFireRef = new Geofire(firebase.database().ref('geoData'))
    const userLocation = await geoFireRef.get(uid)
    console.log('Location: ',  userLocation)
    const geoQuery = geoFireRef.query({
      center: userLocation,
      radius: 10,
    })
    geoQuery.on('key_entered', async (uid, location, distance) => {
      console.log(uid + ' at ' + location + ' is ' + distance + 'km from the center')
      const user = await this.getUser(uid)
      console.log(user.val().first_name)
      const profiles = [...this.state.profiles, user.val()]
      this.setState({profiles})
    })
  }

  updateUserLocation  = async (uid) => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION)
    if (status === 'granted') {
      const location = await Location.getCurrentPositionAsync({enableHighAccuracy: false});
      // const {latitude, longitude} = location.coords
      const latitude =  37.39239
       const longitude = -122.09072
      const geofireRef = new Geofire(firebase.database().ref('geoData'))
      geofireRef.set(uid, [latitude, longitude])
      console.log(location)
    } else {
      console.log("Permission denied")
    }
  }

  nextCard = () => {
    this.setState({profileIndex: this.state.profileIndex + 1})
  }
  cardStack = () => {
    const { profileIndex } = this.state
    return (
      <View style={styles.container}>
        {this.state.profiles.slice(profileIndex, profileIndex + 3).reverse().map((profile) => {
          return (
            <Card
              key= {profile.id}
              profile={profile}
              onSwipOff= {this.nextCard}
            />
          )
        })}
      </View>
    )
  }

  render() {
    return (
     <SimpleScroller
      screens={[
        <View Style={{flex: 1, backgroundColor: 'red'}} />,
        this.cardStack()]}
     />
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    width: windowWidth,
  },
});
