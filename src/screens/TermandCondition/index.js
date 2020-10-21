import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView, Platform, Image, TouchableOpacity, SafeAreaView, KeyboardAvoidingView,Alert } from 'react-native'
import { CustomTextInput } from '../../components/globalComponents/GlobalTextInput'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import {  Dimensions } from 'react-native';
import { connect, } from 'react-redux';
import HTML from 'react-native-render-html'
import ApiRequest from '../../services/webservice'
import { CustomHeader } from '../../components/globalComponents/Header';
import NavigationIcons from '../../Router/NavigationIcons';
// import CustomHeader from '../../components/globalComponents/Header'
// import Icon from '../../assets/Icon'
export default class Termandcondition extends Component {
    constructor(props) {
        super(props)
        this.state = {
                Term:''
        }
    }

componentDidMount(){
         this.TermAPi()
   
}

TermAPi(){

    ApiRequest('', "content/terms", "GET")
    .then(async resp => {
     
      this.setState({Term: resp.data.description})

    })


}

    render() {
        return (
          
            <View style={style.container}>
                 <CustomHeader Size={"medium"} 
                 backicon={true}
                 goback={()=>this.props.navigation.goBack()} 
                 backicon={NavigationIcons.backicon} 
                 Title="Terms and Conditions" />
        <ScrollView>
            <View style={{width:wp("90%"),marginTop: 15,alignSelf:"center",flex:1}}>
                <HTML  html={this.state.Term} />
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


