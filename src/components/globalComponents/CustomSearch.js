import React from 'react'

import {View,TextInput,StyleSheet,Image,Text}  from 'react-native'
import { widthPercentageToDP as wp,heightPercentageToDP as hp } from 'react-native-responsive-screen';



const SearchBar =(props) =>{

return (
     <View style={{marginVertical:wp('-4%')}}>
    <View style={styles.backgroundStyle}>
     <Image source={props.Searchicon} style={styles.iconstyle}/>
       <TextInput
       autoCorrect={false}
       {
...props
       }
       onChangeText={props.onChangeText}
       style={{width:wp('80%'),color:"black"}}
       placeholderTextColor="black"
           placeholder={props.placeholder}
       />
         
     </View>
     </View>

   
  
)

}

const styles=StyleSheet.create({
  backgroundStyle:{
 flexDirection:'row',
    backgroundColor:'white',
    width:wp('90%'),
    height:hp('7%'),
    borderRadius:30,
    marginHorizontal:15,
    marginVertical: wp('2%'),
    shadowColor: 'rgb(49,176,249)',
    shadowOffset: {
        width: 0,
        height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 0.6
    
  },
  iconstyle:{
    marginHorizontal:15,
      alignSelf:'center'
  }


})

export default SearchBar