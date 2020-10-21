import React, { Component } from 'react'
import {
    FlatList,
    Dimensions,
    Modal,
    Alert,
    View,
    Text,
    StyleSheet,
    ScrollView,
    Platform,
    Image,
    TouchableOpacity,
    SafeAreaView,
    KeyboardAvoidingView 
    } from 'react-native'
    import {Loader}  from '../../components/globalComponents/Loader'
import { CustomTextInput } from '../../components/globalComponents/GlobalTextInput'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { validateMobileNumber, validatePassword } from '../../components/globalComponents/validation'
import { CustomHeader } from '../../components/globalComponents/Header'
import { SubmitButton } from '../../components/globalComponents/Button'
import DefaultState from "./Constant"
import { handleValidations } from "./function";
import { connect, } from 'react-redux';
import { SaveuserDetails } from '../../redux/Actions/AuthAction';
import AsyncStorage from '@react-native-community/async-storage';
import { bindActionCreators } from 'redux';
import icon from './icon'
import ApiRequest from "../../services/webservice"
import {Country} from "../../components/countrycode"
import { TextInput } from 'react-native-gesture-handler'
const { width, height } = Dimensions.get("window");
class SignUp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            termAndConditionToggle: false,
            modalVisiblecountry:false,
             DefaultState,
             countrycode:"+91",
             colorchange:false,
             isLoading:false
        }
    }
    TermAndCondition() {
        this.setState({
            termAndConditionToggle: !this.state.termAndConditionToggle
        })
    }  
     componentDidMount(){
       
    }

    SignupApi() {
        
        this.setState({isLoading:true})
    
        let SigninDetails =
        {
            "country_code":this.state.countrycode,
            "name":this.state.firstname,
            "company_name":this.state.lastname,
            "gst_no": this.state.gstno,
            "mobile_no": this.state.phoneNumber,
            "email": this.state.email,
            "password": this.state.password,
         
        }

    
        ApiRequest(SigninDetails, "user-management/signup", "POST")
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
                 
                this.props.actions.SaveuserDetails(resp.data)
                
                setTimeout(() => {
                  Alert.alert(
                    "",
                    resp.data.response_message,
                    [
                      {
                        text: 'OK', onPress: () => {
                        
                          this.props.navigation.navigate("OtpVerify")
                           
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
    mobileNumberValidate(text){
        this.setState({countrycode:text})
    }


    SignupSubmit() {
      
        if (this.state.firstnameStatus) {
            if (this.state.lastnameStatus) {
                if (this.state.phoneNumberStatus) {
                    if (this.state.emailStatus) {
                   
                        if (this.state.gstnoStatus) {
                            if(this.state.postcodeStatus){
                             

                            if (this.state.passwordStatus) {
                                if (this.state.confirmPasswordStatus){
                                if(this.state.termAndConditionToggle===true){

                                
                                
                                    this.SignupApi()
                    //   
                                }

                             else{
                                 alert('Please select the checkbox.')
                             }
                            }
                                else { this.setState({ confirmPasswordError: '*Please enter confirmPassword.', confirmPasswordStatus: false, activeconfirmPasswordBorderColor: true }) }
                            }
                          
                           
                            else { this.setState({ passwordError: '*Please enter password.', passwordStatus: false, activepasswordBorderColor: true }) }
                        }
                        
                        
                        else { this.setState({ postcodeError: '*Please enter postcode.', postcodeStatus: false, activepostcodeBorderColor: true }) }
                        }
                        else { this.setState({ gstnoError: '*Please enter GST No.', gstnoStatus: false, activegstnoBorderColor: true }) }
                        }
                    
                    else { this.setState({ emailError: '*Please enter email.', emailStatus: false, activeemailBorderColor: true }) }
                }
                else { this.setState({ phoneNumberError: '*Please enter phonenumber.', phoneNumberStatus: false, activephoneNumberBorderError: true }) }

            }
            else { this.setState({ lastnameError: '*Please enter company name.', lastnameStatus: false, activelastnameBorderColor: true }) }
        }
        else { this.setState({ firstnameError: '*Please enter name.', firstnameStatus: false, activefirstnameBorderColor: true }) }


    }

    setCountryCode(item, index) {
  
        this.setState({ countrycode: item.dialCode,colorchange:true, modalVisiblecountry: !this.state.modalVisiblecountry, })

    }
    render() {
        return (

            <View style={style.container}>
              
                      <KeyboardAvoidingView style={style.container} behavior={Platform.OS === 'ios' ? "padding" : null} enabled>
                      <ScrollView
                    style={{
                        // flex: 1,
                        //  backgroundColor: 'red',
                    }}
                    // keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}>

                        <View style={style.InputContainerView}>

                            <View style={style.TextInputMainContainer}>
                                <CustomTextInput
                                    MyPlaceholder=" Name*"
                                    onChangeText={(text) => this.handlevalidate(text, "firstname")}
                                    ErrorText={this.state.firstnameError}
                                    textCon={{ borderBottomColor: this.state.activefirstnameBorderColor ? "red" : "white" }}
                                    maxLength={15}
                                    textInputStyle={{ paddingLeft: 20 }}
                                    value={this.state.firstname}
                                    returnKeyType="next"
                                    InputRef={(input) => this.firstname = input}
                                    onSubmitEditing={() => { this.lastname.focus(); }}
                                    textInputStyle={{ paddingLeft: 20 }}
                                    maxLength={56}

                                />
                                <CustomTextInput
                                    MyPlaceholder="Company Name*"
                                    textInputStyle={{ paddingLeft: 20 }}
                                    value={this.state.lastname}
                                    onChangeText={(text) => this.handlevalidate(text, "lastname")}
                                    ErrorText={this.state.lastnameError}
                                    textCon={{ borderBottomColor: this.state.activelastnameBorderColor ? "red" : "white" }}
                                    returnKeyType="next"
                                    InputRef={(input) => this.lastname = input}
                                    onSubmitEditing={() => { this.phoneNumber.focus(); }}
                                    maxLength={15}
                                />
                                <View style={style.MobileNumberCountryCodeView}>
                                    <TouchableOpacity
                                    disabled={true}
                                    // onPress={()=>this.setState({modalVisiblecountry:!this.state.modalVisiblecountry})}
                                    style= {{ 
                                  
                                   marginLeft:wp("18%"),
                                    height: hp("8%"),
                                    borderWidth:1,
                                    alignItems:"center",
                                    justifyContent: "center",
                                    borderRadius:25,
                                    borderColor:'rgb(222,231,236)',
                                    backgroundColor:'white'  ,     
                                        width: wp('22%'), 
                                      }}
                                    >
                    
                                    <Text style={{}}>
                                        {this.state.countrycode}
                                    </Text>
                                        
                                    
                                    </TouchableOpacity>
                                    <CustomTextInput
                                        InputFieldMainContainer={{   }}
                                        MyPlaceholder="Phone Number*"
                                        textInputStyle={{ paddingLeft: 20, width: wp('45%'), height: hp('8%') }}
                                        value={this.state.phoneNumber}
                                        keyboardType="number-pad"
                                        onChangeText={(text) => this.handlevalidate(text, "phoneNumber")}
                                        // ErrorText={this.state.phoneNumberError}
                                     
                                        textCon={{borderBottomColor: this.state.activephoneNumberBorderError ? "red" : "white" }}
                                        returnKeyType="next"
                                    InputRef={(input) => this.phoneNumber = input}
                                    onSubmitEditing={() => { this.email.focus(); }}
                                    maxLength={10}
                                    />
                               
                                </View>
                                <View
                                    style={style.ErrorView}
                                >
                                    <Text
                                        style={style.ErrorText}
                                    >
                                        {this.state.phoneNumberError}
                                    </Text>
                                    </View>
               
                                <CustomTextInput
                                    MyPlaceholder="Email*"
                                    textInputStyle={{ paddingLeft: 20, }}
                                    value={this.state.email}
                                    onChangeText={(text) => this.handlevalidate(text, "email")}
                                    ErrorText={this.state.emailError}
                                    textCon={{ borderBottomColor: this.state.activeemailBorderColor ? "red" : "white" }}
                                        returnKeyType="next"
                                    InputRef={(input) => this.email = input}
                                    onSubmitEditing={() => { this.gstno.focus(); }}
                                    
                                />
                                <CustomTextInput
                                    MyPlaceholder="22AAAAAA0000A1Z5"
                                    textInputStyle={{ paddingLeft: 20 }}
                                    value={this.state.gstno}
                                    onChangeText={(text) => this.handlevalidate(text, "gstno")}
                                    ErrorText={this.state.gstnoError}
                                    textCon={{ borderBottomColor: this.state.activegstnoBorderColor ? "red" : "white" }}
                                        returnKeyType="next"
                                    InputRef={(input) => this.gstno = input}
                                    onSubmitEditing={() => { this.postcode.focus(); }}
                                    maxLength={15}
                                />
                                <CustomTextInput
                                    MyPlaceholder="Postcode*"
                                    textInputStyle={{ paddingLeft: 20 }}
                                    value={this.state.postcode}
                                    onChangeText={(text) => this.handlevalidate(text, "postcode")}
                                    ErrorText={this.state.postcodeError}
                                    textCon={{ borderBottomColor: this.state.activepostcodeBorderColor ? "red" : "white" }}
                                    returnKeyType="next"
                                    keyboardType="number-pad"
                                    InputRef={(input) => this.postcode = input}
                                    onSubmitEditing={() => { this.password.focus(); }}
                                    maxLength={6}
                                />
                               
                                <CustomTextInput
                                    MyPlaceholder="Password*"
                                    textInputStyle={{ paddingLeft: 20 }}
                                    value={this.state.password}
                                    onChangeText={(text) => this.handlevalidate(text, "password")}
                                    ErrorText={this.state.passwordError}
                                    textCon={{ borderBottomColor: this.state.activepasswordBorderColor ? "red" : "white" }}
                                    returnKeyType="next"
                                    InputRef={(input) => this.password = input}
                                    onSubmitEditing={() => { this.confirmPassword.focus(); }}
                                    secureTextEntry={true}
                                />
                                <CustomTextInput
                                    MyPlaceholder="Confirm Password*"
                                    textInputStyle={{ paddingLeft: 20,marginTop:wp('4%') }}
                                    value={this.state.confirmPassword}
                                    onChangeText={(text) => this.handlevalidate(text, "confirmPassword")}
                                    ErrorText={this.state.confirmPasswordError}
                                    textCon={{ borderBottomColor: this.state.activeconfirmPasswordBorderColor ? "red" : "white" }}
                                    returnKeyType="done"
                                    InputRef={(input) => this.confirmPassword = input}
                                    secureTextEntry={true}
                                    //onSubmitEditing={() => { this.confirmPassword.focus(); }}
                                />
                                <View style={style.TermAndConditionView}>
                                    <TouchableOpacity onPress={() =>  this.TermAndCondition() }>
                                        <Image source={this.state.termAndConditionToggle == true ? icon.unchecked : icon.checked} resizeMode="contain"
                                            style={style.termAndConditionStyle} />
                                    </TouchableOpacity>
                                    <Text style={style.IaggreToStyle}>I agree to</Text>
                                    <TouchableOpacity  onPress={() =>this.props.navigation.navigate("TermandConditionScreen") }>
                                    <Text style={style.TermAndConditionText}>Terms and Conditions</Text>
                                    </TouchableOpacity>
                                </View>
                                <SubmitButton
                                //disabled={this.state.termAndConditionToggle===true?false:true}
                                   submitOnpress={() => this.SignupSubmit()}
                                    Size={"medium"}
                                    ButtonText={{fontSize:18}}
                                    ButtonName="S I G N  U P"
                                    //MainButtonContainer={{backgroundColor:this.state.termAndConditionToggle===true?"rgb(49,176,249)":"grey"}}
                                    

                                />
                                <View style={style.allReadyHaveAcountView}>
                                    <TouchableOpacity>
                                        <Text style={style.allReadyHaveAcountText}>Already have an account?</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity  onPress={() => 
                                        this.props.navigation.navigate("Login")
                                        }>
                                        <Text style={style.SignInText}> SIGN IN</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <Modal
                            style={{ height: height / 2 }}
                            animationType="none"
                            transparent={true}
                            visible={this.state.modalVisiblecountry}
                            onRequestClose={() => {
                                Alert.alert('Modal has been closed.');
                            }}>
                            <View
                                style={{
                                    flex: 1,
                                    backgroundColor: 'rgba(122, 122, 122,0.5)',
                                    justifyContent: 'center'
                                }}>
                                <View style={{
                                    height: height / 2,
                                    width: wp("70%"), justifyContent: "center",
                                    alignSelf: "center", alignItems: "center",
                                    backgroundColor: 'white', paddingVertical: 15
                                }}>
                                    <FlatList
                                        data={Country}
                                        onRequestClose={() => console.log("modal has been closeds")}

                                        renderItem={({ item, index }) =>
                                          
                                            <View style={{ width: wp("70%") }}>

                                                <TouchableOpacity onPress={() => this.setCountryCode(item, index)}
                                                    style={{
                                                        alignItems: "center", justifyContent: "space-evenly",
                                                        alignSelf: "center", width: wp("70%"),
                                                        flexDirection: "row",
                                                    }}
                                                >
                                                    <Image source={item.icon} style={{ width: wp("10%"), height: hp("4%"), marginVertical: 10, }} />
                                                    <View style={{ width: wp("50%"), }}>
                                                        <Text style={{ fontSize: 15, marginVertical: 10, }}>{item.dialCode}</Text>
                                                        <Text style={{ fontSize: 15, marginVertical: 10, }}>{item.name}</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            </View>
                                        }
                                        keyExtractor={(item, index) => index.toString()}
                                        ItemSeparatorComponent={() => {
                                            return <View style={{
                                                height: 1,
                                                backgroundColor: "grey", width: wp("70%")
                                            }} />
                                        }}
                                        CancelModal={() => this.setState({ yearView: false })}
                                    />
                                    <TouchableOpacity onPress={() =>
                                        this.setState({ modalVisiblecountry: !this.state.modalVisiblecountry })}
                                        style={{ backgroundColor: '#23a7fa', width: wp("50%") }}>
                                        <Text style={{
                                            alignSelf: "center",
                                            marginVertical: 10,
                                            fontWeight: "bold",
                                            fontSize: 20,
                                            color: 'white'
                                        }}>{"Cancel"}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Modal>
                        
                        </ScrollView>
                </KeyboardAvoidingView>
                  <Loader
                  visible={this.state.isLoading}
                
                  />
                        
            </View>
        )

    }
}

const mapStateToProps = state => {
 
    return {
      isLoading: state
    }
  }
  
  
  const mapDispatchToProps = dispatch => {
    return { actions: bindActionCreators({ SaveuserDetails }, dispatch) }
  }
  
  export default connect(mapStateToProps,
    mapDispatchToProps
  )(SignUp);


const style = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "rgb( 247, 249, 251)"
      


    },
    MobileNumberCountryCodeView: {
        flexDirection: 'row',
        width: wp('80%'),
        justifyContent: "center",
      
        height:hp("8%"),
      

    },
    TermAndConditionText: {
        textDecorationLine: 'underline',
        color: '#23a7fa'
    },
    IaggreToStyle: {
        marginHorizontal: wp('2%'),
        color: 'gray',

    },
    termAndConditionStyle: {
        height: hp('2%'),
        width: wp('5%'),
        borderColor: '#23a7fa',
        borderWidth: 1,


    },
    TextInputMainContainer: {

        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginVertical: hp('6%'),
    },
    InputContainerView: {
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'center',
        width: wp('83%'),
    
    },
    headerView: {
        height: hp('14%')
    },
    SignUpText: {
        color: '#ffffff',
        justifyContent: 'center',
        textAlign: 'center'
    },
    TermAndConditionView: {
        width: wp('80%'),
        flexDirection: 'row',
       
        alignItems: 'center'
    },
    SignUpButtonView: {
        width: wp('83%'),
       
        height: hp('6%'),
        justifyContent: 'center',
        alignItems: 'center',

    },
    SignUpButton: {
        height: hp('5%'),
        backgroundColor: '#23a7fa',
        width: wp("83%"),
        borderRadius: 20,
    },
    SignUpButtontext: {
        textAlign: 'center',
        fontSize: 20,
        color: 'white',
        paddingTop: hp('1%'),
        textAlign: 'center'
    },
    allReadyHaveAcountView: {
        width: wp('80%'),
        flexDirection: 'row',
        justifyContent: 'center',
       

    },
    allReadyHaveAcountText: {
        justifyContent: 'flex-start',
        color: 'gray',
        fontSize:18
    },
    SignInText: {
        color: '#23a7fa',
        fontSize: 18,
    },

    ErrorView:{
        alignSelf:"center", 
        width: wp("80%"),
         height: hp("3%"),
         
     
    },
    ErrorText:{
        color: "red",
    },
    
})