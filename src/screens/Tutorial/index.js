import React, { Component } from 'react';
import { 
    SafeAreaView,
    ScrollView,
    View,
    Text,
    ImageBackground,
    Image,
    StyleSheet
     } from 'react-native';
import Icons from "./icon"
import {SkipButton} from '../../components/globalComponents/Button'
import VideoComponent from '../../components/Videoplayer'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default class TutorialScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {


        }
    }
    render() {
        return (
            <SafeAreaView>
              
                    <View style={{
                    //   flex:1,
                        alignItems: "center",
                        justifyContent: "center",
                        // backgroundColor:"yellow"

                    }}>
                        <View style={{
                            alignItems: "center",
                            justifyContent: "center",
                            height: hp('40%'),
                            width: wp("100%"),
                        }}>

                            <Image resizeMode="contain" source={Icons.landing_image} style={styles.imagestyle} />

                        </View>
                        <VideoComponent
                           />




                        <View style={{marginTop:60,height:hp("40%"),justifyContent:"flex-end" }}>

                        <SkipButton
                            Size="medium"
                            ButtonName="S K I P"
                            submitOnpress={() => this.props.navigation.navigate("Landing")}
                        />
</View>
                    </View>
               
            </SafeAreaView>
    
        );
    }
}
const styles = StyleSheet.create({

    imagestyle: {
//   height:hp("60%"),

        // alignSelf: 'center',
       
    },
    

})