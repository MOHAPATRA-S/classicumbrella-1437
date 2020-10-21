import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView, Platform, Image, TouchableOpacity, SafeAreaView, KeyboardAvoidingView,Alert } from 'react-native'
import { CustomTextInput } from '../../components/globalComponents/GlobalTextInput'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import icon from './icons'
import DefaultState from "./Constant"
import {Loader}  from '../../components/globalComponents/Loader'
import { validateMobileNumber, validatePassword } from '../../components/globalComponents/validation'
import { SubmitButton } from '../../components/globalComponents/Button'
import  AsyncStorage  from "@react-native-community/async-storage";
import { handleValidations } from './function';
import ApiRequest from "../../services/webservice"
import { connect, } from 'react-redux';
import { SaveTokenAction } from '../../redux/Actions/AuthAction';
import { bindActionCreators } from 'redux';
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Device_token:"",
            isRemind: false,
            isLoading:false,
            arrayUser: [],
            DefaultState



        }
    }

componentDidMount(){

AsyncStorage.getItem("fcmToken").then(resp=>{
    if(resp!=null){
        this.setState({Device_token:resp})
    }
})
this.checkForUser()
}


checkForUser = async () => {
  try {
    let user = await AsyncStorage.getItem('user');
    if (user !== null) {
      // We have data!!

      let parsed = JSON.parse(user);
     
      this.setState({ isRemind: parsed.isRemind })
      if (parsed.isRemind == true) {
        this.setState({ phoneNumber: parsed.phoneNumber })
        this.setState({ password: parsed.password })
        this.setState({ phoneNumberStatus: true })
        this.setState({ passwordStatus: true })
      }
    }
  }
  catch (error) {
    // alert("not present");
  }


  try {
    AsyncStorage.getItem('User_Array').then(resp => {
    
      if (resp != null) {
        this.setState({ arrayUser: JSON.parse(resp) })
     

      }
      else {
        this.setState({ arrayUser: [] })
      }
    })
  }
  catch (error) {
    alert("not present");
  }

}


LoginApi() {
     this.setState({ isLoading: true })

    let LoginDetails =
    {
        "mobile_no": this.state.phoneNumber,
        "password": this.state.password,
        "device_token":this.state.Device_token
     }


    ApiRequest(LoginDetails, "user-management/login", "POST")
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
            AsyncStorage.setItem("Token",JSON.stringify(resp.data.token))
            this.props.actions.SaveTokenAction(resp.data.token)
            this.setState({isLoading:false})
            setTimeout(() => {
              Alert.alert(
                "",
                resp.data.response_message,
                [
                  {
                    text: 'OK', onPress: () => {
                    
                       this.props.navigation.navigate("Drawer")
                       

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

    RememberFunction() {
        this.setState({
            isRemind: !this.state.isRemind
        })
    }


    handleTextInput = (text, type) => {

        if (type === 'phoneNumber') {
          this.setState({ phoneNumber: text })
          var numberRegex = /^[1-9][0-9]{9,12}$/;
          if (text === '') {
            this.setState({
                phoneNumberStatus: false,
                phoneNumberError: '*Please enter phone number.',
              activephoneNumberBorderError: true
            })
          } else if (!numberRegex.test(text)) {
            this.setState({
                phoneNumberStatus: false,
                phoneNumberError: '*Please enter valid phoneNumber.',
              activephoneNumberBorderError: true
            })
    
          } else {
            this.setState({ phoneNumber: text })
            this.setState({
                phoneNumberStatus: true,
                phoneNumberError: '',
              activephoneNumberBorderError: false
            })
    
          }
        } else {
          this.setState({ password: text })
          if (text === '') {
            this.setState({
              passwordStatus: false,
              passwordError: '*Please enter password.',
              activePasswordBorderError: true
            })
          } else {
            this.setState({
              passwordStatus: true,
              passwordError: '',
              activePasswordBorderError: false
            })
          }
        }
      }

    handleSubmit() {
        if (this.state.phoneNumberStatus) {
            if (this.state.passwordStatus) {
                if(this.state.isRemind===true){

                  this.saveData()            
            }
            else{
              this.forgetUser()
            } 
            this.LoginApi()
          }
             else { this.setState({ passwordStatus: false, passwordError: "*Please enter password.", activePasswordBorderError: true }) }
       }
        else { this.setState({ phoneNumberStatus: false, phoneNumberError: "*Please enter mobile number.", activephoneNumberBorderError: true }) }
     }


     saveData() {
      let obj = {
        phoneNumber: this.state.phoneNumber,
        password: this.state.password,
        isRemind: this.state.isRemind
      }
      AsyncStorage.setItem('user', JSON.stringify(obj));
    }


    forgetUser = async () => {
      try {
        await AsyncStorage.removeItem('user');
      } catch (error) {
        // Error removing
      }
    };

    render() {
        return (
            <View style={style.container}>
                <KeyboardAvoidingView  behavior={Platform.OS === 'ios' ? "padding" : null} enabled>
                    <ScrollView 
                    keyboardShouldPersistTaps={"handled"}
                    showsVerticalScrollIndicator={false}>
                        <View style={style.ImageStyle}>
                            <Image
                            resizeMode="contain"
                                // style={style.ImageStyle}
                                source={icon.logo}
                            />
                        </View>
                        <View style={style.SignInPageSecondContainer}>
                            {/* <View style={style.TextView}> */}
                            <Text style={[style.SignInTextStyle]}> SIGN IN</Text>
                            {/* </View> */}
                            <View style={style.TextView}>

                                <Text style={style.PlzSignInToContinueText}>Please sign in to continue </Text>

                            </View>

                            <View style={style.TextInputMainContainer}>
                                <CustomTextInput
                                    InputFieldMainContainer={{ width: wp('55%'), justifyContent: 'flex-end', }}
                                    MyPlaceholder="Phone Number*"
                                    textInputStyle={{ paddingLeft: 20, width: wp('82%'), height: hp('8%') }}
                                    value={this.state.phoneNumber}
                                    onChangeText={(text) => this.handleTextInput(text, "phoneNumber")}
                                    ErrorText={this.state.phoneNumberError}
                                    textCon={{ borderBottomColor: this.state.activephoneNumberBorderError ? "red" : "white" }}
                                    returnKeyType="next"
                                    InputRef={(input) => this.phoneNumber = input}
                                    onSubmitEditing={() => { this.password.focus(); }}
                                    keyboardType="numeric"
                                    maxLength={10}
                                />
                                <CustomTextInput
                                    MyPlaceholder="Password*"
                                    textInputStyle={{ paddingLeft: 20 }}
                                    value={this.state.password}
                                    onChangeText={(text) => this.handleTextInput(text, "password")}
                                    ErrorText={this.state.passwordError}
                                    textCon={{ borderBottomColor: this.state.activepasswordBorderColor ? "red" : "white" }}
                                    returnKeyType="done"
                                    InputRef={(input) => this.password = input}
                                    secureTextEntry={true}
                                     maxLength={16}

                                />
                            </View>

                            <View style={style.RememberMeView}>
                                <View style={style.RememberMeToggleImage}>
                                    <TouchableOpacity onPress={() => { this.RememberFunction() }} style={{ flexDirection: 'row' }}>
                                        <Image source={this.state.isRemind == true ? icon.unchecked : icon.checked} style={style.RememberMeImageStyle} resizeMode="contain" />
                                    </TouchableOpacity>
                                    <Text style={style.RememberMeText}>REMEMBER ME</Text>
                                </View>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate("Forgotpassword")} >
                                    <Text style={style.ForgotPassword}>FORGOT PASSWORD?</Text>
                                </TouchableOpacity>
                            </View>
                            <View >
                                <SubmitButton
                                ButtonText={{fontSize:20}}
                                    //isLoading={this.state.enableButton}
                                    Size={"medium"}
                                    ButtonName="S I G N  I N"
                                    submitOnpress={() => this.handleSubmit()}
                                />
                            </View>
                        </View>

                        <View style={style.DonHaveAccountText}>
                            <TouchableOpacity >
                                <Text style={{
                                    color: 'silver',
                                    fontSize: 16,
                                    fontWeight:"bold"
                                }} >Don't have an account?</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={{ marginTop: hp("2%") }} onPress={() => 
                      
                            this.props.navigation.navigate("Signup")
                            
                            }>
                            <Text style={style.SignUpTextStyle}>SIGN UP</Text>
                        </TouchableOpacity>


                    </ScrollView>

                </KeyboardAvoidingView>
                <Loader
                visible={this.state.isLoading}
                />
            </View>

        );
    }
}
const mapStateToProps = state => {
 
  return {
    isLoading: state
  }
}


const mapDispatchToProps = dispatch => {
  return { actions: bindActionCreators({ SaveTokenAction }, dispatch) }
}

export default connect(mapStateToProps,
  mapDispatchToProps
)(Login);


const style = StyleSheet.create({
    container1: {

        justifyContent: 'center'

    },
    RememberMeToggleImage: {
        flexDirection: 'row',
        justifyContent: "center",


    },
    SignInButtontext: {
        textAlign: 'center',
        fontSize: 20,
        color: 'white',
        paddingTop: hp('1%')
    },
    RememberMeImageStyle: {
        height: hp('3%'),
        width: wp('5%'),
        borderColor: '#23a7fa',
        borderWidth: 1
    },
    DonHaveAccountText: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: hp('9%')

    },
    SignInButton: {
        height: hp('7%'),
        backgroundColor: '#23a7fa',
        width: wp("83%"),
        borderRadius: 20,

    },
    container: {
        backgroundColor: '#ffffff',
    },

    ForgotPassword: {
        textDecorationLine: 'underline',
        color: 'gray',
        fontSize: 12
    },
    RememberMeText: {
        marginTop: hp("0.5%"),
        color: 'gray',
        fontSize: 12,
        marginLeft: wp('2%')
    },
    RememberMeView: {
        flexDirection: 'row',
        // justifyContent: 'flex-start',
        justifyContent: 'space-between',
        width: wp("83%"),

        alignItems: "center"

    },
    SignInButtonView: {
        width: wp('83%'),
        // backgroundColor:'red',
        height: hp('10%'),
        justifyContent: 'center',
        alignItems: 'center'
    },
    RememberMeToogleStyle: {
        justifyContent: 'flex-start'
    },
    SignInPageSecondContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        width: wp("83%"),
        height: hp('43%'),
        marginTop:Platform.OS === 'ios' ? hp("4%") :hp("8%") 
        // backgroundColor:'#ffffff',


    },
    ImageView: {

        justifyContent: 'center',
        alignItems: 'center',
        //alignSelf: 'center',
        //height: hp('50%')
    },
    ImageStyle: {
alignItems:"center",

justifyContent:"center",
        height: hp('40%'),
        width: wp("100%"),
        marginBottom: Platform.OS === "ios" ? hp('7%') : wp('0%'),
    },
    TextView: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        height: hp('5%'),
        marginVertical: hp("2%")
    },
    SignInTextStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        textAlign: 'center',
        color: '#23a7fa',
        fontSize: hp('3%'),
        fontWeight: '700',
        //marginVertical:wp('16%'),
    },
    SignUpTextStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        textAlign: 'center',
        color: '#23a7fa',
        fontSize: 18,
        fontWeight: "bold"
    },
    PlzSignInToContinueText: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        textAlign: 'center',
        color: "rgb(181 ,193, 201)"
    },
    TextInputMainContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        alignSelf: 'center',

    },
    textInputStyle: {
        alignSelf: "center",
        width: wp("83%"),
        height: hp("8%"),
        borderWidth: 1,
        alignItems: "baseline",
        justifyContent: "flex-end",
        borderRadius: 20,
        borderColor: 'silver',

    },


    ErrorText: {
        color: "red",
    },

})