import React, { Component } from 'react';
import { View, Text,StyleSheet,Image ,Modal ,TouchableOpacity,TextInput} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { Rating} from 'react-native-ratings';
import {Loader} from '../../../components/globalComponents/Loader'
export default class Feedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
        modalVisible:true,
        isLoading:false
    };
  }

  render() {
    return (
      <View>
        <Modal
          transparent={true}
          visible={this.state.modalVisible}
        // onRequestClose={props.onRequestClose}
        // {...props}
        >
           <View style={{alignItems:"center", flex:1, backgroundColor: 'rgba(49,176,249,0.8)', justifyContent: 'center' }}>
          <View style={{
              borderRadius: 8,
              marginTop: hp("35%"),
              justifyContent: "center",
              alignItems: "center",
              alignSelf: 'center',
              width: wp("70%"),
              backgroundColor: "white",
              height: hp("40%"),
              marginBottom:hp("30%")
              // justifyContent:"center"
                }}>
                   
                <View style={{width:wp("60%"),alignItems:"center",justifyContent:"center"}} >
              <Text
              
                style={{
                  fontSize:25,
                  textAlign:"center",
                 marginBottom:hp("2%")

                }}
              >
             Rate This App
             
           </Text>
           <Rating
     
  onFinishRating={this.ratingCompleted}
  defaultRating={0}
  style={{ paddingVertical: 10 }}
          />

          {/* <View style={{height:wp('15%'),
          width:wp('60%')
          ,
          // backgroundColor:'#f2f2f2',
          borderRadius:50,
          alignContent:'center',
          alignItems:'center',
          justifyContent:'center' ,
          marginBottom:hp('2%')
          }}> */}
              <TextInput 
               Placeholder= "Kindly suggest how could we improve our services?"    style={{backgroundColor:'red',alignSelf:"center"}}/>
          {/* </View> */}
           </View>
              <View
                style={{
                  alignItems:"center",
                  alignSelf:"center",
                  // backgroundColor:"yellow",
                  width:wp("60%"),
                  flexDirection:"row",
                  justifyContent:"space-between"
                }
                }>
                <TouchableOpacity
                 onPress={()=>this.setState({modalVisible:!this.state.modalVisible})}
                  style={{
                    borderWidth:1,
                    borderColor:'rgb(49,176,249)',
                    borderRadius:15,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "white",
                    width: wp("25%"),
                    height: hp("5%"),
                    shadowColor: 'rgb(49,176,249)',
                    shadowOffset: {
                        width: 0,
                        height: 3
                    },
                    shadowRadius: 5,
                    shadowOpacity: 0.6
                  }}

                >
           <Text style={{color:"rgb(49,176,249)",fontSize:18,fontWeight:"bold"}}>
            No
           </Text>
           </TouchableOpacity>
                <TouchableOpacity
                onPress={()=>
                  this.setState({modalVisible:!this.state.modalVisible})
                  
                }
                  style={{
                    borderWidth:1,
                    borderColor:'rgb(49,176,249)',
                    borderRadius:15,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "rgb(49,176,249)",
                    width: wp("25%"),
                    height: hp("5%"),
                    shadowColor: 'rgb(49,176,249)',
                    shadowOffset: {
                        width: 0,
                        height: 3
                    },
                    shadowRadius: 5,
                    shadowOpacity: 0.6
                  }}
           >
           <Text style={{
             color:"white",
             fontSize:18,fontWeight:"bold"
           }}>
           Yes
           </Text>
           </TouchableOpacity>
           </View>
          </View>
          </View>
        </Modal>
      </View>
    );
  }
}
