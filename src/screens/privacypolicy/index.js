import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView, Platform, Image, TouchableOpacity, SafeAreaView, KeyboardAvoidingView } from 'react-native'
import { CustomTextInput } from '../../components/globalComponents/GlobalTextInput'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

import ApiRequest from '../../services/webservice'
import HTML from 'react-native-render-html'
import { CustomHeader } from '../../components/globalComponents/Header'
import NavigationIcons from '../../Router/NavigationIcons'
// import CustomHeader from '../../components/globalComponents/Header'
// import Icon from '../../assets/Icon'
export default class Priavacypolicy extends Component {
    constructor(props) {
        super(props)
        this.state = {
              
            Privacy:''
        }
    }


    componentDidMount(){


        this.AboutApi()
        
    
    }
    
    AboutApi(){
    
    
        ApiRequest('', 'content/privacy-policy', "GET")
        .then(async resp => {
       
          this.setState({Privacy: resp.data.description})
          // switch (resp.status) {
          //   case (900): {
          //     this.setState({ isLoading: false })
          //     setTimeout(() => {
          //       Alert.alert(
          //         '',
          //         "Please check your internet connection",
          //         [
          //           { text: 'OK', onPress: () => console.log('OK Pressed') },
          //         ],
          //         { cancelable: false },
          //       );
          //     }, 200);
          //     break;
          //   }
          //   case (200): {
          //     this.props.actions.SaveTokenAction(resp.data.token)
          //     setTimeout(() => {
          //       Alert.alert(
          //         "",
          //         resp.data.response_message,
          //         [
          //           {
          //             text: 'OK', onPress: () => { console.log('OK Pressed')
                      
          //             }
          //           },
          //         ],
          //         { cancelable: false },
          //       );
    
          //     }, 500);
          //     break;
          //   }
    
    
          //   default: {
          //     setTimeout(() => {
          //       Alert.alert(
          //         '',
          //         resp.data.response_message,
          //         [
          //           { text: 'OK', onPress: () => console.log('OK Pressed') },
          //         ],
          //         { cancelable: false },
          //       );
          //     }, 200);
    
          //   }
          //     break;
          // }
    
        })
    
    }

    render() {
        return (
          
            <View style={style.container}>
                 <CustomHeader Size={"medium"} 
                 backicon={true}
                 goback={()=>this.props.navigation.goBack()} 
                 backicon={NavigationIcons.backicon} 
                 Title="Privacy Policy" />
        <ScrollView>
            <View style={{width:wp("90%"),marginTop: 15,alignSelf:"center",flex:1}}>
                <HTML  html={this.state.Privacy} />
            </View>
                   
        </ScrollView>


            </View>
            
           
        )
    }

}
const style=StyleSheet.create({
    container: {
        flex:1,
       
      
        justifyContent: 'center',
        alignItems: 'center',
     
    //    marginVertical:Platform.OS==='ios' ? wp('17%') :null,
        backgroundColor:"white"

    },
   

})


