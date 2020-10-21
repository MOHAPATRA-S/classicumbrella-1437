import React, { Component } from 'react';
import {
  Platform, AsyncStorage, StyleSheet, ImageBackground, Image, ScrollView,
  SafeAreaView, View, Text, TouchableOpacity, Dimensions, Alert, TouchableWithoutFeedback, KeyboardAvoidingView
} from 'react-native'
import { CustomTextInput } from '../../components/globalComponents/GlobalTextInput';
import { Loader } from '../../components/globalComponents/Loader'
import { SubmitButton } from '../../components/globalComponents/Button'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ForgotPasswordTextWithLogo } from './Component';
import headerimage from './icons'
import DefaultState from "./constant"
import { handleValidations } from './function';
import ApiRequest from "../../services/webservice"

import { CustomHeader } from '../../components/globalComponents/Header'
class ForgotPassword extends Component {

  constructor(props) {
    super(props);
    this.state = {
      udidforgot: "",
      visibleAlert: false,
      isLoading: false,
      DefaultState
    }
  }


  handlevalidate = (text, type) => {
    
    let status = `${type}Status`;
    let errorText = `${type}Error`;
    let activeBorderColor = `active${type}BorderColor`;
    let resp = handleValidations(text, type)
    
    this.setState({
      [type]: resp.value,
      [errorText]: resp.errorText,
      [status]: resp.status,
      [activeBorderColor]: !resp.status
    })

  }

  handleSubmit() {
    if (this.state.phoneNumberStatus) {
      this.forgotpasswordApi()

    }
    else { this.setState({ phoneNumberStatus: false, phoneNumberError: "*Please enter mobile number.", activephoneNumberBorderError: true }) }

  }

  

  forgotpasswordApi() {
    

    let forgotDetails =
    {
      "mobile_no": this.state.phoneNumber
    }
    this.setState({ isLoading: true })

    ApiRequest(forgotDetails, "user-management/forgot-password", "POST")
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
            this.setState({ udidforgot: resp.data.uuid })
        
            setTimeout(() => {
              Alert.alert(
                "",
                resp.data.response_message,
                [
                  {
                    text: 'OK', onPress: () => {

                      this.props.navigation.navigate("OTP", { "itemUdid": resp.data.uuid, "Phonenumber": this.state.phoneNumber })


                    }
                  },
                ],
                { cancelable: false },
              );

            }, 500);
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

      <View style={{

        alignItems: 'center',
        // backgroundColor: '#fffff',
        opacity: this.state.visibleAlert || this.state.inProgress ? 0.4 : 1
      }}>

       
        <KeyboardAvoidingView style={style.container} behavior={Platform.OS === 'ios' ? "padding" : null} enabled>
          {/* <ScrollView

            showsVerticalScrollIndicator={false}
          > */}
            {/* <CustomHeader Size={"medium"} icon={true}   Title="Forgot Password" /> */}
            {/* <View style={{ marginVertical: 6 }}></View> */}
            <ForgotPasswordTextWithLogo
              Size='medium'
            />

            <CustomTextInput
              MyPlaceholder="Phone Number"
              // InputFieldMainContainer={{marginVertical:hp('5%')}}
              textInputStyle={{ paddingLeft: 20 }}
              ErrorText={this.state.phoneNumberError}
              value={this.state.phoneNumber}
              onChangeText={(text) => this.handlevalidate(text, "phoneNumber")}
              textCon={{ borderBottomColor: this.state.activephoneNumberBorderError ? "red" : "white" }}
              returnKeyType="next"
              keyboardType="numeric"
              InputRef={(input) => this.phoneNumber = input}
              maxLength={10}

            />

            <SubmitButton
              //isLoading={this.state.enableButton}
              Size={"medium"}
              ButtonName="SUBMIT"
              submitOnpress={() => this.handleSubmit()}
            />
          {/* </ScrollView> */}
        </KeyboardAvoidingView>
        <Loader
          visible={this.state.isLoading}
          
        />
      </View>
    )
  }
}



const style = StyleSheet.create({
  container: {
    //flex:1,
    justifyContent: 'center'
  },
})
export default ForgotPassword