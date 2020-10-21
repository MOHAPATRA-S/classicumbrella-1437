import React,{Component} from 'react'
import {Text,View,StyleSheet,Image} from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

 const CardComponent=(props)=>{

return(
    <View style={{ justifyContent: 'space-between', borderBottomWidth: 0.3 , 
    borderColor: 'rgb(245,245,245)', flexDirection: 'row', width: wp('90%'), backgroundColor:'#fff',
    height: hp('10%'), marginHorizontal: wp('2%'), alignItems: 'center',borderColor: 'lightgray' }}>

<View style={{ width: wp('15%')}}>
    <Image source={props.image} resizeMode='contain' style={{width:wp('8%'),height:hp('4%'),marginHorizontal:wp('2%')}}/>
 </View>
 <View style={{ width: wp('80%')}}>
    <Text>{props.text}</Text>
 </View>


</View>

)
}
export default CardComponent;