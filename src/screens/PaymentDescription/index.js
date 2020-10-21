import React, { Component } from 'react';
import { Alert,View, Text, StyleSheet, Image, Button, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import {GotoReceiptHistory} from '../../components/globalComponents/Button'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { connect, } from 'react-redux';
import { SaveuserDetails } from '../../redux/Actions/AuthAction';
import AsyncStorage from '@react-native-community/async-storage';
import { bindActionCreators } from 'redux';
import { withNavigationFocus } from 'react-navigation';
import ApiRequest from "../../services/webservice"
import { CustomHeader2 } from '../../components/globalComponents/Header';
import NavIcons, { IconComponent } from '../../Router/NavigationIcons';

 class Payment extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            modalVisible2: false,
            toggleradio: false,
            subcategorylist: "",
            responsemessage: "",
            isLoading: false,
            Shopbycategory: "",
            account_nameone: "",
            account_numberone: "",
            ifsc_codeone: "",
            account_nameTwo: "",
            account_numberTwo: "",
            ifsc_codeTwo: "",
            paytm:""


        };
      }  
componentDidMount(){

    this.getPaymentDetails()
}


getPaymentDetails(){

    ApiRequest('', "user-management/payment-detail", "GET", `JWT ${this.props.Token}`)
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
          await this.setState({
            paytm: resp.data.paytm.paytm,
          })
          this.setState({ account_nameone: resp.data.bank[0].account_name, })
          this.setState({ account_numberone: resp.data.bank[0].account_number, })
          this.setState({ ifsc_codeone: resp.data.bank[0].ifsc_code, })
          this.setState({ account_nameTwo: resp.data.bank[1].account_name, })
          this.setState({ account_numberTwo: resp.data.bank[1].account_number, })
          this.setState({ ifsc_codeTwo: resp.data.bank[1].ifsc_code, })
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

            <View style={styles.container}>
            {/* <View> */}
               <CustomHeader2 Size={"medium"}
            menuonPress={() =>
              this.props.navigation.openDrawer()
            }
            bellicononpress={()=>this.props.navigation.navigate("Notification")}
             bellicon={NavIcons.bellicon} menuicon={NavIcons.menuicon} Title="Payment Details"/>
            <ScrollView
            showsVerticalScrollIndicator={false}>
            <View style={styles.textWrap}>

            
                    <Text style={{ alignSelf: 'center', marginHorizontal: 12, fontSize: 16 }}>
                        For confirm the booking order kindly done the payment by using our following details and upload the receipt.
                        </Text>
                    <View style={styles.detailStyle}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10, marginLeft: 10, }}>Bank Details</Text>
                        <View style={{alignSelf:"center",width:wp("85%"), flexDirection: 'row', marginTop: 5, marginLeft: 10,justifyContent:"space-between" }}>
                            <Text style={{ fontSize: 15,width:wp("42%") }}>Account Name</Text>
                            <Text style={{ fontSize: 15,width:wp("43%") ,}}>{this.state.account_nameone}</Text>
                        </View>

                        <View style={{alignSelf:"center",width:wp("85%"), flexDirection: 'row', marginTop: 5, marginLeft: 10,justifyContent:"space-between" }}>
                            <Text style={{ fontSize: 15 ,width:wp("42%") }}>Account Number</Text>
                            <Text style={{ fontSize: 15,width:wp("43%") }}>{this.state.account_numberone}</Text>
                        </View>

                        <View style={{alignSelf:"center",width:wp("85%"), flexDirection: 'row', marginTop: 5, marginLeft: 10,justifyContent:"space-between" }}>
                            <Text style={{ fontSize: 15,width:wp("42%")  }}>IFSC Code</Text>
                            <Text style={{ fontSize: 15,width:wp("43%") }}>{this.state.ifsc_codeone}</Text>
                        </View>

                    </View>
                    <View style={{ marginTop: 20, alignItems: 'center', height: hp('3%'), }}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ borderBottomWidth: 0.5, width: hp('22%'), marginBottom: 7, }} />
                            <Text style={{ color: 'rgb(61,184,248)' }}>   OR   </Text>
                            <View style={{ borderBottomWidth: 0.5, width: hp('22%'), marginBottom: 7, }} />
                        </View>
                    </View>

                    <View style={styles.contactStyle}>
                        <Image style={styles.imageInner}
                        style={{width:wp("10%"),height:hp("3%")}}
                        resizeMode="contain"
                         source={require('../../assets/images/layer32.png')} />
        <Text style={styles.inputField}> {this.state.paytm}</Text>
                    </View>

                    <View style={{ marginTop: 20, alignItems: 'center', height: hp('3%'), }}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ borderBottomWidth: 0.5, width: hp('22%'), marginBottom: 7, }} />
                            <Text style={{ color: 'rgb(61,184,248)' }}>   OR   </Text>
                            <View style={{ borderBottomWidth: 0.5, width: hp('22%'), marginBottom: 7, }} />
                        </View>
                    </View>

                    {/* <View style={styles.contactStyle}>
                        {/* <Image style={styles.imageInner} source={require('../../assets/images/popup.png')} /> */}
                        {/* <Text style={styles.inputField}>   +91-7525241014</Text>
                    </View> */} 
 <View style={styles.detailStyle}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10, marginLeft: 10, }}>Bank Details</Text>
                        <View style={{alignSelf:"center",width:wp("85%"), flexDirection: 'row', marginTop: 5, marginLeft: 10,justifyContent:"space-between" }}>
                            <Text style={{ fontSize: 15,width:wp("42%")}}>Account Name</Text>
                            <Text style={{ fontSize: 15, width:wp("43%") }}>{this.state.account_nameTwo}</Text>
                        </View>

                        <View style={{alignSelf:"center",width:wp("85%"), flexDirection: 'row', marginTop: 5, marginLeft: 10,justifyContent:"space-between" }}>
                            <Text style={{ fontSize: 15, width:wp("42%")}}>Account Number</Text>
                            <Text style={{ fontSize: 15, width:wp("43%")}}>{this.state.account_numberTwo}</Text>
                        </View>

                        <View style={{alignSelf:"center",width:wp("85%"), flexDirection: 'row', marginTop: 5, marginLeft: 10,justifyContent:"space-between" }}>
                            <Text style={{ fontSize: 15 ,width:wp("42%")}}>IFSC Code</Text>
                            <Text style={{ fontSize: 15,width:wp("43%") }}>{this.state.ifsc_codeTwo}</Text>
                        </View>

                    </View>
                  

                    {/* <GotoReceiptHistory
                    submitOnpress={alert("ffdfdf")}
                    ButtonName="GO TO RECEIPT HISTORY"
                    /> */}
                    <TouchableOpacity  
                    onPress={()=>this.props.navigation.navigate("RecieptHistory")}
                    style={{
                        height:hp("8%"),
                        width:wp("70%"),
                        backgroundColor: 'rgb(49,176,249)',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 25,
                        marginVertical: wp('5%'),
                        alignSelf: 'center',
                    }}
                    >
                        <Text style={{color:'white',fontSize:wp('5.5%')}}>
                        GO TO RECEIPT HISTORY
                        </Text>
                    </TouchableOpacity>
              
            </View>

            </ScrollView>
           </View>


        );
    }
}
const mapStateToProps = state => {
  
    return {
      Token: state.AuthReducer.Token
    }
  }
  
  
  const mapDispatchToProps = dispatch => {
    return { actions: bindActionCreators({ SaveuserDetails }, dispatch) }
  }
  
  export default connect(mapStateToProps,
    mapDispatchToProps
  )(withNavigationFocus(Payment));
const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    textWrap: {
       marginVertical:hp('2%'),
        //flex: 1,
        //backgroundColor: 'white'
      backgroundColor:'rgb(247,249,251)'
    },
    detailStyle: {
        width: wp('90%'),
        height: hp('20%'),
        backgroundColor: 'white',
        alignSelf: 'center',
        //borderWidth:1,
        //borderColor:'grey',
        //marginTop: 10,
        shadowColor: 'red',
        shadowRadius: 10,
        borderRadius: 5,
        borderStyle: 'solid',
        //borderWidth:1,
        shadowOffset: { width: 5, height: 5, },
        shadowColor: 'grey',
        shadowOpacity: 0.5,
    },
    contactStyle: {
        width: wp('90%'),
        height: hp('3%'),
        backgroundColor: 'white',
        alignSelf: 'center',
        flexDirection: 'row',
        marginTop: 20,
        borderRadius: 5,
    },
    imageInner: {
        height: hp('7%'),
        marginTop: 4,
        width: wp('8%')

    },
    inputField: {
        width: wp('75%'),
        marginLeft: 10,
        alignSelf: 'center'
        //backgroundColor:'black'
    },
  

});