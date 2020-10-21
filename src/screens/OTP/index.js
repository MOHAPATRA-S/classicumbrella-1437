import React, { Component } from 'react'
import { 
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
  Image,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView ,
  TextInput,
  Modal,
  Alert,
      } from 'react-native'
      import { connect } from 'react-redux';
      import {Loader} from '../../components/globalComponents/Loader'
import { CustomTextInput } from '../../components/globalComponents/GlobalTextInput'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { CustomHeader}  from '../../components/globalComponents/Header'
import  AsyncStorage  from "@react-native-community/async-storage";
import { SubmitButton }  from '../../components/globalComponents/Button' 
     import OtpIcon from '../../assets/images/otpicon.png'
import { handleOTPValidations } from './function'
import Icons from "./icon"
import ApiRequest from "../../services/webservice"
 class OtpScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
           message:'',
           isLoading:false,
          modalVisible:false,
          phoneNumber:'',
          phoneError:"",
          modalVisible:false,
      
          phoneOTP1:'',
          phoneOTP1Status:'',
          phoneOTP1Error:'',
          activephoneOTP1BorderError:'',
      
          phoneOTP2:'',
          phoneOTP2Status:'',
          phoneOTP2Error:'',
          activephoneOTP2BorderError:'',
      
          phoneOTP3:'',
          phoneOTP3Status:'',
          phoneOTP3Error:'',
          activephoneOTP3BorderError:'',
      
          phoneOTP4:'',
          phoneOTP4Status:'',
          phoneOTP4Error:'',
          activephoneOTP4BorderError:'',
          UDID:''
      
         

        },
        this.phoneOTP1 = null;
        this.phoneOTP2 = null;
        this.phoneOTP3 = null;
        this.phoneOTP4 = null;
    }

    ResendApi() {
     this.setState({isLoading:true})
      ApiRequest( "",`user-management/resend-otp/${this.state.UDID}`, "POST")
        .then(resp => {
  
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
               this.setState({ isLoading:false })
              this.setState({modalVisible:!this.state.modalVisible})
              this.setState({message:resp.data.response_message})
            
               

             
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

async componentDidMount(){

 await this.setState({ UDID: this.props.navigation.state.params.itemUdid })
this.setState({phoneNumber:this.props.navigation.state.params.Phonenumber})
 
}

   
    handleInput = (text, type, index, prevInput, nextInput) => {
      this.setState({
          phoneError: ''
        
      })
     
      let status = `${type}${index}Status`;
      let errorText = `${type}${index}Error`;
      let activeBorderColor = `active${type}${index}BorderError`;
      let Otpvalue = `${type}${index}`
      let resp = handleOTPValidations(text, type, index, prevInput, nextInput)

      this.setState({
          [Otpvalue]: resp.value,
          [errorText]: resp.errorText,
          [status]: resp.status,
          [activeBorderColor]: !resp.status
      })
    
  }
  otpSubmit(){
    if (this.state.phoneOTP1Status && this.state.phoneOTP2Status && this.state.phoneOTP3Status && this.state.phoneOTP4Status
      ) {
        this.setState({
            phoneError: ''
          
        })
        // 
        this.OTPapi()
       
    }

  
        else {
            this.setState({
                phoneError: "*Please enter OTP.",
            })
          }
        }
        
 
   
        OTPapi(){
          // this.setState({ modalVisible: false })
          this.setState({isLoading:true})
          let OtpDetails =
      
          {
            
            "otp": this.state.phoneOTP1 + this.state.phoneOTP2 + this.state.phoneOTP3 + this.state.phoneOTP4
          }
      
          ApiRequest(OtpDetails, `user-management/verify-otp/${this.state.UDID}`, "POST")
            .then(resp => {
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
                   this.setState({ isLoading:false })
                
                
                  setTimeout(() => {
                    Alert.alert(
                      "",
                      resp.data.response_message,
                      [
                        {
                          text: 'OK', onPress: () => {
                            this.props.navigation.navigate("ResetPassword",{"Phonenumber":this.state.phoneNumber})
                            
      
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
            <View style={style.container}>

<View style={{alignItems:"center"}}>
        <Modal
          transparent={true}
          visible={this.state.modalVisible}
        >
           <View style={{alignItems:"center", flex:1, backgroundColor: 'rgba(49,176,249,0.8)', justifyContent: 'center' }}>
           
          <View style={{
              borderRadius: 8,
              marginTop: hp("35%"),
              justifyContent: "center",
              alignItems: "center",
              alignSelf: 'center',
              width: wp("60%"),
              backgroundColor: "white",
              height: hp("25%"),
              marginBottom:hp("30%")
             
                }}>
                  <View style={style.crossView}>
                <TouchableOpacity  onPress={()=>this.setState({modalVisible:!this.state.modalVisible})}>
           <Image source={Icons.crossicon} />
        
           </TouchableOpacity>
           </View>
                <View style={{width:wp("60%")}}>
                
              <Text
              
                style={{
                  fontSize:15,
                 marginBottom:hp("13%"),
                 marginHorizontal:wp('8%'),
                 marginVertical:hp('-8%'),
                 alignSelf:'center',
                 marginLeft:wp('7%')


                }}
              >
               {this.state.message}
             
           </Text>
           </View>
              
          </View>
          </View>
        </Modal>
        </View>



                <SafeAreaView >
                <KeyboardAvoidingView style={style.container1} behavior={Platform.OS === 'ios' ? "padding" : null} enabled>
                    <ScrollView showsVerticalScrollIndicator={false}>
                       
                            {/* <View style={style.headerView}>
                            <CustomHeader Size={"medium"} icon={true} Title="OTP" />
                            </View> */}
                            <View style={style.otpImageView}>
                                <Image source={OtpIcon} />
                            </View>
                            <View style={style.textStyle}>
                                <Text style={{ color: 'rgb(93,93,93)', fontSize: 15 }}>Please enter the 4 digits OTP sent</Text>
                                <Text style={{ color: 'rgb(93,93,93)', fontSize: 15 }}>on your registered phone number.</Text>
                            </View>
                            <View style={style.textStyle}>
                                <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Enter 4- digits code</Text>
                            </View>
                            <View style={style.otpInputView}>
                                

                    <TextInput
                      style={{
                        borderRadius:8,
                        borderWidth: 1,
                        borderColor: this.state.activephoneOTP1BorderError ? "red" : "lightgrey",
                        paddingLeft: 15,
                        alignItems: 'center',
                        justifyContent: 'center',

                        width: wp("15%"),
                        height: hp("6%")
                      }}
                      maxLength={1}




                      ref={(input) => { this.phoneOTP1 = input; }}
                      // borderColor={this.state.activephoneOTP1BorderError}
                      keyboardType="number-pad"
                      returnKeyType="next"
                      onChangeText={(text) => this.handleInput(text, 'phoneOTP', '1', this.phoneOTP1, this.phoneOTP2)}
                      onSubmitEditing={() => { this.phoneOTP2.focus(); }}
                    >

                    </TextInput>

                    <TextInput
                      style={{
                        borderRadius:8,
                        borderWidth: 1,
                        borderColor: this.state.activephoneOTP2BorderError ? "red" : "lightgrey",
                        paddingLeft: 15,
                        alignItems: 'center',
                        justifyContent: 'center',

                        width: wp("15%"),
                        height: hp("6%")
                      }}
                      maxLength={1}
                      keyboardType="number-pad"
                      onChangeText={(text) => this.handleInput(text, 'phoneOTP', '2', this.phoneOTP1, this.phoneOTP3)}
                      onSubmitEditing={() => { this.phoneOTP3.focus(); }}
                      ref={(input) => { this.phoneOTP2 = input; }}
                      // ErrorBorder={this.state.activephoneOTP2BorderError}
                      returnKeyType="next"
                    >

                    </TextInput>

                    <TextInput
                      style={{
                        borderRadius:8,
                        borderWidth: 1,
                        borderColor: this.state.activephoneOTP3BorderError ? "red" : "lightgrey", derColor: "lightgrey",
                        paddingLeft: 15,
                        alignItems: 'center',
                        justifyContent: 'center',

                        width: wp("15%"),
                        height: hp("6%")
                      }}
                      maxLength={1}
                      keyboardType="number-pad"
                      onChangeText={(text) => this.handleInput(text, 'phoneOTP', '3', this.phoneOTP2, this.phoneOTP4)}
                      onSubmitEditing={() => { this.phoneOTP4.focus(); }}
                      ref={(input) => { this.phoneOTP3 = input; }}
                      // ErrorBorder={this.state.activephoneOTP3BorderError}
                      returnKeyType="next"
                    >

                    </TextInput>

                    <TextInput
                      style={{
                        borderRadius:8,
                        borderWidth: 1,
                        borderColor: this.state.activephoneOTP4BorderError ? "red" : "lightgrey", derColor: "lightgrey",
                        paddingLeft: 15,
                        alignItems: 'center',
                        justifyContent: 'center',

                        width: wp("15%"),
                        height: hp("6%")
                      }}
                      maxLength={1}
                      keyboardType="number-pad"
                      onChangeText={(text) => this.handleInput(text, 'phoneOTP', '4', this.phoneOTP3, this.phoneOTP4)}
                      // onSubmitEditing={() => { this.phoneOTP.focus(); }}
                      ref={(input) => { this.phoneOTP4 = input; }}
                      // ErrorBorder={this.state.activephoneOTP4BorderError}
                      returnKeyType="done"
                    >

                    </TextInput>

                            </View>
                            <View
                                                style={[style.ErrorView]}
                                            >
                                                <Text
                                                    style={[style.ErrorText]}
                                                >
                                                   {this.state.phoneError} 
                                                </Text>
                                            </View>
                            <View style={style.ResendOtpView}>
                                <TouchableOpacity  onPress={() =>
                                  this.ResendApi()}>
                                  
                                  {/* // this.setState({modalVisible:!this.state.modalVisible})}> */}
                                    <Text style={{ color: '#23a7fa', }}>Resend</Text>
                                </TouchableOpacity>
                             
                                

                            </View>

                            <SubmitButton
                            ButtonText={{fontSize:20}}
                    //isLoading={this.state.enableButton}
                    Size={"medium"}
                    ButtonName="S U B M I T"
                   submitOnpress={() => this.otpSubmit()
                   }
                />
                      
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
const mapStateToProps = state => {

  return {
   userdetails: state.AuthReducer.Userdetails.data
  }
}

const mapDispatchToProps = dispatch => {

}

export default connect(mapStateToProps,
  // mapDispatchToProps
)(OtpScreen);

const style = StyleSheet.create({
    container1: {
     flex:1,
     justifyContent:'center'
    },
    ResendOtpView: {
        justifyContent: 'flex-end',
        width: wp('83%'),
        // height: hp('3%'),

        alignItems: 'flex-end',
        alignSelf: 'center'
    },
    container: {
      width:wp('100%'),
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor:"white"

    },
    otpImageView: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginVertical: hp('3%')


    },

    textStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        color: 'rgb(93,93,93)',
        marginVertical: hp('3%')

    },
    otpInputView: {
        flexDirection: 'row',

        width: wp('85%'),
        justifyContent: "space-evenly",
        alignItems: 'center',
        alignSelf: 'center',

        height: hp('7%'),
        marginVertical: hp('2%')
    },
    ErrorView: {
      alignSelf: "flex-start",

      width: wp("50%"),
      height: hp("3%"),
      marginLeft:20

  },
  ErrorText: {
      fontSize: 15,
      color: "red",
  },

crossView:{  
  alignSelf:'flex-end',
  
  marginBottom: hp('15%'),
  marginHorizontal:wp('-1%')
  
  },

})