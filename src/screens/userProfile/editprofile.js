import React, { Component } from 'react'
import { Loader } from '../../components/globalComponents/Loader'
import { Text, View, StyleSheet, SafeAreaView, ScrollView, Image, ImageBackground, Alert, TouchableOpacity } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import UserProfileComponent from './component'
import { handleValidations } from "./function"
import Mask from 'react-native-mask'
import Icons from './icon'
import { CustomTextInput } from '../../components/globalComponents/GlobalTextInput'
import { SubmitButton } from '../../components/globalComponents/Button'
import DefaultState from "./constant"
import { connect, } from 'react-redux';
import { SaveuserDetails } from '../../redux/Actions/AuthAction';
import AsyncStorage from '@react-native-community/async-storage';
import { bindActionCreators } from 'redux';
import ApiRequest from "../../services/webservice"
import { withNavigationFocus } from "react-navigation"
import ImagePicker from 'react-native-image-picker'
import { KeyboardAvoidingView } from 'react-native'
import NavigationIcons from '../../Router/NavigationIcons'
import { CustomHeader } from '../../components/globalComponents/Header'

class editprofile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarSource: "",
      isUploadImg: false,
      isLoading: false,
      DefaultState
    }

  }

  componentDidMount() {
    this.ProfileApi()

  }

  ProfileApi() {
    ApiRequest('', "user-management/profile", "GET", `JWT ${this.props.isLoading}`)
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
            this.setState({
              firstnameStatus: true,
              firstnameError: "",
              activefirstnameBorderColor: true,

              lastnameStatus: true,
              lastnameError: "",
              activelastnameBorderColor: true,

              phoneNumberStatus: true,
              phoneNumberError: '',
              activephoneNumberBorderError: true,
              emailStatus: true,
              emailError: "",
              activeemailBorderColor: true,
              gstnoStatus: true,
              gstnoError: "",
              activegstnoBorderColor: true,

              postcodeStatus: true,
              postcodeError: "",
              activepostcodeBorderColor: true,


              addressStatus: true,
              addressError: "",
              activeaddressBorderColor: true,



            })

            this.setState({ firstname: resp.data.user_details.name })
            this.setState({ lastname: resp.data.user_details.company_name })
            this.setState({ phoneNumber: resp.data.user_details.mobile_no })
            this.setState({ gstno: resp.data.user_details.gst_no })
            this.setState({ email: resp.data.user_details.email })
            this.setState({ postcode: resp.data.user_details.user_address.postal_code })
            this.setState({ address: resp.data.user_details.user_address.address })
            await this.setState({ receipt: resp.data.user_details.image })
            break;


          }

          default: {

          }
            break;
        }

      })
  }



  renderImage(image) {
    return <Image style={{ width: wp('40%'), height: hp('20%'), borderRadius: wp('30%'), position: 'absolute' }} source={image} />
  }
  namecheck = (value, type) => {
    if (type == 'firstName') {
      this.setState({ firstName: value })
      this.validateFname(value);
    }
    else if (type == 'middleName') {
      this.setState({ middleName: value })
      this.validateMname(value);
    }
  }

  ProfileimageUpload() {
    // this.setState({isLoading:true})
    let imageName = "fileName"
    let formdata = new FormData();
    formdata.append("image", {
      uri: this.state.receipt,
      name: 'image.jpg',
      type: this.state.type,
    })


    fetch("http://13.234.145.105:1510/v1/api/user-management/upload-profile-image", {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `JWT ${this.props.isLoading}`
      },
      body: formdata
    })



      .then((response) => response.json().then(data => {


        this.setState({ isLoading: false })


      }))
      .catch((error) => {

      });
  }

  async imageUpload() {
    var options = {
      // customButtons: [
      //   { title: 'Choose Photo from Gallery' },
      // ],
      title:'Select photo',
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };
    ImagePicker.showImagePicker(options, (response) => {


      if (response.didCancel) {

      } else if (response.error) {

      } else if (response.customButton) {

      } else {
        const source = { uri: response.uri };

        this.setState({
          receipt: response.uri,
          type: response.type,

        });
        this.ProfileimageUpload()
      }
    });

  }


  EditApi() {
    this.setState({ isLoading: true })
    let EditDetails =
    {

      "name": this.state.firstname,
      "company_name": this.state.lastname,
      "email": this.state.email,
      "user_address": {
        "address": this.state.address,
        "postal_code": this.state.postcode,
      }

    }

    ApiRequest(EditDetails, "user-management/profile", "POST", `JWT ${this.props.isLoading}`)
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
                      AsyncStorage.setItem("RefreshUserdetails", JSON.stringify(true))
                      this.props.navigation.navigate("UserProfile")


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

  SignupSubmit() {
    if (this.state.firstnameStatus) {
      if (this.state.lastnameStatus) {

        if (this.state.emailStatus) {


          if (this.state.postcodeStatus) {
            if (this.state.addressStatus) {

              this.EditApi()


            }
            else { this.setState({ addressError: '*Please enter address.', addressStatus: false, activeaddressBorderColor: true }) }
          }
          else { this.setState({ postcodeError: '*Please enter postcode.', postcodeStatus: false, activepostcodeBorderColor: true }) }
        }


        else { this.setState({ emailError: '*Please enter email.', emailStatus: false, activeemailBorderColor: true }) }
      }

      else { this.setState({ lastnameError: '*Please enter company name.', lastnameStatus: false, activelastnameBorderColor: true }) }
    }
    else { this.setState({ firstnameError: '*Please enter name.', firstnameStatus: false, activefirstnameBorderColor: true }) }


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

  render() {
    return (

      <View style={style.container}>
 <CustomHeader Size={"medium"}
                    
                    // editimage={NavIcons.editicon}
                    backicon={NavigationIcons.backicon}
                    backicon={true}goback={()=>this.props.navigation.goBack()}
                    EditOnpress={()=>this.props.navigations.navigate("editprofile")}
                    Title="Edit Profile" />
        {/* <SafeAreaView> */}
          <KeyboardAvoidingView style={style.container1} behavior={Platform.OS === 'ios' ? "padding" : null} enabled>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={{
                height: hp('30%'),
                width: wp('100%'), justifyContent: 'center',
                alignItems: 'center', backgroundColor: '#fffff', borderColor: '#FFFFFF'
              }}>
                {this.state.image ? this.renderImage(this.state.image) :

                  <Mask shape={'circle'}
                    style={{ height: hp('5%'), width: wp('15%'), borderRadius: 80 }}
                  >
                    <Image

                      source={this.state.receipt ? { uri: this.state.receipt } : Icons.Profile}
                      // resizeMode='contain'
                      style={{ height: 110, width: 110, borderRadius: 50 }}



                    />
                  </Mask>
                }
                <TouchableOpacity
                  onPress={() => this.imageUpload()}
                  style={{
                    height: hp('9%'),

                    alignItems: 'flex-end',
                    width: wp('30%'), marginVertical: hp('19%'),
                    justifyContent: 'flex-end', borderRadius: 20, position: 'absolute'
                  }}>
                  <Image
                    style={{ marginLeft: 10 }}
                    source={Icons.cameraimage}
                  />

                </TouchableOpacity>


              </View>


              <CustomTextInput
                MyPlaceholder="Name*"
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
                onSubmitEditing={() => { this.email.focus(); }}
                maxLength={15}
              />


              <CustomTextInput
                MyPlaceholder="Email*"
                textInputStyle={{ paddingLeft: 20, }}
                value={this.state.email}
                onChangeText={(text) => this.handlevalidate(text, "email")}
                ErrorText={this.state.emailError}
                textCon={{ borderBottomColor: this.state.activeemailBorderColor ? "red" : "white" }}
                returnKeyType="next"
                InputRef={(input) => this.email = input}
                onSubmitEditing={() => { this.postcode.focus(); }}

              />

              <CustomTextInput
                MyPlaceholder="Postcode*"
                textInputStyle={{ paddingLeft: 20 }}
                value={this.state.postcode}
                onChangeText={(text) => this.handlevalidate(text, "postcode")}
                ErrorText={this.state.postcodeError}
                textCon={{ borderBottomColor: this.state.activepostcodeBorderColor ? "red" : "white" }}
                returnKeyType="next"
                InputRef={(input) => this.postcode = input}
                onSubmitEditing={() => { this.address.focus(); }}
                keyboardType="number-pad"
                maxLength={6}
              />
              <CustomTextInput
                MyPlaceholder="Address*"
                textInputStyle={{ paddingLeft: 20 }}
                value={this.state.address}
                onChangeText={(text) => this.handlevalidate(text, "address")}
                ErrorText={this.state.addressError}
                textCon={{ borderBottomColor: this.state.activeaddressBorderColor ? "red" : "white" }}
                returnKeyType="next"
                InputRef={(input) => this.address = input}

              />
              <SubmitButton

                submitOnpress={() =>


                  this.SignupSubmit()}

                Size={"medium"}
                ButtonText={{ fontSize: 18 }}
                ButtonName="S A V E"
              />

            </ScrollView>
          </KeyboardAvoidingView>
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
    isLoading: state.AuthReducer.Token
  }
}


const mapDispatchToProps = dispatch => {
  return { actions: bindActionCreators({ SaveuserDetails }, dispatch) }
}

export default connect(mapStateToProps,
  mapDispatchToProps
)(withNavigationFocus(editprofile));



const style = StyleSheet.create({
  container: {
    alignItems: 'center',
   
    backgroundColor: "rgb( 247, 249, 251)",
    flex: 1

  },
  container1: {
    flex: 1


  },
  cardViewStyle: {

    backgroundColor: '#ffffff',

    borderWidth: 0.3, borderColor: 'lightgray', width: wp('95%'), height: hp('56%')
    , shadowOpacity: 0.4,
    shadowOffset: { width: 0.1, height: 0.1 },
    shadowRadius: 0.9,
    marginHorizontal: wp('2%')

  },
  MobileNumberCountryCodeView: {
    flexDirection: 'row',
    width: wp('83%'),
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center'
  },
  ErrorView: {
    alignSelf: "center",
    width: wp("80%"),
    height: hp("4%"),

    //  backgroundColor:'yellow'

  },
  ErrorText: {
    color: "red",
  },

})