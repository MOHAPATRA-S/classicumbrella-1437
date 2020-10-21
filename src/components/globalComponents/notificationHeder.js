import React, { Component } from 'react';
import {Image, View, Text,StyleSheet,TouchableOpacity } from 'react-native';
import locationicon from '../../assets/images/location_icon.png'
import ApiRequest from "../../services/webservice"
import { connect, } from 'react-redux';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-community/async-storage';
class NotificationHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
        address:"",
        Notificationlist:""
    };
  }
  componentDidMount(){
    this.getAllnotificationList()
    
    
    }
    getAllnotificationList(){
      this.setState({ isLoading: true })
    
      ApiRequest('', 'user-management/notification', "GET", `JWT ${this.props.Token}`)
      .then(async resp => {
     
        switch (resp.status) {
          case (900): {
            this.setState({ isLoading: false })
            setTimeout(() => {
              Alert.alert(
                '',
                "Please check your internet connection",
                [
                  { text: 'OK', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: false },
              );
            }, 200);
            break;
          }
          case (200): {
            this.setState({ isLoading: false })
            AsyncStorage.getItem("ALERTCOUNT").then(async res => {
                  
              if (JSON.parse(res) !== null) {
                await   this.setState({Notificationlist:resp.data.data.length-JSON.parse(res)})
              }
          })
         
       
            break;
          }
    
          default: {
            this.setState({ isLoading: false })
            setTimeout(() => {
              Alert.alert(
                '',
                resp.data.response_message,
                [
                  { text: 'OK', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: false },
              );
            }, 200);
    
          }
            break;
        }
    
      })
    
    
    
    
    }
  render() {
    return (
      <View

        style={{ marginVertical: Platform.OS === "ios" &&this.props.singlecustomer==true? hp('0%'):Platform.OS === "ios"?hp('4%') : wp('1%') }}>
        <TouchableOpacity
          onPress={this.props.bellicononpress}
        >
          {this.state.Notificationlist>0?
          <View style={{
            width: wp("4%"),
            backgroundColor: "red",
            height: hp("2%"),
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
            marginLeft: 7,
          }}>
            <Text style={{color: "white", fontSize: 10 }}>
              {this.state.Notificationlist}
            </Text>
          </View>
:
null
        }
          <Image source={this.props.bellicon}/>

        </TouchableOpacity>
      </View>
    );
  }
}
const mapStateToProps = state => {
   
    return {
      Token: state.AuthReducer.Token
    }
  }

  export default connect(mapStateToProps,
  
    )(NotificationHeader);



const styles = StyleSheet.create({
 
    locationtextstyle:{
        color:'white',
        marginLeft:6
       
    },

    locationstyle:{
        //marginHorizontal:wp('10%')
   
    },
})

