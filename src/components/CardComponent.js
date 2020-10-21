//Root Library
import React, { Component } from 'react';

//responsive Module
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

//Root Components
import {
    Platform, AsyncStorage, StyleSheet, Modal,
    SafeAreaView, View, Text, TouchableOpacity, Image, Dimensions, Alert, TouchableWithoutFeedback
} from 'react-native';
import UmbrellaImage from '../assets/images/umbrella_image.png'
import PhoneIcon from '../assets/images/phone_icon.png'
export const CardElement = (props) => {
    // let Size = props.size==="medium" ? '':''
    return (  
        
       
        <View style={styles.MainContainer}>
               <View style={{flexDirection:'column',marginTop:wp('27%'),marginLeft:wp('3%')}}>
                <Text  style={{ fontSize: 14, fontWeight: '700',}} >{props.name}</Text>
               
                <Text style={{ fontSize: 14, fontWeight: '700',marginTop:wp('2%')}}>{props.location}</Text>
            
                 
                <Text  style={{marginTop:wp('2%')}}>
                {props.pincode}</Text>
                <View style={{flexDirection:'row',alignItems:'center',marginTop:wp('2%')}} >  
                <Image    source={props.PhoneSource ? props.PhoneSource :''}/>
                <Text style={{marginLeft:wp('3%')}} >{props.phonenumber}</Text>
                </View>
               </View>
            <View style={[styles.DataContainer, {}]}> 
            <View style={[styles.UmbrellaImageView, {}]}>
                <Image
                     style={{height:100,width:50,}}
                    source={props.UmbrellaSource}
                    resizeMode='contain'
                />
            </View>      
                    <View style={styles.Detailview} >
                    <View style={[styles.ProductName, {}]}>
                        <Text style={styles.ProductNameStyle}>{props.productname}</Text>
                    </View>
                    <View style={[styles.ProductPrice, {}]}>
                        <Text style={{color:'silver',marginTop:wp('2%')}}>₹{props.productprice}</Text>
                    </View>
                    <View>
                        <Text style={{marginTop:wp('2%')}} >{props.productquantity}</Text>
                    </View>

                    <View>
                        <Text style={{marginTop:wp('2%')}} >{props.totalprice}</Text>
                    </View>
                    </View>
                   
                    </View>
            
            </View>
           
            
    )  
 }             
                   
               
        
    

const styles = StyleSheet.create({
    MainContainer: {
     alignItems: 'flex-start',
   
        height: 120,
        width: wp('90%'),
        backgroundColor: 'white',
        marginVertical: 6,
        flexDirection: 'column',
        borderRadius: 6,
        alignItems:'flex-start',
      
    justifyContent:'space-around',
    
    
        
    },
    DataContainer: {
        //flex: 10,
        marginLeft:wp('3%'),
       justifyContent:'flex-start',
       marginTop:wp('51%'),
        //backgroundColor: 'blue',
        flexDirection:'row',
         //paddingTop: 5,
         //flexDirection: 'row'
       
    },
    Detailview: {
         //sbackgroundColor: 'yellow',
         marginTop:wp('-15%'),
       
        flexDirection:'column',
         marginHorizontal: wp('5%'),
    },
    UmbrellaImageView: {
    //flex: 0.9,
       marginTop: wp('33%'),
        //  backgroundColor: 'red',
        //borderTopRightRadius: 8,
        //borderBottomRightRadius: 8,
        justifyContent: 'flex-end',
    
        
    },
    ProductNameStyle:{
        fontSize: 14, fontWeight: '700',
    }
});