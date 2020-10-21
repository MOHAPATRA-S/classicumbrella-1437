import React, { Component } from 'react'
import {Loader} from '../../components/globalComponents/Loader'
import { View, Text, StyleSheet, ScrollView, Platform, Image, TouchableOpacity, SafeAreaView, KeyboardAvoidingView,Alert } from 'react-native'
import { CustomTextInput } from '../../components/globalComponents/GlobalTextInput'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { CustomHeader } from '../../components/globalComponents/Header'
import { SubmitButton } from '../../components/globalComponents/Button'
import { handleValidations } from "./function";
import ApiRequest from "../../services/webservice"
import {connect}  from 'react-redux'
import NavigationIcons from '../../Router/NavigationIcons'
class ChangePassword extends Component {
    constructor(props) {
        super(props)
        this.state = {
            oldpassword: "",
            oldpasswordStatus: false,
            oldpasswordError: '',
            activeoldpasswordBorderColor: false,

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

    CancelData(){

this.props.navigation.navigate("SettingScreen")
// this.setState({  oldpassword: "",
//             oldpasswordStatus: false,
//             oldpasswordError: '',
//             activeoldpasswordBorderColor: false,

//             newpassword: "",
//             newpasswordStatus: false,
//             newpasswordError: '',
//             activenewpasswordBorderColor: false,

//             confirmPassword: "",
//             confirmPasswordStatus: false,
//             confirmPasswordError: "",
//             activeconfirmPasswordBorderColor: false,})


    }

        ResetApi() {
           
        
            let ResetDetails =
            {
                "old_password": this.state.oldpassword,
                "new_password": this.state.newpassword,
                "confirm_password": this.state.confirmPassword
              }
             
               
          this.setState({ isLoading: true })
            ApiRequest(ResetDetails, "user-management/change-password", "POST",`JWT ${this.props.Token}`)
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
                    setTimeout(() => {
                      Alert.alert(
                        "",
                        resp.data.response_message,
                        [
                          {
                            text: 'OK', onPress: () => {
                                this.props.navigation.navigate("SettingScreen")
                               
        
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
        if(this.state.oldpasswordStatus){
        if (this.state.newpasswordStatus) {
            if (this.state.confirmPasswordStatus) {
                    this.ResetApi()
           
            } else { this.setState({ confirmPasswordStatus: false, confirmPasswordError: "*Please enter confirm password.", activeconfirmPasswordBorderError: true }) }
        }
        else { this.setState({ newpasswordStatus: false, newpasswordError: "*Please  enter new password", activenewpasswordBorderColor: true }) }

    }
    else{
        this.setState({ oldpasswordStatus: false, oldpasswordError: "*Please  enter old password", activeoldpasswordBorderColor: true })
    }


    }
    render() {
        return (
            <View style={style.container}>
                          <CustomHeader Size={"medium"} backicon={true}goback={()=>this.props.navigation.goBack()}backicon={NavigationIcons.backicon} Title="Change Password" />

                {/* <SafeAreaView> */}
                <ScrollView showsVerticalScrollIndicator={false}>

                    <KeyboardAvoidingView  behavior={Platform.OS === 'ios' ? null:null} >
                     
                            {/* <View style={style.TextInputMainContainer}> */}
                            <View style={{ marginTop: 80 }}>
                                <CustomTextInput
                                    MyPlaceholder="Old Password"
                                    InputFieldMainContainer={{ height: hp('7%'), width: wp('80%'), marginVertical: wp('9%') }}
                                    textInputStyle={{ paddingLeft: 20, height: hp('7%'), width: wp('80%') }}
                                    value={this.state.oldpassword}
                                    onChangeText={(text) => this.handlevalidate(text, "oldpassword")}
                                    ErrorText={this.state.oldpasswordError}
                                    textCon={{ borderBottomColor: this.state.activeoldpasswordBorderColor ? "red" : "white" }}
                                    returnKeyType="next"
                                    InputRef={(input) => this.oldpassword = input}
                                    onSubmitEditing={() => { this.newpassword.focus(); }}
                                    secureTextEntry={true}
                                    max={16}
                                />

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
                                    secureTextEntry={true}
                                    maxLength={16}
                                />
                                <CustomTextInput
                                    MyPlaceholder="Confirm Password"
                                    InputFieldMainContainer={{ height: hp('7%'), width: wp('80%'), marginVertical: wp('9%') }}
                                    textInputStyle={{ paddingLeft: 20, height: hp('7%'), width: wp('80%') }}
                                    value={this.state.confirmPassword}
                                    onChangeText={(text) => this.handlevalidate(text, "confirmPassword")}
                                    ErrorText={this.state.confirmPasswordError}
                                    textCon={{ borderBottomColor: this.state.activeconfirmPasswordBorderColor ? "red" : "white" }}
                                    returnKeyType="done"
                                    InputRef={(input) => this.confirmPassword = input}
                                    secureTextEntry={true}
                                    maxLength={16}
                                />
                            </View>
                                <View style={{width: wp('80%'), flexDirection: 'row', justifyContent: 'space-between' }}>
  
                                <TouchableOpacity
                                onPress={()  => this.CancelData()}
                                style={{
                                    width: wp('35%'),
                                    height: hp('6%'),
                                    alignItems: 'center',
                                    borderWidth: 2,
                                    borderColor: '#23a7fa',
                                    borderRadius: 25,
                                    justifyContent: 'center'
                                }}>
                                    <Text style={{ color: '#23a7fa', fontWeight: '700' }}> C A N C E L</Text>
                                </TouchableOpacity>
                                   
                           
                                        <TouchableOpacity  onPress={() => this.handleSubmit()}
                                        style={{ 
                                            width: wp('35%'),
                                             backgroundColor: '#23a7fa',
                                              height: hp('6%'),
                                               alignItems: 'center',
                                                borderWidth: 2, 
                                                borderColor: '#23a7fa',
                                                 borderRadius: 25, 
                                                 justifyContent: 'center' 
                                                 }}
                                        >
                                            <Text style={{ color: '#ffffff', fontWeight: '700' }}> S U B M I T</Text>
                                        </TouchableOpacity>
                                    </View>
                               

                      
                    </KeyboardAvoidingView>
                    </ScrollView>
                {/* </SafeAreaView> */}
                <Loader
                visible={this.state.isLoading}
              
                
                
                />
            </View>
        )
    }
}


const mapStateToProps = state => {

    return {
      Token: state.AuthReducer.Token
    }
  }
  export default connect(mapStateToProps,
 
  )(ChangePassword);

const style = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: "white",
       


    },
   
   
})        