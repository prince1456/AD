import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, StatusBar, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const windowWidth = Dimensions.get('window').width
const fbImage = 'https://i2.wp.com/profilepicturess.com/wp-content/uploads/2017/04/22.png?resize=446%2C572'
export default class App extends React.Component {
  render() {
    return (
      <Image
          source={require("./src/images/bg.jpg")}
          resizeMode="cover"
          style={styles.container}>
          <StatusBar
             backgroundColor="blue"
             barStyle="light-content"
           />
          <View style={styles.topIcon}>

            <Icon
              style={styles.icon}
              name={'ios-planet'}
              size={60}
              color= "#2bc2ff"
            />
            <Icon
              name={'md-planet'}
              size={40}
              color= "#f6f7eb"
            />
            <Icon
              name={'md-planet'}
              size={60}
              color= "#3185fc"
            />

          </View>

          <View style={styles.card}>
            <Image
              style={{flex:1, justifyContent:'flex-end', alignItems: 'center'}}
              source={{uri: fbImage}}
              resizeMode="cover"
            >
            </Image>
          </View>
          <View style={styles.footerCard}>
            <View style={styles.cardTextContainer}>
                  <Text style={styles.nameCard}>Candice, 28</Text>
            </View>
            <View style={styles.footerContainer}>
                <View style={{flex: 1}}>
                </View>
                <View style={styles.footerIconContainer} >
                  <Icon
                    style={styles.icon}
                    name={'ios-planet'}
                    size={60}
                    color= "#2bc2ff"
                  />
                  <Icon
                    name={'md-planet'}
                    size={40}
                    color= "#f6f7eb"
                  />
                  <Icon
                    name={'md-planet'}
                    size={60}
                    color= "#3185fc"
                  />
                </View>
              </View>
          </View>
     </Image>

    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    width: windowWidth,
  },
  topIcon:{
    flexDirection: "row",
    justifyContent: 'space-between',
    marginTop:50,
    marginLeft: 50,
    marginRight:50,
    backgroundColor: 'transparent',
    flex:1,
  },
  icon: {
    // boxShadow: "10px 20px 30px lightblue"
  },
  card: {
    flex: 4,
    marginLeft:30,
    marginRight:30,
    borderWidth:0.5,
    overflow: 'hidden',
    borderColor: 'skyblue',
    backgroundColor: 'white',
    borderRadius: 20,
  },
  footerCard:{
    flex:3,
    // backgroundColor: "white",
    justifyContent: 'space-between',
  },
  cardTextContainer:{
    width: '100%',
    justifyContent:'center',
    flexDirection:"column",
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    paddingBottom: 10,
    paddingRight: 30,
    paddingLeft: 20,
    paddingTop:50,
  },
  iconLike:{
    position: 'absolute',
    top:-30,
    right:20,
  },
  nameCard:{
    fontSize:30,
    color: "#f6f7eb",
    fontWeight: '600',
  },
  footerContainer:{
    flex:1,
    width: '100%',
    justifyContent:"flex-end",
  },
  footerIconContainer:{
    flex:1,
    width: '100%',
    backgroundColor: "transparent",
    justifyContent: 'space-around',
    flexDirection:'row',
  },
})
