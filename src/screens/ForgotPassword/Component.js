
import React, { Component } from 'react'; //Root Library
import { Platform, ImageBackground, TouchableOpacity, StyleSheet, View, Text, Image } from 'react-native'; //Root Components
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';//responsive Module
import Icons from "./icons";//Icons
//import Color from '../../Constants/globalColor';
import Constant from './constant';
import { color } from 'react-native-reanimated';
export const ForgotPasswordTextWithLogo = (props) => {
    let StandardSize = props.Size === 'medium' ? wp('6%') : wp('4%');
    return (
        <View
            style={{
                //flex:1,
                width: StandardSize * 15,
                height: StandardSize * 12,
                alignItems: 'center',
                justifyContent: 'space-around',
                // backgroundColor: 'red',
                // flexDirection: 'column'
            }}>
            <View style={[styles.ImageView]}>
                <Image
                    source={Icons.logo}
                    resizeMode='contain'
                />
            </View>

            <View style={[styles.TextView, { width: StandardSize * 12, }]}>
                <Text style={[styles.Text, { fontSize: StandardSize / 1.3, }]}>{Constant.forgotPasswordText}</Text>
                <Text style={[styles.Text, { fontSize: StandardSize / 1.3, }]}>{Constant.forgotPasswordText2}</Text>
                {/* <Text style={[styles.Text, { fontSize: StandardSize / 1.3, }]}>{Constant.forgotPasswordText3}</Text> */}
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    ImageView: {
        // backgroundColor: 'green',
           marginTop:wp('5%')
    },
    TextView: {
        // backgroundColor: 'cyan',
       flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
     
    },
    Text: {
        
        //color: Color.tertiary,
        textAlign: 'center',
        //marginVertical:wp('2%'),
        fontWeight:'100',
        color:'grey',
       
    },
    
})
