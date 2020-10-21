import React, { Component } from 'react'
import {  View, StyleSheet, SafeAreaView, ScrollView, Image,  Alert,} from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import UserProfileComponent from './component'
import { connect, } from 'react-redux';
import { SaveuserDetails } from '../../redux/Actions/AuthAction';
import AsyncStorage from '@react-native-community/async-storage';
import { bindActionCreators } from 'redux';
import ApiRequest from "../../services/webservice"
import Icons from './icon'
import { withNavigationFocus } from 'react-navigation';
import NavigationIcons from '../../Router/NavigationIcons';
import { CustomHeader } from '../../components/globalComponents/Header';
class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updateimage:"",
      profile:false
    }

  }
  pickSingleBase64(cropit) {
    ImagePicker.openPicker({
      width: wp('40%'),
      height: hp('20%'),
      cropping: cropit,
      includeBase64: true,
      includeExif: true,
    }).then(image => {

      this.setState({
        image: { uri: `data:${image.mime};base64,` + image.data, width: image.width, height: image.height },
        images: null
      });
    }).catch(e => alert(e));
  }

  // renderImage(image) {
  //   return <Image style={{ width: wp('40%'), height: hp('20%'), borderRadius: wp('30%') }} source={image} />
  // }
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


  componentDidMount() {
    this.EditApi()

  }

  EditApi() {
    ApiRequest('', "user-management/profile", "GET", `JWT ${this.props.Token}`)
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
            this.props.actions.SaveuserDetails(resp.data.user_details)
            AsyncStorage.setItem("RefreshUserdetails", JSON.stringify(false))

            this.setState({ firstname: resp.data.user_details.name })
            this.setState({ lastname: resp.data.user_details.company_name })

            this.setState({ phoneNumber: resp.data.user_details.mobile_no })
            this.setState({ gstno: resp.data.user_details.gst_no })
            this.setState({ email: resp.data.user_details.email })
            this.setState({ postcode: resp.data.user_details.user_address.postal_code })
            this.setState({ address: resp.data.user_details.user_address.address })
           await  this.setState({ updateimage:resp.data.user_details.image})

         
          }

          default: {


          }
            break;
        }

      })
  }



  render() {
    if (this.props.isFocused) {
      AsyncStorage.getItem("RefreshUserdetails").then(resp => {
      
        if (JSON.parse(resp) === true) {
          this.EditApi()
        }
        else {
        }
      })
        .catch(error => {
        })
    }
    return (

      <View style={style.container}>
 <CustomHeader Size={"medium"}
                  
                    editimage={NavigationIcons.editicon}
                    backicon={NavigationIcons.backicon}
                    EditOnpress={()=>this.props.navigation.navigate("editprofile")}
                    bellicon={NavigationIcons.bellicon}
                    Bellicon={true}
                    backicon={true}goback={()=>this.props.navigation.goBack()}
                    bellnotificationsOnpress={()=>this.props.navigation.navigate("Notification")}
                    Title="Profile" />

        {/* <SafeAreaView> */}
          <ScrollView showsVerticalScrollIndicator={false}>


            <View style={{ height: hp('30%'), width: wp('100%'), justifyContent: 'center', alignItems: 'center',  borderColor: '#FFFFFF' }}>
              {/* {this.state.image ? this.renderImage(this.state.image) : */}
                <Image
                  source={this.props.image?{uri:this.props.image}:Icons.Profile}
                  // source={{uri:"file:///Users/swagatikamohapatra/Library/Developer/CoreSimulator/Devices/EAF4C078-2490-4A1B-AC2B-7F8631FC47E5/data/Containers/Data/Application/E7944D94-2799-4738-959B-738FDFA75644/Documents/images/412C4C7E-4941-4586-B938-6D7D9D5851BD.jpg"}}
                  // resizeMode='contain'
                  style={{ height:160,width:160,borderRadius:80 }}

                />


            </View>




            <View style={style.cardViewStyle}>
              <UserProfileComponent
                firstname="Name"
                colonIcon=":"
                apiData={this.state.firstname}
              />
              <UserProfileComponent
                firstname="Company Name"
                colonIcon=":"
                apiData={this.state.lastname}
              />
              <UserProfileComponent
                firstname="Phone Number"
                colonIcon=":"
                apiData={this.state.phoneNumber}
              />

              <UserProfileComponent
                firstname="E-mail ID"
                colonIcon=":"
                apiData={this.state.email}
              />
              <UserProfileComponent
                firstname="GST NO."
                colonIcon=":"
                apiData={this.state.gstno}
              />

            {this.state.postcode!=undefined&&this.state.postcode!=null&&
            this.state.postcode!='' ? <UserProfileComponent
                firstname="Post Code"
                colonIcon=":"
                apiData={this.state.postcode}
              />
            :null}

            
{this.state.address!=undefined&&this.state.address!=null&&
            this.state.address!='' ?  <UserProfileComponent
                firstname="Address"
                colonIcon=":"
                apiData={this.state.address}
              />:null}






            </View>
          </ScrollView>
        {/* </SafeAreaView> */}
      </View>

    )
  }

}

const mapStateToProps = state => {

  return {
    Token: state.AuthReducer.Token,
    image:state.AuthReducer.Userdetails.image
  }
}


const mapDispatchToProps = dispatch => {
  return { actions: bindActionCreators({ SaveuserDetails }, dispatch) }
}

export default connect(mapStateToProps,
  mapDispatchToProps
)(withNavigationFocus(UserProfile));




const style = StyleSheet.create({
  container: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: "rgb( 247, 249, 251)",
    flex:1

  },
  cardViewStyle: {

    backgroundColor: '#ffffff',

    borderWidth: 0.3, borderColor: 'lightgray', width: wp('95%'), height: hp('56%')
    , shadowOpacity: 0.4,
    shadowOffset: { width: 0.1, height: 0.1 },
    shadowRadius: 0.9,
    marginHorizontal: wp('2%')

  },

})