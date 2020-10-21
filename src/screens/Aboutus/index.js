import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView, Platform, Image, TouchableOpacity, SafeAreaView, KeyboardAvoidingView } from 'react-native'
import { CustomTextInput } from '../../components/globalComponents/GlobalTextInput'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import ApiRequest from '../../services/webservice'
import HTML from 'react-native-render-html'
import NavigationIcons from '../../Router/NavigationIcons'
import { CustomHeader } from '../../components/globalComponents/Header'
export default class Aboutus extends Component {
    constructor(props) {
        super(props)
        this.state = {
            About: ''
        }
    }
    componentDidMount() {
        this.AboutApi()
    }
    AboutApi() {
        ApiRequest('', 'content/about-us', "GET")
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
                        this.setState({ About: resp.data.data.description })
                        break;
                    }


                    default: {
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
                            
                            backicon={true}goback={()=>this.props.navigation.goBack()} backicon={NavigationIcons.backicon} Title="About Us" />

                <ScrollView>
                <View style={{width:wp("90%"),marginTop: 15,alignSelf:"center",flex:1}}>
                <HTML html={this.state.About} />
            </View>
                   

                </ScrollView>
            </View>

        )
    }

}
const style = StyleSheet.create({
    container: {
        flex:1,
       
      
        justifyContent: 'center',
        alignItems: 'center',
     
    //    marginVertical:Platform.OS==='ios' ? wp('17%') :null,
        backgroundColor:"white"

    },
    headerView: {
        height: hp('20%')
    },
    PrivacyAndPolicyView: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        width: wp('90%'),


    },
    PrivacyAndPolicyText: {
        margin: 10,
        fontSize: 18,
        color: "grey"

    }
})