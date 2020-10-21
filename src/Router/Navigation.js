
import { Modal,View, Text, StyleSheet, ScrollView, Platform, Image, TouchableOpacity, SafeAreaView, KeyboardAvoidingView,Dimensions } from 'react-native'
import React, { Component,useState ,useEffect} from 'react';
import { store } from '..//redux/Store';
import { connect, } from 'react-redux';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator, } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer'
import { createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { CustomHeader, CustomHeader2 } from '../components/globalComponents/Header'
import Tutorial from '../screens/Tutorial/index'
import Login from "../screens/Login/index"
import Signup from "../screens/SignUp/index"
import TermandConditionScreen from '../screens/TermandCondition/index'
import Landing from '../screens/Landing/index'
import Forgotpassword from '../screens/ForgotPassword/index'
import OTP from '../screens/OTP/index'
import ResetPassword from '../screens/ResetPassword/index'
import HomeScreen from '../screens/Home/index'
import Category from '../screens/category/index'
import CategoryName from '../screens/category/CategoryName/index'
import Cart from '../screens/cart/index'
import Payment from '../screens/PaymentDescription/index'
import DeliveryAddress from '../screens/cart/Delivery Address/index'
import EditAddress from '../screens/address/index'
import AddNewAddress from '../screens/cart/addNewAddress/index'
import OrderReview from '../screens/OrderReview/index'
import SettingScreen from '../screens/settings/index'
import TabbarImage from '../assets/images/tabbar_image.png'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import UserProfile from "../screens/userProfile/index"
import RecieptHistory from "../screens/settings/receiptHistory/index"
import UploadReceipt from '../screens/settings/receiptHistory/uploadReceipt/index'
import Priavacypolicy from "../screens/privacypolicy/index"
import Termandcondition from "../screens/TermandCondition/index"
import Aboutus from "../screens/Aboutus/index"
import FAQ from "../screens/settings/staticContect/Faq"
import MyOrderHistory from '../screens/settings/OrderHistory/index'
import ProductEnquiry from '../screens/settings/productEnquiry/index'
import ProductName from "../screens/category/productname/index"
// import ProductEnquiry from "../screens/settings/productEnquiry/index"
//Components
import ChangePassword from "../screens/Changepassword/index"
import NavIcons, { IconComponent } from './NavigationIcons';
import OtpVerify from "../screens/otpverify/index"
import  Notification from "../screens/Notifiaction/index"
import editprofile from "../screens/userProfile/editprofile"
import AsyncStorage from "@react-native-community/async-storage"
// import { TouchableOpacity } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get("window");


const Authstack = createStackNavigator({

   
    Login: {
        screen: Login,
        navigationOptions: {

            header: null
        }

    },
    Signup: {
        screen: Signup,
        navigationOptions: ({ navigation }, props) => ({

            header: <CustomHeader Size={"medium"} navigation={navigation} {...props} backicon={NavIcons.backicon} Title="Sign Up"backicon={true}goback={()=>navigation.goBack()} />

        })
    },

    TermandConditionScreen: {
        screen: TermandConditionScreen,
        navigationOptions: ({ navigation }, props) => ({

            header: <CustomHeader Size={"medium"} navigation={navigation} {...props} backicon={NavIcons.backicon} Title="Terms and Conditions"backicon={true}goback={()=>navigation.goBack()} />

        })
    },
    Forgotpassword: {
        screen: Forgotpassword,
        navigationOptions: ({ navigation }, props) => ({

            header: <CustomHeader Size={"medium"} navigation={navigation} {...props} backicon={NavIcons.backicon} Title="Forgot Password"backicon={true}goback={()=>navigation.goBack()} />


        })

    },
    OTP: {
        screen: OTP,
        navigationOptions: ({ navigation }, props) => ({

            header: <CustomHeader Size={"medium"} navigation={navigation} {...props} backicon={NavIcons.backicon} Title="OTP"backicon={true}goback={()=>navigation.goBack()} />

        })

    },
    ResetPassword: {
        screen: ResetPassword,
        navigationOptions: ({ navigation }, props) => ({

            header: <CustomHeader Size={"medium"} navigation={navigation} {...props} backicon={NavIcons.backicon} Title="Reset Password"backicon={true}goback={()=>navigation.goBack()} />

        })
    },
    OtpVerify: {
        screen: OtpVerify,
        navigationOptions: ({ navigation }, props) => ({

            header: <CustomHeader Size={"medium"} navigation={navigation} {...props} backicon={NavIcons.backicon} Title="OTP"backicon={true}goback={()=>navigation.goBack()} />

        })

    },





},

    {
        defaultNavigationOptions: ({ navigation }) => ({
            headerStyle: {

            },
        }),

    },

    )


const Homestack = createStackNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions: ({ navigation }, props) => ({

            header: null
            
        

        })
    },


    EditAddress: {
        screen: EditAddress,
        navigationOptions: ({ navigation }, props) => ({

            header:null
            //  <CustomHeader Size={"medium"} navigation={navigation} {...props}  Title="Edit Address"backicon={true}goback={()=>navigation.goBack()} />

                
        })
    },
    
    AddressScreen: {
        screen: AddNewAddress,
        navigationOptions: ({ navigation }, props) => ({

            header: null
            // <CustomHeader Size={"medium"} navigation={navigation} {...props} backicon={true}goback={()=>navigation.goBack()} Title="Edit Address" />

                
        })
    },
    ProductEnquiry: {
        screen: ProductEnquiry,
        navigationOptions: ({ navigation }, props) => ({

            header: null
            // <CustomHeader Size={"medium"} navigation={navigation}backicon={true}goback={()=>navigation.goBack()} {...props} backicon={NavIcons.backicon} Title="Product Enquiry"/>

        })

    },
    Notification: {
        screen:  Notification,
        navigationOptions: ({ navigation }, props) => ({

            header: null
            // <CustomHeader Size={"medium"} navigation={navigation} {...props} backicon={true}goback={()=>navigation.goBack()} Title="Notification" />
           
        })
    },
}, 
);


const CategoryStack = createStackNavigator({
    Category: {
        screen: Category,
        navigationOptions: ({ navigation }, props) => ({
           
            header: null
            

        })
    },




    CategoryName: {
        screen: CategoryName,
        navigationOptions: ({ navigation }, props) => ({
            gesturesEnabled: false,
            header: null


        })
    },
    Notification: {
        screen:  Notification,
        navigationOptions: ({ navigation }, props) => ({

            header: null
            // <CustomHeader Size={"medium"} navigation={navigation} {...props} backicon={true}goback={()=>navigation.goBack()} Title="Notification" />

                        
        })
    },
    ProductName: {
        screen:  ProductName,
        navigationOptions: ({ navigation }, props) => ({

            header: null
         
        })
    },


},
);

const CartStack = createStackNavigator({
    Cart: {
        screen: Cart,
        navigationOptions: ({ navigation }, props) => ({
header:null
            // header: <CustomHeader2
            
            // menuonPress={() =>
            //     navigation.openDrawer()
            // }
            // bellicononpress={()=>navigation.navigate("Notification")}
            // editonPress={() =>  navigation.navigate("EditAddress")}
            // Size={"medium"} navigation={navigation} {...props}
            //  bellicon={NavIcons.bellicon} menuicon={NavIcons.menuicon} location={true} location={true} Title="My Cart" />,

        })
    },
    EditAddress: {
        screen: EditAddress,
        navigationOptions: ({ navigation }, props) => ({

            header:null
            //  <CustomHeader Size={"medium"} navigation={navigation} {...props} backicon={true}goback={()=>navigation.goBack()} Title="Edit Address" />
           
        })
    },
    AddressScreen: {
        screen: AddNewAddress,
        navigationOptions: ({ navigation }, props) => ({

            header: null
            
            // <CustomHeader Size={"medium"} navigation={navigation} {...props} backicon={true}goback={()=>navigation.goBack()} Title="Add Address" />
          
        })
    },



    DeliveryAddress: {
        screen: DeliveryAddress,
        navigationOptions: ({ navigation }, props) => ({

            header: null
            // <CustomHeader Size={"medium"} navigation={navigation} {...props} backicon={true}goback={()=>navigation.goBack()}backicon={NavIcons.backicon} Title="Choose Delivery Address" />






        })
    },

    Notification: {
        screen:  Notification,
        navigationOptions: ({ navigation }, props) => ({

            header:null
            //  <CustomHeader Size={"medium"} navigation={navigation} {...props}backicon={true}goback={()=>navigation.goBack()} Title="Notification" />

                      
        })
    },


    OrderReview: {
        screen: OrderReview,
        navigationOptions: ({ navigation }, props) => ({

            header:null
            //  <CustomHeader Size={"medium"}
            //     navigation={navigation}
            //     backicon={true}
            //     goback={() => navigation.goBack()}
            //     {...props}
            //     backicon={NavIcons.backicon}
            //     Title="OrderReview" />






        })
    },
    RecieptHistorycart: {
        screen: RecieptHistory,
      
        navigationOptions: ({ navigation }, props) => ({

            header:
            null
            // <CustomHeader2 Size={"medium"} navigation={navigation}
            // menuonPress={() =>
            //     navigation.openDrawer()
            // }
            // bellicononpress={()=>navigation.navigate("Notification")}
            // {...props} bellicon={NavIcons.bellicon} menuicon={NavIcons.menuicon} Title="My Reciept History" />






        })
    },

},
);

const SettingStack = createStackNavigator({

    SettingScreen: {
        screen: SettingScreen,
        navigationOptions: ({ navigation }, props) => ({

            header: null
            // <CustomHeader2 Size={"medium"} navigation={navigation}
            // menuonPress={() =>
            //     navigation.openDrawer()
            // }
            // bellicononpress={()=>navigation.navigate("Notification")}
            // {...props} bellicon={NavIcons.bellicon} menuicon={NavIcons.menuicon} Title="Settings" />






        })
    },
    Notification: {
        screen:  Notification,
        navigationOptions: ({ navigation }, props) => ({

            header: null
            // <CustomHeader Size={"medium"} navigation={navigation}backicon={true}goback={()=> navigation.goBack()} {...props} backicon={true} Title="Notification" />
        
        })
    },




    UserProfile: {
        screen: UserProfile,
        navigationOptions: ({ navigation }, props) => ({

            header:null
                // <CustomHeader Size={"medium"}
                //     navigation={navigation} {...props}
                //     editimage={NavIcons.editicon}
                //     backicon={NavIcons.backicon}
                //     EditOnpress={()=>navigation.navigate("editprofile")}
                //     bellicon={NavIcons.bellicon}
                //     Bellicon={true}
                //     backicon={true}goback={()=>navigation.goBack()}
                //     bellnotificationsOnpress={()=>navigation.navigate("Notification")}
                //     Title="Profile" />






        })
    },
    editprofile:{
        screen: editprofile,
        navigationOptions: ({ navigation }, props) => ({

            header:null
                // <CustomHeader Size={"medium"}
                //     navigation={navigation} {...props}
                //     // editimage={NavIcons.editicon}
                //     backicon={NavIcons.backicon}
                //     backicon={true}goback={()=>navigation.goBack()}
                //     EditOnpress={()=>props.navigations.navigate("editprofile")}
                //     Title="Edit Profile" />






        })
    },









    UploadReceipt: {
        screen: UploadReceipt,
       
        navigationOptions: ({ navigation }, props) => ({

        header: null
        
        // <CustomHeader Size={"medium"} navigation={navigation} {...props} backicon={true}goback={()=> navigation.goBack()}Bellicon={NavIcons.bellicon} backicon={NavIcons.backicon} Title="Upload Receipt"/>







        })
    },

    RecieptHistory: {
        screen: RecieptHistory,
       
        navigationOptions: ({ navigation }, props) => ({

            header: null
            // <CustomHeader2 Size={"medium"} navigation={navigation}
            // menuonPress={() =>
            //     navigation.openDrawer()
            // }
            // bellicononpress={()=>navigation.navigate("Notification")}
            // {...props} bellicon={NavIcons.bellicon} menuicon={NavIcons.menuicon} Title="My Reciept History" />






        })
    },
    Payment: {
        screen: Payment,
    
        navigationOptions: ({ navigation }, props) => ({

            header:null 
            // <CustomHeader2 Size={"medium"} navigation={navigation}
            // menuonPress={() =>
            //     navigation.openDrawer()
            // }
            // bellicononpress={()=>navigation.navigate("Notification")}
            // {...props} bellicon={NavIcons.bellicon} menuicon={NavIcons.menuicon} Title="Payment Details"/>






        })
    },





    Termandcondition: {
        screen: Termandcondition,
        navigationOptions: ({ navigation }, props) => ({

            header: null
            // <CustomHeader Size={"medium"} navigation={navigation} {...props}backicon={true}goback={()=>navigation.goBack()} backicon={NavIcons.backicon} Title="Terms and Conditions" />






        })
    },


    Priavacypolicy: {
        screen: Priavacypolicy,
        navigationOptions: ({ navigation }, props) => ({

            header:null
            //  <CustomHeader Size={"medium"} navigation={navigation} {...props}backicon={true}goback={()=>navigation.goBack()} backicon={NavIcons.backicon} Title="Privacy Policy" />






        })
    },


    Aboutus: {
        screen: Aboutus,
        navigationOptions: ({ navigation }, props) => ({

            header: null
            // <CustomHeader Size={"medium"} navigation={navigation} {...props}backicon={true}goback={()=>navigation.goBack()} backicon={NavIcons.backicon} Title="About Us" />






        })
    },


    ChangePassword: {
        screen: ChangePassword,
        navigationOptions: ({ navigation }, props) => ({

            header:null
            
            // <CustomHeader Size={"medium"} navigation={navigation} {...props} backicon={true}goback={()=>navigation.goBack()}backicon={NavIcons.backicon} Title="Change Password" />






        })
    },

    FAQ: {
        screen: FAQ,
        navigationOptions: ({ navigation }, props) => ({

            header: null
            // <CustomHeader Size={"medium"} navigation={navigation} backicon={true}goback={()=>navigation.goBack()}{...props} backicon={NavIcons.backicon} Title="FAQ's" />






        })
    },
    MyOrderHistory: {
        screen: MyOrderHistory,
        navigationOptions: ({ navigation }, props) => ({

            header:null
            //  <CustomHeader2 Size={"medium"} navigation={navigation}
            // menuonPress={() =>
            //     navigation.openDrawer()
            // }
            // bellicononpress={()=>navigation.navigate("Notification")}
            // {...props} bellicon={NavIcons.bellicon} menuicon={NavIcons.menuicon} Title="My Order History"/>






        })
        
    },
    ProductEnquiry: {
        screen: ProductEnquiry,
        navigationOptions: ({ navigation }, props) => ({

            header: null
            // <CustomHeader Size={"medium"} navigation={navigation}backicon={true}goback={()=>navigation.goBack()} {...props} backicon={NavIcons.backicon} Title="Product Enquiry"/>

        })

    },

},

);
SettingStack.navigationOptions = ({ navigation }) => {
   
    let tabBarVisible = true;
    for (let i = 0; i < navigation.state.routes.length; i++) {
        if (navigation.state.routes[i].routeName == "Termandcondition" || navigation.state.routes[i].routeName == "Privacypolicy" || navigation.state.routes[i].routeName == "ChangePassword" || navigation.state.routes[i].routeName == "Aboutus" || navigation.state.routes[i].routeName == "FAQ") {
            tabBarVisible = false;
        }
    }
    return {
        tabBarVisible
    };
}

const bottomTabNavigator = createBottomTabNavigator({

    HomeSSack: {
        screen: Homestack,
        navigationOptions: ({ navigation }) => ({
            tabBarLabel: "Home",
            header: null,
            gesturesEnabled: false,
            // tabBarLabel: "Account",
            tabBarIcon: ({ focused, tintColor }) => (

                <IconComponent source={focused ? NavIcons.tab1Icon : NavIcons.tab1iconSel} />

            )
        })
    },


    CategoryScreen: {
        screen: CategoryStack,
        navigationOptions: ({ navigation }) => ({
            tabBarLabel: "Category",
            header: null,
            gesturesEnabled: false,

            tabBarIcon: ({ focused, tintColor }) => (
                <IconComponent source={focused ? NavIcons.tab2Icon : NavIcons.tab2iconSel} />

            )
        })
    },

    CartScreen: {
        screen: CartStack,
        navigationOptions: ({ navigation }) => ({
            tabBarLabel: "MyCart",
            header: null,
            gesturesEnabled: false,

            tabBarIcon: ({ focused, tintColor }) => (
                <IconComponent source={focused ? NavIcons.tab3Icon : NavIcons.tab3iconSel} />

            )
        })
    },
    SettingScreen: {
        screen: SettingStack,
        navigationOptions: ({ navigation }) => ({
            tabBarLabel: "Settings",
            header: null,
            gesturesEnabled: false,

            tabBarIcon: ({ focused, tintColor }) => (
                <IconComponent source={focused ? NavIcons.tab4Icon : NavIcons.tab4iconSel} />

            )
        })
    }




},
    {
        
        tabBarOptions: {
            activeTintColor: 'white',
            inactiveTintColor: 'rgb(187,231,255)',
            showIcon: true,
            showLabel: true,
            style: {
                backgroundColor: 'rgb(44,161,225)',


                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
            }
        },
    }

)

const NewStack = createStackNavigator({
    HomeStack: {
        screen: bottomTabNavigator,
        navigationOptions: {
            header: null
        }
    },
    Address: {
        screen: AddNewAddress,
      


    }

})


const DrawerStack = createDrawerNavigator({
    HomeScreen: {
        screen: NewStack,
        // navigationOptions: (props) => ({
        //     header: null
        // })
    },
    Address: {
        screen: AddNewAddress,
    }

},
    {
        drawerWidth: width-50,
        contentComponent:(props)=>{
            const currentState = store.getState();
          
            const image =currentState.AuthReducer.Userdetails.image
            // const environment = currentState.authReducer.environment;
        
            // LogoutApi=()=>{
               

            //     AsyncStorage.getItem("Token").then(resp => {
            //         console.log("Token",JSON.parse(resp))
                      
                     
            //       })
            
            //     ApiRequest("", "user-management/login", "POST")
            //       .then(async resp => {
                   
            //         switch (resp.status) {
            //           case (900): {
            //             this.setState({ isLoading: false })
            //             setTimeout(() => {
            //               Alert.alert(
            //                 '',
            //                 "Please check your internet connection",
            //                 [
            //                   { text: 'OK', onPress: () => console.log('OK Pressed') },
            //                 ],
            //                 { cancelable: false },
            //               );
            //             }, 200);
            //             break;
            //           }
            //           case (200): {
            //             // AsyncStorage.setItem("Token",JSON.stringify(resp.data.token))
            //             // this.props.actions.SaveTokenAction(resp.data.token)
            //             // this.setState({isLoading:false})
            //             setTimeout(() => {
            //               Alert.alert(
            //                 "",
            //                 resp.data.response_message,
            //                 [
            //                   {
            //                     text: 'OK', onPress: () => {
                                
            //                        this.props.navigation.navigate("Login")
                                   
            
            //                     }
            //                   },
            //                 ],
            //                 { cancelable: false },
            //               );
            
            //             }, 500);
            //             break;
            //           }
            
            
            //           default: {
            //             this.setState({isLoading:false})
            //             setTimeout(() => {
            //               Alert.alert(
            //                 '',
            //                 resp.data.response_message,
            //                 [
            //                   { text: 'OK', onPress: () => console.log('OK Pressed') },
            //                 ],
            //                 { cancelable: false },
            //               );
            //             }, 200);
            
            //           }
            //             break;
            //         }
            
            //       })
                        
            // }
                    const [isModalVisible,setModal]= useState(false) ;
                  
                   
            return(
                <ScrollView  showsVerticalScrollIndicator={false}>
                    <View style={{justifyContent:"center",alignItems:"center",height:height/3,backgroundColor:'#23a7fa',width:width-50}}>
                         <Image
                        source={image?{uri:image}:NavIcons.Profile}
                        //  source={{uri:props.image}}
                        //  :NavIcons.Profile}
                        // resizeMode='contain'
                  style={{ height:160,width:160,borderRadius:80 }}
                         />
                            
                    </View>
                    <TouchableOpacity 
                    onPress={()=>{props.navigation.navigate("Home"),props.navigation.closeDrawer()}}
                    style={{flexDirection:"row",height:50,width:width-50,alignItems:"center"}}>
                    <Image
                    style={{marginLeft:20,}}
                         source={NavIcons.Home}
                         />
                                
                                <Text style={{fontSize:20,marginLeft:15,}}>Home</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                               onPress={()=>{props.navigation.navigate("Category"),props.navigation.closeDrawer()}}
                            style={{alignItems:"center",flexDirection:"row",height:50,width:width-100}}>
                            <Image
                              style={{marginLeft:20,}}
                         source={NavIcons.shopbycategory}
                         />
                                <Text style={{fontSize:20,marginLeft:15,}}>Shop By category</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                              onPress={()=>{props.navigation.navigate("Cart"),props.navigation.closeDrawer()}}
                            style={{alignItems:"center",flexDirection:"row",height:50,width:width-100}}>
                            <Image
                              style={{marginLeft:20,}}
                         source={NavIcons.mycart}
                         />
                                <Text style={{fontSize:20,marginLeft:15,}}>My cart</Text>
                                </TouchableOpacity>

                                <TouchableOpacity  onPress={()=>{props.navigation.navigate("DeliveryAddress"),props.navigation.closeDrawer()}}
                            style={{alignItems:"center",flexDirection:"row",height:50,width:width-100}}>
                           <Image
                             style={{marginLeft:20,}}
                         source={NavIcons.mycart}
                         />
                                <Text style={{fontSize:20,marginLeft:15,}}>Manage Address</Text>
                                </TouchableOpacity>


                                <TouchableOpacity 
                                  onPress={()=>{props.navigation.navigate("SettingScreen"),props.navigation.closeDrawer()}}
                                
                                style={{alignItems:"center",flexDirection:"row",height:50,width:width-100}}>
                                <Image
                                  style={{marginLeft:20,}}
                         source={NavIcons.setting}
                         />
                                <Text style={{fontSize:20,marginLeft:15,}}>Settings</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                               onPress={()=>{props.navigation.navigate("RecieptHistory"),props.navigation.closeDrawer()}}
                            
                            style={{alignItems:"center",flexDirection:"row",height:50,width:width-100}}>
                                <Image
                                  style={{marginLeft:20,}}
                         source={NavIcons.receipthistory}
                         />
                                <Text style={{fontSize:20,marginLeft:15,}}>My receipt history</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                               onPress={()=>{props.navigation.navigate("Payment"),props.navigation.closeDrawer()}}
                            
                            style={{alignItems:"center",flexDirection:"row",height:50,width:width-100}}>
                                <Image
                                  style={{marginLeft:20,}}
                         source={NavIcons.paymentdescription}
                         />
                                <Text style={{fontSize:20,marginLeft:15,}}>Payment Description </Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                               onPress={()=>{props.navigation.navigate("MyOrderHistory"),props.navigation.closeDrawer()}}
                            style={{alignItems:"center",flexDirection:"row",height:50,width:width-100}}>
                                <Image
                                  style={{marginLeft:20,}}
                         source={NavIcons.orderhistory}
                         />
                                <Text style={{fontSize:20,marginLeft:15,}}>My Order History</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                               onPress={()=>{props.navigation.navigate("ProductEnquiry",{page:"menu"}),props.navigation.closeDrawer()}}
                            style={{alignItems:"center",flexDirection:"row",height:50,width:width-100}}>
                                <Image
                                  style={{marginLeft:20,}}
                         source={NavIcons.Productenquiry}
                         />
                                <Text style={{fontSize:20,marginLeft:15,}}>Product Enquiry</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>{
                                
                             
                                
                                setModal(true)}}
                            //  onPress={()=>{props.navigation.navigate("SettingScreen"),props.navigation.closeDrawer()}}
                            
                            style={{alignItems:"center",flexDirection:"row",height:50,width:width-100}}>
                                <Image
                                   style={{marginLeft:20,}}
                         source={NavIcons.logout}
                         />
                                <Text style={{fontSize:20,marginLeft:15,}}>Logout</Text>
                            </TouchableOpacity>
                            <View style={{alignItems:"center",flex:1,  justifyContent:"center"}}>
        <Modal
          transparent={true}
          visible={isModalVisible}
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
                 onPress={()=>{setModal(false)}}
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
               
                onPress={()=> {setModal(false), 
                    AsyncStorage.removeItem("Token")
                    props.navigation.navigate("Login")}
                //   this.setState({modalVisible:!this.state.modalVisible},()=>{
                //       this.props.navigation.navigate("Login")
                //   })
                  
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
                </ScrollView>
            )
        }
        // contentComponent: (props) => {
        //     const { navigation } = props
       
        //     return (
        //         <View style={{flex:1,justifyContent:'center',alignItems:'center'}} > 
        //     <TouchableOpacity onPress={() => {
        //                 navigation.closeDrawer(),
        //                     navigation.navigate('AddressStack')
        //             }}
        //                 style={{ width: width - 50, height: 50, borderBottomColor: 'white', flexDirection: 'row', borderBottomWidth: 0.7, alignItems: 'center' }}>
        //                 <Text style={{ fontSize: 18, fontWeight: '700', color: 'white' }} >Home</Text>
        //             </TouchableOpacity>
        //             </View>

        //     )
        // }
    }
    )

    const LandingStack = createStackNavigator({
        Tutorial: {
            screen: Tutorial,
            navigationOptions: {
    
                header: null
            }
        },
        Landing: {
            screen: Landing,
            navigationOptions: {
    
                header: null
            }
        },
    })
    
    class ValidLogin extends React.Component {
        constructor(props) {
          super(props);
        }
        componentDidMount() {
          this.check()
        //   this.getuserDetails()
      
        }
        getuserDetails(){

           
                ApiRequest('', "user-management/profile", "GET",`JWT ${this.props.isLoading}`)
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
                       
                        // this.setState({ firstname: resp.data.user_details.name })
                        // this.setState({ lastname: resp.data.user_details.company_name })
                        // this.setState({ phoneNumber: resp.data.user_details.mobile_no })
                        // this.setState({ gstno: resp.data.user_details.gst_no })
                        // this.setState({ email: resp.data.user_details.email })
                        // this.setState({ postcode: resp.data.user_details.user_address.postal_code })
                        // this.setState({ address: resp.data.user_details.user_address.address })
        
                          break;
        
                       
                      }
            
                      default: {
                     
                      }
                        break;
                    }
            
                  })
              
    
        

        }
        check() {

            AsyncStorage.getItem("Token").then(resp => {
            
                if (resp != null) {
                    this.props.navigation.navigate('Drawer')
                }
                else {
                    this.props.navigation.navigate('Tutorial')
                }
            })
      
         
      
      
        }
        render() {
          return (
            <View>
            </View>
          );
        }
      }

 const Switchnavigator = createSwitchNavigator({
    ValidLogin:ValidLogin,
    landing:{
        screen:LandingStack
    },
   
    Auth: {
        screen: Authstack
    },
    Drawer: {
        screen: DrawerStack,
        // navigationOptions:({navigation})=>({
        //   header:null
        // })
    },
    

}, {
    navigationOptions: {
        gesturesEnabled: false,
    }
})

const CommonNavigator = createAppContainer(Switchnavigator);
const mapStateToProps = state => {
 
    return {
        environment: state.AuthReducer.Userdetails.image
    }
  }
  
  
 
  export default connect(mapStateToProps
  
  )(CommonNavigator);


// export default createAppContainer(CommonNavigator);