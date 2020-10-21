import React, { Component } from 'react'
import { 
    Text, 
    View, 
    StyleSheet, 
    SafeAreaView,
     ScrollView, 
     Image, 
     ImageBackground,
     Modal,
     TouchableOpacity,
     TextInput,
     Alert
     } from 'react-native'
     import AsyncStorage from "@react-native-community/async-storage"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import CardComponent from './component'
import {Loader} from '../../components/globalComponents/Loader'
import Icons from "./icon"
import { Rating} from 'react-native-ratings';
import { connect } from 'react-redux';
import ApiRequest from "../../services/webservice"
import { SaveTokenAction } from '../../redux/Actions/AuthAction';
import { bindActionCreators } from 'redux';
import NavIcons from '../../Router/NavigationIcons'
import { CustomHeader2 } from '../../components/globalComponents/Header'

 class SettingScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible:false,
            modalVisiblefeedback:false,
            Description:"",
            ratingCount: 0,
            isLoading:false

        }


    }
   
    ratingCompleted=(rating)=> {
      this.setState({ratingCount : rating})
      

    }
     

    feedbackApi(){
      this.setState({modalVisiblefeedback:!this.state.modalVisiblefeedback})
    this.setState({ isLoading: true })
    let feedbackDetails =
     {
      "description": this.state.Description,
      "rate":this.state.ratingCount
     }

    ApiRequest(feedbackDetails, "content/rate", "POST",`JWT ${this.props.Token}`)
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
                '',
                resp.data.response_message,
                [
                  { text: 'OK', onPress: () => console.log('OK Pressed') },
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
    setDescription(text){
this.setState({Description:text})

    }
    render() {
        return (

            <View style={style.container}>

                {/* <SafeAreaView> */}

                <CustomHeader2 Size={"medium"}
            menuonPress={() =>
                this.props.navigation.openDrawer()
            }
            bellicononpress={()=>this.props.navigation.navigate("Notification")}
           bellicon={NavIcons.bellicon} menuicon={NavIcons.menuicon} Title="Settings" />
                    <ScrollView showsVerticalScrollIndicator={false}>
                       
                        <View style={style.cardView}>
                            <CardComponent
                            onPress={()=>this.props.navigation.navigate("UserProfile")}
                                image={Icons.profile}
                                text="My Profile"

                            />
                            <CardComponent
                            onPress={()=>this.props.navigation.navigate("RecieptHistory")}
                                image={Icons.Receipthistory}
                                text="My Receipt History"

                            />
                            
                            <CardComponent
                            onPress={()=>this.props.navigation.navigate("MyOrderHistory")}
                                image={Icons.OrderHistory}
                                text="Order History"

                            />

                             


                            <CardComponent
                           
                            onPress={()=>this.props.navigation.navigate("ProductEnquiry",{page:"settings"})}
                                image={Icons.Productenqury}
                                text="Product Inquiry"
                            />
                            <CardComponent
                                  onPress={()=>this.setState({modalVisiblefeedback:!this.state.modalVisiblefeedback})}
                                image={Icons.feedback}
                                text="Feedback"
                            />
                            <CardComponent
                          
                            onPress={()=>this.props.navigation.navigate("ChangePassword")}
                                image={Icons.Resetpassword}
                                text="Reset Password"
                            />

                            <CardComponent
                            
                            onPress={()=>this.props.navigation.navigate("Termandcondition")}
                                image={Icons.Termandcondition}
                                text="Terms & Conditions"
                            />


                            <CardComponent
                               onPress={()=>this.props.navigation.navigate("Priavacypolicy")}
                           
                                image={Icons.Privacypolicy}
                                text="Privacy Policy"
                            />

                            <CardComponent
                             onPress={()=>this.props.navigation.navigate("FAQ")}
                            
                                image={Icons.Faqs}
                                text="FAQS"
                            />

                            <CardComponent
                            
                            onPress={()=>this.props.navigation.navigate("Aboutus")}
                                image={Icons.Aboutus}
                                text="About Us"
                            />
                            <CardComponent
                            onPress={()=>this.setState({modalVisible:!this.state.modalVisible})}
                                image={Icons.logout}
                                text="Logout"
                            />

                        </View>


                        <View style={{alignItems:"center",flex:1,  justifyContent:"center"}}>
        <Modal
          transparent={true}
          visible={this.state.modalVisible}
        // onRequestClose={props.onRequestClose}
        // {...props}
        >
           <View style={{alignItems:"center", flex:1, backgroundColor: 'rgba(49,176,249,0.8)', justifyContent: 'center' }}>
          <View style={{
              borderRadius: 8,
              marginTop: hp("35%"),
              justifyContent: "center",
              alignItems: "center",
              alignSelf: 'center',
              width: wp("70%"),
              backgroundColor: "white",
              height: hp("25%"),
              marginBottom:hp("30%")
              // justifyContent:"center"
                }}>
                   
                <View style={{width:wp("60%"),alignItems:"center",justifyContent:"center"}} >
              <Text
              
                style={{
                  fontSize:20,
                  textAlign:"center",
                 marginBottom:hp("5%")

                }}
              >
             Are you sure you want to logout ?
             
           </Text>
           </View>
              <View
                style={{
                  alignItems:"center",
                  alignSelf:"center",
                  // backgroundColor:"yellow",
                  width:wp("60%"),
                  flexDirection:"row",
                  justifyContent:"space-between"
                }
                }>
                <TouchableOpacity
                 onPress={()=>this.setState({modalVisible:!this.state.modalVisible})}
                  style={{
                    borderWidth:1,
                    borderColor:'rgb(49,176,249)',
                    borderRadius:15,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "white",
                    width: wp("25%"),
                    height: hp("5%"),
                    shadowColor: 'rgb(49,176,249)',
                    shadowOffset: {
                        width: 0,
                        height: 3
                    },
                    shadowRadius: 5,
                    shadowOpacity: 0.6
                  }}

                >
           <Text style={{color:"rgb(49,176,249)",fontSize:18,fontWeight:"bold"}}>
            No
           </Text>
           </TouchableOpacity>
                <TouchableOpacity
                onPress={()=>{
                  AsyncStorage.removeItem("Token")
                  this.setState({modalVisible:!this.state.modalVisible})
                      this.props.navigation.navigate("Login")}
                  
                  
                }
                  style={{
                    borderWidth:1,
                    borderColor:'rgb(49,176,249)',
                    borderRadius:15,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "rgb(49,176,249)",
                    width: wp("25%"),
                    height: hp("5%"),
                    shadowColor: 'rgb(49,176,249)',
                    shadowOffset: {
                        width: 0,
                        height: 3
                    },
                    shadowRadius: 5,
                    shadowOpacity: 0.6
                  }}
           >
           <Text style={{
             color:"white",
             fontSize:18,fontWeight:"bold"
           }}>
           Yes
           </Text>
           </TouchableOpacity>
           </View>
          </View>
          </View>
        </Modal>
        </View>
        <Modal
          transparent={true}
          visible={this.state.modalVisiblefeedback}
        // onRequestClose={props.onRequestClose}
        // {...props}
        >
           <View style={{alignItems:"center", flex:1, backgroundColor: 'rgba(49,176,249,0.8)', justifyContent: 'center' }}>
          <View style={{
              borderRadius: 8,
              marginTop: hp("35%"),
              justifyContent: "center",
              alignItems: "center",
              alignSelf: 'center',
              width: wp("70%"),
              backgroundColor: "white",
              height: hp("40%"),
              marginBottom:hp("30%")
              // justifyContent:"center"
                }}>
                   
                <View style={{width:wp("60%"),alignItems:"center",justifyContent:"center"}} >
              <Text
              
                style={{
                  fontSize:25,
                  textAlign:"center",
                 marginBottom:hp("2%")

                }}
              >
             Rate This App
             
           </Text>
                        <Rating
                          
                          onFinishRating={this.ratingCompleted}
                          style={{ paddingVertical: 10 }}
                        />

          <View style={{height:wp('15%'),
          width:wp('60%')
          ,backgroundColor:'#f2f2f2',
          borderRadius:50,
          alignContent:'center',
          alignItems:'center',
          justifyContent:'center' ,
          marginBottom:hp('2%')
          }}>
              <TextInput
              placeholder="Kindly suggest how could we improve our services?"
              multiline={true}
              value={this.state.Description}
              onChangeText={(text)=>this.setDescription(text)}
                numberOfLines= {5}  style={{color:'grey',alignSelf:"center",marginLeft:wp('5%')}}></TextInput>
          </View>
           </View>
              <View
                style={{
                  alignItems:"center",
                  alignSelf:"center",
                  // backgroundColor:"yellow",
                  width:wp("60%"),
                  flexDirection:"row",
                  justifyContent:"space-between"
                }
                }>
                <TouchableOpacity
                 onPress={()=>this.setState({modalVisiblefeedback:!this.state.modalVisiblefeedback})}
                  style={{
                    borderWidth:1,
                    borderColor:'rgb(49,176,249)',
                    borderRadius:15,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "white",
                    width: wp("25%"),
                    height: hp("5%"),
                    shadowColor: 'rgb(49,176,249)',
                    shadowOffset: {
                        width: 0,
                        height: 3
                    },
                    shadowRadius: 5,
                    shadowOpacity: 0.6
                  }}

                >
           <Text style={{color:"rgb(49,176,249)",fontSize:18,fontWeight:"bold"}}>
            No
           </Text>
           </TouchableOpacity>
                <TouchableOpacity
                onPress={()=>
                  this.feedbackApi()
                }
                  style={{
                    borderWidth:1,
                    borderColor:'rgb(49,176,249)',
                    borderRadius:15,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "rgb(49,176,249)",
                    width: wp("25%"),
                    height: hp("5%"),
                    shadowColor: 'rgb(49,176,249)',
                    shadowOffset: {
                        width: 0,
                        height: 3
                    },
                    shadowRadius: 5,
                    shadowOpacity: 0.6
                  }}
           >
           <Text style={{
             color:"white",
             fontSize:18,fontWeight:"bold"
           }}>
           Yes
           </Text>
           </TouchableOpacity>
           </View>
          </View>
          </View>
          
        </Modal>
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
    Token:  state.AuthReducer.Token
  }
}


const mapDispatchToProps = dispatch => {
  return { actions: bindActionCreators({ SaveTokenAction }, dispatch) }
}

export default connect(mapStateToProps,
  mapDispatchToProps
)(SettingScreen);

const style = StyleSheet.create({
    container: {
      // zIndex:1,
       flex:1,
       //marginTop:wp('14%'),
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: "rgb( 247, 249, 251)"

    },
    cardView: {
        shadowOpacity: 0.4,
        shadowOffset: { width: 0.1, height: 0.1 },
        shadowRadius: 0.9,
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderWidth: 0.5, borderColor: 'lightgray',
        width: wp('95%'), 
        alignSelf:"center",
        // marginVertical: hp('2%'),
        // marginHorizontal: wp('3%'),
        marginVertical:hp('2%')
    }

})