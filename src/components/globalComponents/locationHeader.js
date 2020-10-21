import React, { Component } from 'react';
import {Image, View, Text,StyleSheet } from 'react-native';
import locationicon from '../../assets/images/location_icon.png'
import ApiRequest from "../../services/webservice"
import { connect, } from 'react-redux';
class LocationHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
        address:""
    };
  }
componentDidMount(){

    this.getDefaultaddress()
}
getDefaultaddress(){

    this.setState({ isLoading: true })

    ApiRequest({}, "user-management/address", "GET", `JWT ${this.props.Token}`)
        .then(async resp => {
         
            switch (resp.status) {
                case (900): {
                    this.setState({ isLoading: false })
                    setTimeout(() => {
                        Alert.alert(
                            '',
                            "Please check your internet connection",
                            [
                                { text: 'OK', onPress: () => console.log('OK Pressed') },
                            ],
                            { cancelable: false },
                        );
                    }, 200);
                    break;
                }
                case (200): {
                    this.setState({ isLoading: false })

                    let convertbannerarray = resp.data.data.filter(item => (item.is_default === true) ? item : null)

                    this.setState({
                        address: convertbannerarray[0].address,
                    })


                    break;
                }


                default: {
                    this.setState({ isLoading: false })
                    setTimeout(() => {
                        Alert.alert(
                            '',
                            resp.data.subject[0],
                            [
                                { text: 'OK', onPress: () => console.log('OK Pressed') },
                            ],
                            { cancelable: false },
                        );
                    }, 200);

                }
                    break;
            }

        })
}
  render() {
    return (
        <View style={{ flexDirection:'row'}}>
        {/* <Image source={locationicon} style={styles.locationstyle}/> */}
    <Text style={styles.locationtextstyle}>{this.state.address}</Text>

        {/* <TouchableOpacity  onPress={props.editonPress}>
        <Image source={editicon} style={styles.editiconstyle} />
        </TouchableOpacity> */}
       
        </View>
    );
  }
}
const mapStateToProps = state => {
  
    return {
      Token: state.AuthReducer.Token
    }
  }

  export default connect(mapStateToProps,
  
    )(LocationHeader);



const styles = StyleSheet.create({
 
    locationtextstyle:{
        color:'white',
        marginLeft:6
       
    },

    locationstyle:{
        //marginHorizontal:wp('10%')
   
    },
})

