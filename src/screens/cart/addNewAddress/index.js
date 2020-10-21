import React, { Component } from 'react'
import { Alert, View, Text, StyleSheet, ScrollView, Platform, Image, TouchableOpacity, SafeAreaView, KeyboardAvoidingView } from 'react-native'
import { CustomTextInput } from '../../../components/globalComponents/GlobalTextInput'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { handleValidations } from './function'
import DefaultState from './Constant'
import { connect, } from 'react-redux';
import ApiRequest from "../../../services/webservice"
import AsyncStorage from '@react-native-community/async-storage'
import { withNavigation } from "react-navigation"
import { CustomHeader } from '../../../components/globalComponents/Header'
class AddNewAddress extends Component {
  constructor(props) {
    super(props)
    this.state = {
      DefaultState,
      modalVisible: false,
      isLoading: false,
    }
  }
  handlevalidate = (text, type) => {
    let status = `${type}Status`;
    let errorText = `${type}Error`;
    let activeBorderColor = `active${type}BorderColor`;
    let resp = handleValidations(text, type)
    console.log("Resp==>", resp)
    this.setState({
      [type]: resp.value,
      [errorText]: resp.errorText,
      [status]: resp.status,
      [activeBorderColor]: !resp.status
    })
  }
  updateAddress() {
    if (this.state.firstnameStatus) {
      if (this.state.lastnameStatus) {
        if (this.state.phoneNumberStatus) {
          if (this.state.postcodeStatus) {
            if (this.state.addressStatus) {
              if (this.state.transportNameStatus) {
                this.editAddressApi()
              } else { this.setState({ transportNameError: '*Please enter transport name', transportNameStatus: false, activeTransportNameBorderColor: true }) }
            } else { this.setState({ addressError: '*Please enter address.', addressStatus: false, activeaddressBorderColor: true }) }
          } else { this.setState({ postcodeError: '*Please enter postcode.', postcodeStatus: false, activepostcodeBorderColor: true }) }
        } else { this.setState({ phoneNumberError: '*Please  enter phonenumber.', phoneNumberStatus: false, activephoneNumberBorderError: true }) }
      } else { this.setState({ lastnameError: '*Please enter lastname.', lastnameStatus: false, activelastnameBorderColor: true }) }
    } else { this.setState({ firstnameError: '*Please enter firstname.', firstnameStatus: false, activefirstnameBorderColor: true }) }
  }

  editAddressApi() {
    let variables = {
      "first_name": this.state.firstname,
      "last_name": this.state.lastname,
      "mobile_no": this.state.phoneNumber,
      "transport_name": this.state.transportName,
      "postal_code": this.state.postcode,
      "address": this.state.address
    }
    this.setState({ isLoading: true })
    ApiRequest(variables, "user-management/address", "POST", `JWT ${this.props.Token}`)
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
            AsyncStorage.setItem("AddAddress", JSON.stringify(true))
            setTimeout(() => {
              Alert.alert(
                '',
                resp.data.response_message,

                [
                  {
                    text: 'OK', onPress: () =>
                      this.props.navigation.navigate("DeliveryAddress")

                  },
                ],
                { cancelable: false },
              );
            }, 200);

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
                   <CustomHeader
                   Size={"medium"} 
                    backicon={true}goback={()=>this.props.navigation.goBack()} Title="Add Address" />

          <KeyboardAvoidingView style={style.container1} behavior={Platform.OS === 'ios' ? "padding" : null} enabled>
            <ScrollView showsVerticalScrollIndicator={false}>

              <View style={style.PersonalDetailsStyle}>
                <Text style={{ fontWeight: "bold", textAlign: 'center', color: 'rgb(37,37,37)' }}>Personal Details</Text>
              </View>
              <View style={style.firstNameInputView}>
                <CustomTextInput
                  InputFieldMainContainer={{ width: wp('37%'), height: hp("7%"), justifyContent: 'space-between', marginHorizontal: wp('1%'), }}
                  MyPlaceholder="First Name*"
                  onChangeText={(text) => this.handlevalidate(text, "firstname")}
                  textInputStyle={{ width: wp('32%'), paddingLeft: 20, height: hp('7%'), }}
                  value={this.state.firstname}
                  returnKeyType="next"
                  ErrorText={this.state.firstnameError}
                  textCon={{ borderBottomColor: this.state.activefirstnameBorderColor ? "red" : "white" }}
                  onSubmitEditing={() => { this.lastname.focus(); }}
                  InputRef={(input) => this.firstname = input}
                  MainContainer={{ width: wp('40%'), height: hp("4%"), marginLeft: 10, alignItems: "flex-start" }}
                  noOfLine={2}
                  ErrorTextStyle={{ fontSize: 12, marginLeft: 5 }}

                />
                <CustomTextInput
                  InputFieldMainContainer={{ width: wp('39%'), height: hp("7%"), justifyContent: 'space-between', marginHorizontal: wp('1%'), }}
                  MyPlaceholder="Last Name*"
                  onChangeText={(text) => this.handlevalidate(text, "lastname")}
                  textInputStyle={{ width: wp('32%'), paddingLeft: 20, height: hp('7%'), }}
                  value={this.state.lastname}
                  onSubmitEditing={() => { this.phoneNumber.focus(); }}
                  textCon={{ borderBottomColor: this.state.activelastnameBorderColor ? "red" : "white" }}
                  ErrorText={this.state.lastnameError}
                  InputRef={(input) => this.lastname = input}
                  MainContainer={{ width: wp('39%'), height: hp("8%"), marginLeft: wp("8%") }}
                  noOfLine={2}
                  ErrorTextStyle={{ fontSize: 12, marginLeft: 5 }}

                />
              </View>
              <View style={style.textInputView}>
                <CustomTextInput
                  InputFieldMainContainer={{ height: hp("7%"), width: wp('75%') }}
                  onChangeText={(text) => this.handlevalidate(text, "phoneNumber")}
                  textInputStyle={{ width: wp('73%'), height: hp('7%'), paddingLeft: 20 }}
                  MyPlaceholder="Contact Number*"
                  textCon={{ borderBottomColor: this.state.activephoneNumberBorderError ? "red" : "white" }}
                  value={this.state.phoneNumber}
                  InputRef={(input) => this.phoneNumber = input}
                  onSubmitEditing={() => { this.postcode.focus(); }}
                  ErrorText={this.state.phoneNumberError}
                  MainContainer={{ width: wp('73%') }}
                  ErrorTextStyle={{ fontSize: 12 }}
                />
              </View>
              <View style={style.AboutAddressStyle}>
                <Text style={{ fontWeight: "bold", textAlign: 'center', color: 'rgb(37,37,37)' }}>Address Details</Text>
              </View>
              <View style={{ justifyContent: 'space-between', alignContent: 'center', alignSelf: 'center', width: wp('83%') }}>

                <View style={style.textInputView}>
                  <CustomTextInput
                    InputFieldMainContainer={{ height: hp("7%"), width: wp('75%') }}
                    textInputStyle={{ width: wp('75%'), height: hp('7%'), paddingLeft: 20 }}
                    MyPlaceholder="Post Code*"
                    onChangeText={(text) => this.handlevalidate(text, "postcode")}
                    textCon={{ borderBottomColor: this.state.activepostcodeBorderColor ? "red" : "white" }}
                    value={this.state.postcode}
                    onSubmitEditing={() => { this.address.focus(); }}
                    InputRef={(input) => this.postcode = input}
                    ErrorText={this.state.postcodeError}
                    MainContainer={{ width: wp('73%') }}
                    ErrorTextStyle={{ fontSize: 12 }}
                  />
                </View>
                <View style={style.textInputView}>
                  <CustomTextInput
                    InputFieldMainContainer={{ height: hp("7%"), width: wp('75%') }}
                    onChangeText={(text) => this.handlevalidate(text, "address")}
                    textInputStyle={{ width: wp('75%'), height: hp('7%'), paddingLeft: 20 }}
                    MyPlaceholder="Address*"
                    textCon={{ borderBottomColor: this.state.activeaddressBorderColor ? "red" : "white" }}
                    value={this.state.address}
                    InputRef={(input) => this.address = input}
                    ErrorText={this.state.addressError}
                    MainContainer={{ width: wp('73%') }}
                    onSubmitEditing={() => { this.transportName.focus(); }}
                    ErrorTextStyle={{ fontSize: 12 }}
                  />
                </View>
                <View style={style.textInputView}>
                  <CustomTextInput
                    InputFieldMainContainer={{ height: hp("7%"), width: wp('75%'), }}
                    onChangeText={(text) => this.handlevalidate(text, 'transportName')}
                    textInputStyle={{ width: wp('75%'), height: hp('7%'), paddingLeft: 20 }}
                    textCon={{ borderBottomColor: this.state.activeTransportNameBorderColor ? "red" : "white" }}
                    value={this.state.transportName}
                    InputRef={(input) => this.transportName = input}
                    MyPlaceholder="Transport Name"

                    // value={this.state.value}
                    ErrorText={this.state.transportNameError}
                    MainContainer={{ width: wp('73%') }}
                    ErrorTextStyle={{ fontSize: 12 }}

                  // ErrorText={this.state.lastNameErrorMessage}
                  />
                </View>
                <View style={{ width: wp('72%'), flexDirection: 'row', alignSelf: 'center', justifyContent: 'space-between', marginTop: hp('3%') }}>

                  <TouchableOpacity
                    onPress={() => this.setState({

                      firstname: "",
                      firstnameStatus: false,
                      firstnameError: "",
                      activefirstnameBorderColor: false,

                      lastname: "",
                      lastnameStatus: false,
                      lastnameError: "",
                      activelastnameBorderColor: false,

                      phoneNumber: '',
                      phoneNumberStatus: false,
                      phoneNumberError: '',
                      activephoneNumberBorderError: false,

                      gstno: "",
                      gstnoStatus: false,
                      gstnoError: "",
                      activegstnoBorderColor: false,


                      postcode: "",
                      postcodeStatus: false,
                      postcodeError: "",
                      activepostcodeBorderColor: false,


                      address: "",
                      addressStatus: false,
                      addressError: "",
                      activeaddressBorderColor: false,


                      transportName: '',
                      transportNameStatus: false,
                      transportNameError: '',
                      activeTransportNameBorderColor: false,



                    })
                    }

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


                  <TouchableOpacity
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
                    onPress={() => this.updateAddress()}
                  >
                    <Text style={{ color: '#ffffff', fontWeight: '700' }}> A D D</Text>
                  </TouchableOpacity>
                </View>


              </View>



            </ScrollView>
          </KeyboardAvoidingView>
        {/* </SafeAreaView> */}

      </View>

    )
  }

}


const mapStateToProps = state => {
  console.log("State_on_edit_Page==>> ", state)
  return {
    Token: state.AuthReducer.Token
  }
}

export default connect(mapStateToProps,

)(withNavigation(AddNewAddress));


const style = StyleSheet.create({
  container1: {

flex:1

  },

  container: {
    flex: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
    //alignSelf: 'center',
    backgroundColor: "rgb( 247, 249, 251)",
    width: wp("100%"),
    height: hp('100%'),
    marginRight: wp('10%'),

  },
  textInputView: {
    width: wp('72%'),
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: wp('6%'),

  },
  PersonalDetailsStyle: {
    backgroundColor: 'rgb(233,234,236)',
    marginVertical: hp('3%'),
    height: hp('5%'),
    width: wp('35%'),
    borderTopLeftRadius: 1,
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
    justifyContent: 'center'


  },
  AboutAddressStyle: {
    backgroundColor: 'rgb(233,234,236)',
    marginVertical: hp('3%'),
    height: hp('5%'),
    width: wp('50%'),
    borderTopLeftRadius: 1,
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
    justifyContent: 'center'

  },
  headerView: {
    height: hp('20%')
  },
  AddNewAddressView: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',

    width: wp('90%'),
    marginVertical: ('5%')

  },
  firstNameInputView: {
    flexDirection: 'row',

    width: wp('83%'),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',


    height: hp('7%'),
    marginVertical: hp('2%')
  }


})