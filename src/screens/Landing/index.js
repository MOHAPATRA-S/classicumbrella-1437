import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Platform,
    Image,
    SafeAreaView,
    TouchableOpacity
} from 'react-native'
import Icons from './icon'
import { SubmitButton } from '../../components/globalComponents/Button'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
export default class LandingScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }

    }

    render() {
        return (
            <View style={style.container}>
                <SafeAreaView>
                    {/* <ScrollView showsVerticalScrollIndicator={false}> */}
                        <View style={style.ImageStyle}>
                            <Image
                            resizeMode="contain"
                                style={{}}
                                source={Icons.landing_image}
                            />
                        </View>

                        <SubmitButton

                            // submitOnpress={() =>this.this.trogglebutton()}
                            //isLoading={this.state.enableButton}
                            Size={"medium"}
                            ButtonName="S I G N  I N"
                        submitOnpress={() => this.props.navigation.navigate("Login")}
                        />


                        <SubmitButton
                            MainButtonContainer={{
                                backgroundColor: "white",
                                borderColor: "rgb(49,176,249)",
                                borderWidth: 1,
                                shadowColor: 'rgb(49,176,249)',
                                shadowOffset: {
                                    width: 0,
                                    height: 3
                                },
                                shadowRadius: 5,
                                shadowOpacity: 0.6
                            }}
                            ButtonText={{ color: "rgb(49,176,249)" }}
                            //isLoading={this.state.enableButton}
                            Size={"medium"}
                            ButtonName="S I G N  U P"
                        submitOnpress={() => this.props.navigation.navigate("Signup")}
                        />

                    {/* </ScrollView> */}
                </SafeAreaView>
            </View>
        )
    }
}

const style = StyleSheet.create({
    container: {

        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    buttonContainer: {

        marginVertical: hp('4%')
    },
    ImageStyle: {
        height: hp('60%'),
        width: wp("100%"),
        alignItems:"center",
        justifyContent:"center"

    },
    buttonView: {
        width: wp('83%'),
        //  backgroundColor:'red',
        height: hp('9%'),
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginVertical: hp('1%'),


    },
    SignUpButtonView: {
        width: wp('83%'),
        // backgroundColor:'red',
        height: hp('9%'),
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',


    },
    SignupButton: {
        height: hp('7%'),
        backgroundColor: '#ffffff',
        width: wp("83%"),
        borderRadius: 20,
        borderColor: '#23a7fa',
        borderWidth: 1
    },
    SignInButton: {
        height: hp('7%'),
        backgroundColor: '#23a7fa',
        width: wp("83%"),
        borderRadius: 20,

    },
    SignInButtontext: {
        textAlign: 'center',
        fontSize: 20,
        color: 'white',
        paddingTop: hp('1%')
    },
    SignUpButtonText: {
        textAlign: 'center',
        fontSize: 20,
        paddingTop: hp('1%'),
        color: '#23a7fa',


    }
})