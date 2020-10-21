import React, { Component } from 'react'
import {
    Modal,
    View,
    Text,
    StyleSheet,
    ScrollView,
    Platform,
    Image,
    TouchableOpacity,
    SafeAreaView,
    KeyboardAvoidingView,
    Alert,
    Linking
         } from 'react-native'
import { CustomTextInput } from '../../../components/globalComponents/GlobalTextInput'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import {Loader}  from '../../../components/globalComponents/Loader'
import { connect, } from 'react-redux';
import ApiRequest from "../../../services/webservice"
import CardComponent from './component'
import Icon from "./icon"
import NavigationIcons from '../../../Router/NavigationIcons'
import { CustomHeader } from '../../../components/globalComponents/Header'


 class ProductEnquiry extends Component {
    constructor(props) {
        super(props);
        this.state={
            modalVisible:false,
            isLoading:false,
            subject:'',
            description:'',
            adminEmail:"",
            Adminphonenumber:""
        }
    }


componentDidMount(){
  this.getProductenquirey()
}

getProductenquirey(){
 
  this.setState({ isLoading: true })
  ApiRequest("", "content/contact-admin", "GET", `JWT ${this.props.Token}`)
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
          this.setState({ isLoading: false ,Adminphonenumber:resp.data.mobile,
          adminEmail:resp.data.email})

        

          break;
        }


        default: {
          this.setState({ isLoading: false })
          setTimeout(() => {
            Alert.alert(
              '',
              resp.data.subject[0],
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
enquiryApi(){
    
  // this.setState({ isLoading: true })
 
  let enquiryDetails =
  { "subject": this.state.subject, "description": this.state.description }
    this.setState({isLoading:true})
  ApiRequest(enquiryDetails, "content/product-inquiry", "POST",`JWT ${this.props.Token}`)
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
          this.setState({modalVisible:!this.state.modalVisible})
         
         
          break;
        }


        default: {
          this.setState({ isLoading: false })
          setTimeout(() => {
            Alert.alert(
              '',
              resp.data.subject[0],
              [
                { text: 'OK', onPress: () => console.log('OK Pressed')},
              ],
              { cancelable: false },
            );
          }, 200);

        }
          break;
      }

    })



  }

Modal_close(){
  this.setState({modalVisible:false},()=>this.props.navigation.navigate("SettingScreen"))
  
}

    render() {
        return (
            <View style={style.container}>
                           <CustomHeader Size={"medium"} backicon={true}goback={()=>this.props.navigation.goBack()}  backicon={NavigationIcons.backicon} Title="Product Enquiry"/>

                {/* <SafeAreaView> */}
                    <KeyboardAvoidingView style={style.KeyboardAvoidingViewStyle} behavior={Platform.OS === 'ios' ? "padding" : null} enabled>
                        <ScrollView showsVerticalScrollIndicator={false}>

                           
                            <View style={{ marginTop:wp('2%'),justifyContent: 'center', alignItems: 'center' }}>
                                <TouchableOpacity onPress={()=>Linking.openURL(`tel:${this.state.Adminphonenumber}`)} >
                                 <CardComponent
                                    image={Icon.phoneNumber}
                                    text={this.state.Adminphonenumber}
                                /> 
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => Linking.openURL(`mailto:${this.state.adminEmail}`) } >
 <CardComponent
                                     image={Icon.emailIcon}
                                    text={this.state.adminEmail}
                                />
                                </TouchableOpacity>
                               
                                <View style={{ marginVertical: hp('4%') }}>
                                    <CustomTextInput
                                        MyPlaceholder="Subject"
                                        onChangeText={(text) => this.setState({subject: text}) }
                                        value={this.state.subject}
                                        InputFieldMainContainer={{ height: hp('7%'), width: wp('80%'),alignSelf:'center' }}
                                        textInputStyle={{ paddingLeft: 20, height: hp('7%'), width: wp('80%') }}
                                    // returnKeyType="next"
                                    />
                                    <View style={{ justifyContent: 'center', marginVertical: hp('2%'), }}>

                                        <CustomTextInput
                                            InputFieldMainContainer={{ height: hp('40%'),borderRadius:25, }}
                                            onChangeText={(text) => this.setState({description: text}) }
                                            value={this.state.description}
                                            textInputStyle={{ height: hp('34%'), padding: 20}}
                                            MyPlaceholder="Description"
                                            returnKeyType="next"
                                            InputRef={(input) => this.firstname = input}
                                            multiline={true}
                                         
                                        />
                                    </View>
                                    <View style={{ width: wp('80%'), flexDirection: 'row', justifyContent: 'space-between', marginVertical: hp('2%') }}>
                                        <View style={{ width: wp('38%'), height: hp('7%'), alignItems: 'center', borderWidth: 2, borderColor: '#23a7fa', borderRadius: 25, justifyContent: 'center' }}>
                                            <TouchableOpacity onPress={()=>this.props.navigation.state.params.page=="menu"?this.props.navigation.goBack():this.props.navigation.navigate("SettingScreen")}>
                                                <Text style={{ color: '#23a7fa', fontWeight: '700' }}> C A N C E L</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{ width: wp('38%'), backgroundColor: '#23a7fa', height: hp('7%'), alignItems: 'center', borderWidth: 2, borderColor: '#23a7fa', borderRadius: 25, justifyContent: 'center' }}>
                                            <TouchableOpacity
                                            onPress={()=>{
                                                this.enquiryApi()
                                               // this.setState({modalVisible:!this.state.modalVisible})
                                            
                                            }
                                            }
                                            >
                                                <Text style={{ color: '#ffffff', fontWeight: '700' }}> S E N D</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>


                                </View>

                            </View>




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
                <TouchableOpacity  onPress={()=>this.Modal_close()}>
           <Image source={Icon.crossicon} />
        
           </TouchableOpacity>
           </View>
                <View style={{width:wp("60%")}}>
                
              <Text
              
                style={{
                  fontSize:15,
                 marginBottom:hp("13%"),
                 marginHorizontal:wp('8%'),
                 marginVertical:hp('-8%'),
                 alignSelf:'center'


                }}
              >
              Thanks for sharing your query,our executive will connect you soon!
             
           </Text>
           </View>
              
          </View>
          </View>
        </Modal>
        </View>


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
      Token: state.AuthReducer.Token
    }
  }
  
  
//   const mapDispatchToProps = dispatch => {
//     return { actions: bindActionCreators({ SaveuserDetails }, dispatch) }
//   }
  
  export default connect(mapStateToProps,
  
  )(ProductEnquiry);



const style = StyleSheet.create({

    container: {
       
        // justifyContent: 'space-between',
        // alignItems: 'center',
      
        backgroundColor: "#E6EAED",
flex:1
        // marginTop:Platform.OS==="ios" ? wp('0%') : null,

    },
    KeyboardAvoidingViewStyle: {
        flex: 1,
       
    },
    crossView:{  
        alignSelf:'flex-end',
        
        marginBottom: hp('11%'),
        marginHorizontal:wp('-1%')
        
        },
        

}

)