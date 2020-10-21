import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

export const UserProfileComponent = (props) => {
    return (
        <View style={{ justifyContent: 'space-between', borderBottomWidth: 2, borderColor: 'rgb(245,245,245)', flexDirection: 'row', width: wp('90%'), height: hp('8%'), marginHorizontal: wp('2%'), alignItems: 'center' }}>
            <View style={{ width: wp('34%'), }}>
                <Text style={{ fontWeight: '600', fontSize: 15 }}>{props.firstname}</Text>
            </View>
            <View style={{ width: wp('10%') }}>
                <Text>{props.colonIcon}</Text>
            </View>
            <View style={{ width: wp('35%'), }}>
                <Text style={{ textAlign: 'right' }}>{props.apiData}</Text>
            </View>
        </View>
    )
}
const style = StyleSheet.create({
    userNameStyle: {
        flexDirection: 'row',
        backgroundColor: 'red',
        width: wp('80%'),
        height: hp('15%')
    }

})
export default UserProfileComponent;

