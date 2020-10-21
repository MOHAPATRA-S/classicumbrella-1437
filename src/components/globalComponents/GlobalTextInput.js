import React,{Component} from 'react'
import {Text,View,StyleSheet,Dimensions,TextInput} from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

const { width, height } = Dimensions.get('window')
export const CustomTextInput = (props) => {
    return (
        <View style={[styles.TextInputMainContainer, props.InputFieldMainContainer]}>
            <TextInput

                style={[styles.textInputStyle, props.textInputStyle]}
                placeholder={props.MyPlaceholder}
                placeholderTextColor ="rgb(181 ,193, 201)"
                value={props.value}
                onChangeText={props.onChangeText}
                secureTextEntry={props.secureTextEntry}
                keyboardType={props.keyboardType}
                ref={props.InputRef}
                onSubmitEditing={props.onSubmitEditing}
                maxLength={props.maxLength}
                editable={props.editable}
                returnKeyType={props.returnKeyType}
                multiline={props.multiline}
                keyboardType={props.keyboardType}
            />
            <View 
            style={[styles.ErrorView, props.MainContainer]}
            >
           <Text
           numberOfLines={2}
            style={[styles.ErrorText, props.ErrorText]}
           >
           {props.ErrorText}
           </Text>
          
           </View>
        </View>
    )
}
const styles = StyleSheet.create({
//     TextInputMainContainer: {
//         width: width,
//         width:wp("83%"),
//         height:hp("8%"),
//         borderRadius:20,
//         borderWidth:1,
//         borderColor:'silver',
//  shadowColor:'gray'
//     },
    textInputStyle: {
        alignSelf: "center",
        width: wp("83%"),
        height: hp("8%"),
        borderWidth:1,
        alignItems: "baseline",
        //justifyContent: "flex-end",
        borderRadius:25,
        borderColor:'rgb(222,231,236)',
        backgroundColor:'white'   ,
        color:"black"    
    },
    ErrorView:{
        alignSelf:"center", 
        width: wp("80%"),
         height: hp("3%"),
         
        //  backgroundColor:'yellow'

    },
    ErrorText:{
        color: "red",
    },
    ErrorText2:{
        color: "red",
    },
    })