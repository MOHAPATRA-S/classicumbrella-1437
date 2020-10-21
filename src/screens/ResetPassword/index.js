import React, { Component } from 'react'
import {Loader} from '../../components/globalComponents/Loader'
import { View, Text, StyleSheet, ScrollView, Platform, Image, TouchableOpacity, SafeAreaView, KeyboardAvoidingView,Alert } from 'react-native'
import { CustomTextInput } from '../../components/globalComponents/GlobalTextInput'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { CustomHeader } from '../../components/globalComponents/Header'
import { SubmitButton } from '../../components/globalComponents/Button'
import { handleValidations } from "./function";
import ApiRequest from "../../services/webservice"
export default class ChangePassword extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Phonenumber:'',
            newpassword: "",
            newpasswordStatus: false,
            newpasswordError: '',
            activenewpasswordBorderColor: false,

            confirmPassword: "",
            confirmPasswordStatus: false,
            confirmPasswordError: "",
            activeconfirmPasswordBorderColor: false,
            isLoading:false
        }
    }

async componentDidMount(){
   
   await  this.setState({Phonenumber:this.props.navigation.state.params.Phonenumber})
}
    ResetApi() {
         this.setState({ isLoading: true })
    
        let ResetDetails =
        {
            "mobile_no": this.state.Phonenumber,
            "password": this.state.newpassword,
            "confirm_password":this.state.confirmPassword
         }
         
         
        ApiRequest(ResetDetails, "user-management/reset-password", "POST")
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
               this.setState({isLoading:false})
                setTimeout(() => {
                  Alert.alert(
                    "",
                    resp.data.response_message,
                    [
                      {
                        text: 'OK', onPress: () => {
                            this.props.navigation.navigate("Login")
                           
    
                        }
                      },
                    ],
                    { cancelable: false },
                  );
    
                }, 500);
                break;
              }
    
    
              default: {
                this.setState({isLoading:false})
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
        if (this.state.newpasswordStatus) {
            if (this.state.confirmPasswordStatus) {
                this.ResetApi()
                //alert("password change successfully")
              
            } else { this.setState({ confirmPasswordStatus: false, confirmPasswordError: "*Please enter confirm password.", activeconfirmPasswordBorderError: true }) }
        }
        else { this.setState({ newpasswordStatus: false, newpasswordError: "*Please enter new password.", activenewpasswordBorderColor: true }) }




    }
    render() {
        return (
            <View style={style.container}>
                <SafeAreaView>
                    <KeyboardAvoidingView style={style.container1} behavior={Platform.OS === 'ios' ? "padding" : null} enabled>
                        <ScrollView showsVerticalScrollIndicator={false}>

                            {/* <View style={style.headerView}>
                                <CustomHeader Size={"medium"} icon={true} Title="Reset Password" />
                            </View> */}
                            <View style={style.TextInputMainContainer}>

                                <CustomTextInput
                                    MyPlaceholder="New Password"
                                    InputFieldMainContainer={{ height: hp('7%'), width: wp('80%') }}
                                    textInputStyle={{ paddingLeft: 20, height: hp('7%'), width: wp('80%') }}
                                    value={this.state.newpassword}
                                    onChangeText={(text) => this.handlevalidate(text, "newpassword")}
                                    ErrorText={this.state.newpasswordError}
                                    textCon={{ borderBottomColor: this.state.activenewpasswordBorderColor ? "red" : "white" }}
                                    returnKeyType="next"
                                    InputRef={(input) => this.newpassword = input}
                                    onSubmitEditing={() => { this.confirmPassword.focus(); }}
                                    max={16}
                                    secureTextEntry={true}
                                />
                                <CustomTextInput
                                    MyPlaceholder="Confirm Password"
                                    InputFieldMainContainer={{ height: hp('7%'), width: wp('80%'), marginVertical: wp('12%') }}
                                    textInputStyle={{ paddingLeft: 20, height: hp('7%'), width: wp('80%') }}
                                    value={this.state.confirmPassword}
                                    onChangeText={(text) => this.handlevalidate(text, "confirmPassword")}
                                    ErrorText={this.state.confirmPasswordError}
                                    textCon={{ borderBottomColor: this.state.activeconfirmPasswordBorderColor ? "red" : "white" }}
                                    returnKeyType="done"
                                    InputRef={(input) => this.confirmPassword = input}
                                    max={16}
                                    secureTextEntry={true}
                                />

                                <SubmitButton
                                    ButtonText={{ fontSize: 20 }}
                                    //isLoading={this.state.enableButton}
                                    Size={"medium"}
                                    ButtonName="S U B M I T"
                                    submitOnpress={() => this.handleSubmit()}
                                />
                            </View>

                        </ScrollView>
                    </KeyboardAvoidingView>
                </SafeAreaView>
                <Loader
                visible={this.state.isLoading}
                
                
                />
            </View>
        )
    }
}
const style = StyleSheet.create({
    container: {
        width: wp("100%"),
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: "white"

    },
    container1: {
        flex: 1,
        justifyContent: "center",

    },
    headerView: {
        height: hp('15%')
    },
    TextInputMainContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginVertical: hp('20%'),
    },

})        