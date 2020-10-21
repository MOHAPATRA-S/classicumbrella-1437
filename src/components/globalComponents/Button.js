import React from 'react'

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    Image
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


export const SubmitButton = (props) =>{
    let standardSize = props.Size === "medium" ? wp('83%') : props.Size === "small" ? wp('60%') : wp('50%')
    return(
      <TouchableOpacity
      disabled={props.disabled}
          onPress={props.submitOnpress}
         style={[styles.MainButtonContainer,
            {
                height: standardSize ? standardSize / 5.4 : wp('12%'),
                width: standardSize ? standardSize : wp('72%'),
               
                
            },props.MainButtonContainer
            ]}
            >

            <Text style={[styles.ButtonText,
                {
                    fontSize: standardSize ? standardSize / 15: wp('6%'),
                },props.ButtonText
                ]}>
                    {props.ButtonName ? props.ButtonName : 'SUBMIT'}
                </Text>
                </TouchableOpacity>

      

    )
}



export const SkipButton = (props) =>{
    let standardSize = props.Size === "medium" ? wp('80%') : props.Size === "small" ? wp('60%') : wp('50%')
    return(
      <TouchableOpacity
          onPress={props.submitOnpress}
         style={[styles.MainButtonContainer,
            {
                height: standardSize ? standardSize / 5.4 : wp('12%'),
                width: standardSize ? standardSize : wp('72%'),
               
                
            },
            ]}
            >

            <Text style={[styles.ButtonText,
                {
                    fontSize: standardSize ? standardSize / 15 : wp('2%'),
                },
                ]}>
                    {props.ButtonName ? props.ButtonName : 'SUBMIT'}
                </Text>
                </TouchableOpacity>

      

    )
}


export const UpdateButton = (props) =>{
    let standardSize = props.Size === "medium" ? wp('35%') : props.Size === "small" ? wp('60%') : wp('50%')
    return(
      <TouchableOpacity
          onPress={props.submitOnpress}
         style={[styles.MainButtonContainer,
            {
                height:  wp('12%'),
                width:  wp('30%'),
               
                
            },
            ]}
            >

            <Text style={[styles.ButtonText,
                {
                    fontSize: wp('4%'),
                },
                ]}>
                    {props.ButtonName ? props.ButtonName : 'SUBMIT'}
                </Text>
                </TouchableOpacity>

      

    )
}

export const CancelButton = (props) =>{
    let standardSize = props.Size === "medium" ? wp('35%') : props.Size === "small" ? wp('60%') : wp('50%')
    return(
      <TouchableOpacity
          onPress={props.submitOnpress}
         style={[styles.MainButtonContainer,props.MainButtonContainer
           
            ]}
            >

            <Text style={[styles.ButtonText,
                {
                    fontSize: wp('4%'),
                },
                ]}>
                    {props.ButtonName ? props.ButtonName : 'SUBMIT'}
                </Text>
                </TouchableOpacity>

      

    )
}

// export const GotoReceiptHistory = (props) =>{
//     let standardSize = props.Size === "medium" ? wp('35%') : props.Size === "small" ? wp('60%') : wp('50%')
//     return(
//       <TouchableOpacity
//           onPress={props.submitOnpress}
//          style={[styles.MainButtonContainer,
//             {
//                 height:  wp('14%'),
//                 width:  wp('74%'),
               
                
//             },
//             ]}
//             >

//             <Text style={[styles.ButtonText,
//                 {
//                     fontSize: wp('5.6%'),
//                 },
//                 ]}>
//                     {props.ButtonName ? props.ButtonName : 'SUBMIT'}
//                 </Text>
//                 </TouchableOpacity>

      

//     )
// }



const styles = StyleSheet.create({

    MainButtonContainer: {
        height:  wp('12%'),
        width:  wp('30%'),
        backgroundColor: 'rgb(49,176,249)',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        marginVertical: wp('5%'),
        alignSelf: 'center',
        // bottom:2
    },

    ButtonText: {
    
        fontWeight: '700',
        color:'#ffffff',
      
    },


})