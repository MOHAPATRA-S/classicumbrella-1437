import React, { Component } from 'react'
import {TouchableOpacity, Text, View, Image, StyleSheet } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

const CardComponent = (props) => {
    return (
        <TouchableOpacity 
        onPress={props.onPress}
        style={{
            // backgroundColor:"red",
            justifyContent: 'space-between',
            flexDirection:
                'row', width: wp('90%'), height: hp('6%'), marginHorizontal: wp('2%'), alignItems: 'center', marginVertical: hp('2%')
        }}>
            <View style={{ flexDirection: 'row', }}>
                <View style={{ height: hp('8%'), marginVertical: hp('1%') }}>
                    <Image
                        source={props.image}
                    >
                    </Image>
                </View>
                <View style={style.textView}>
                    <Text style={{ fontSize: 20 }}>
                        {props.text}
                    </Text>
                </View>

            </View>
        </TouchableOpacity>



    )
}
export default CardComponent;
const style = StyleSheet.create({

    textView: {
        marginHorizontal: wp('3%'),
        height: hp('7%'),
        width: wp('80%'),
        marginVertical: hp('1%'),
        borderBottomWidth: 2, borderColor: 'lightgrey',


    }
})