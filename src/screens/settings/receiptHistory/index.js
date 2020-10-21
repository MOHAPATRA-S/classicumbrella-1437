import React, { Component } from 'react'
import {
    View, Text, StyleSheet, ScrollView, Platform, Image, TouchableOpacity, SafeAreaView,
    KeyboardAvoidingView, FlatList, Alert
} from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import Icons from './icon'
import { connect, } from 'react-redux';
import ApiRequest from "../../../services/webservice"
import { SliderBox } from "react-native-image-slider-box";
import DatePicker from 'react-native-datepicker';
import { withNavigationFocus } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import NavigationIcons from '../../../Router/NavigationIcons';
import { CustomHeader2 } from '../../../components/globalComponents/Header';
let maxtime
class RecieptHistory extends Component {
    constructor(props) {
        super(props)
        this.state = {
            receiptHistory: "",
            enddate:"",
            startdate:"",
            isRefreshing:false

        }
    }
    componentDidMount() {

        var data = new Date();
        let finaldate = data
        maxtime = new Date(finaldate)

        this.getAllreceipthistory()
    }
    getAllreceipthistory() {
        ApiRequest("", "user-management/reciept", "GET", `JWT ${this.props.Token}`)
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
                        AsyncStorage.setItem("UploadReceipt",JSON.stringify(false))
                        this.setState({ isLoading: false, isRefreshing: false })
                        this.setState({
                            receiptHistory: resp.data.data
                        })

                        break;
                    }


                    default: {
                        this.setState({ isLoading: false })
                        setTimeout(() => {
                            Alert.alert(
                                '',
                                resp.data.response_message,
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

    _renderdata = (item, index) => {

        return (
            <View style={{
                width: wp("90%"),
                backgroundColor: "white",
                height: hp("18%"),
                marginVertical: hp("1%"),
                borderRadius: 8,
                alignSelf: "center"
            }} >
                <View style={{
                    alignItems: "flex-start",
                    height: hp("3%"),
                    width: wp("90%"),
                    flexDirection: 'row',
                    marginLeft: 10,
                    marginTop: 8

                }}>
                    <Image
                        source={Icons.watch}
                    />
                    <Text style={{ color: 'gray' }}>
                        {item.date},
                    </Text>
                    <Text style={{ color: 'gray' }}>
                        {item.created_at.split("T")[0].split("-").reverse().join('-')}    {item.created_at.split("T")[1].split(":")[0]}:{item.created_at.split("T")[1].split(":")[1]}

                    </Text>
                </View>
                <View style={{
                    height: hp("8%"),
                    justifyContent: 'center',
                }}>
                    <View style={{
                        alignSelf: "center",
                        width: wp("88%"),
                        // backgroundColor: "orange",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}>
                        <View style={{
                            width: wp("45%"),
                            flexDirection: 'row'
                        }}>
                            <Text style={{
                                fontWeight: '600'
                                , marginLeft: 10
                            }}>Order ID :</Text>
                            <Text >{item.order_id}</Text>
                        </View>
                        <TouchableOpacity 
                        disabled={item.status_type === "Approved" ?true:false}
                        onPress={() => this.props.navigation.navigate('UploadReceipt',{"ID":item.id}) }>
                            <Image
                                style={{ marginRight: 10 }}
                                source={Icons.Download}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{
                    justifyContent: 'flex-end',
                    flexDirection: 'row',
                    // backgroundColor:"green",
                    marginRight: 10,
                    // height:hp("2%")
                }}>




                    <Text style={{ fontSize: 14 }}>Status:  </Text>
                    <Text style={{ fontSize: 14, color: item.status_type === "Approved" ? "rgb(60,194,68)" : item.status_type === "Pending" ? "rgb(255,67,79)" : "rgb(255,158,82)" }}>{item.status_type}</Text>

                </View>

            </View>
        )
    }
    searchReceiptHistory(){
        let StarDate=  this.state.startdate.split('-').reverse().join('-')
        let EndDate=  this.state.enddate.split('-').reverse().join('-')
       
        ApiRequest("", `user-management/reciept?start_date=${StarDate}&end_date=${EndDate}`, "GET", `JWT ${this.props.Token}`)
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
                    this.setState({ isLoading: false,startdate:"",enddate:"" })
                    this.setState({
                        receiptHistory: resp.data.data
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
    handleRefresh = () => {
        this.setState({
       
          isRefreshing: true,
        }, () => {
            this.getAllreceipthistory()
        });
      };
    render() {

        if (this.props.isFocused) {
            AsyncStorage.getItem("UploadReceipt").then(resp => {
              
              if (JSON.parse(resp) === true) {
                this.getAllreceipthistory()
              }
              else {
              }
            })
            
              .catch(error => {
              })
          }
        return (
            <View style={style.container}>
               <CustomHeader2 Size={"medium"} 
            menuonPress={() =>
                this.props.navigation.openDrawer()
            }
            bellicononpress={()=>this.props.navigation.navigate("Notification")}
             bellicon={NavigationIcons.bellicon} menuicon={NavigationIcons.menuicon} Title="My Reciept History" />
                    {/* <ScrollView showsVerticalScrollIndicator={false}> */}

                        <View style={{ justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}>

                            <View style={style.datePickerView}>

                                <View style={{
                                    width: wp('33%'), borderWidth: 0.3, borderRadius: 21,
                                    alignItems: 'center', alignSelf: 'center', height: hp('6%'), justifyContent: 'center'
                                }}>
                                    <DatePicker
                                        style={{
                                            width: wp('34%'),
                                            borderColor: 'red',
                                            alignItems: 'center', justifyContent: 'space-between'
                                        }}
                                        date={this.state.startdate}//initial date from state
                                        mode="date" //The enum of date, datetime and time
                                        placeholder="select date"
                                        format="DD-MM-YYYY"
                                        maxDate={this.state.enddate?this.state.enddate:maxtime}
                                        confirmBtnText="Confirm"
                                        cancelBtnText="Cancel"
                                        customStyles={{
                                            borderRadius: 20,
                                            dateIcon: {
                                                position: 'absolute',
                                                left: wp('26%'),
                                                top: 4,
                                                marginLeft: 0, height: 20, width: 15,
                                                alignSelf: 'center',
                                                alignItems: 'center',
                                                marginVertical: hp('1%')
                                            },
                                            dateInput: {
                                                marginRight: wp('9%'),
                                                width: wp('65%'), borderWidth: 0, marginHorizontal: wp('1%')
                                            }
                                        }}
                                        onDateChange={(date) => { this.setState({ startdate: date }) }}
                                    />
                                </View>

                                <View style={{
                                    width: wp('37%'), borderWidth: 0.3, borderRadius: 21,
                                    alignItems: 'center', alignSelf: 'center', height: hp('6%'), justifyContent: 'center'
                                }}>
                                    <DatePicker
                                        style={{
                                            width: wp('34%'),
                                            borderColor: 'red',
                                            alignItems: 'center', justifyContent: 'space-between'
                                        }}
                                        date={this.state.enddate} 
                                        mode="date" 
                                        placeholder="select date"
                                        format="DD-MM-YYYY"
                                        minDate={this.state.startdate}
                                        maxDate={maxtime}
                                        confirmBtnText="Confirm"
                                        cancelBtnText="Cancel"
                                        customStyles={{
                                            borderRadius: 20,
                                            dateIcon: {
                                                position: 'absolute',
                                                left: wp('26%'),
                                                top: 4,
                                                marginLeft: 0, height: 20, width: 15,
                                                alignSelf: 'center',
                                                alignItems: 'center',
                                                marginVertical: hp('1%')
                                            },
                                            dateInput: {
                                                marginRight: wp('9%'),
                                                width: wp('65%'), borderWidth: 0, marginHorizontal: wp('1%')
                                            }
                                        }}
                                        onDateChange={(date) => { this.setState({ enddate: date }) }}
                                    />
                                </View>

                                <View style={style.searchButton}>
                                    <TouchableOpacity 
                                    onPress={()=>this.searchReceiptHistory()}
                                    >
                                        <Text style={{
                                            textAlign: 'center', color: 'white',
                                            fontSize: hp('2%')
                                        }}>SEARCH</Text>

                                    </TouchableOpacity>
                                </View>


                            </View>


                        </View>
                        <View style={{ marginHorizontal: wp("3%"),flex:1 }}>
                            {this.state.receiptHistory.length === 0 ?
                                <View style={{ height: hp("30%"), alignItems: "center", justifyContent: 'center', }}>
                                    <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                                        No Records Found!
            </Text>
                                </View>

                                :

                                <FlatList
                                refreshing={this.state.isRefreshing}
                                onRefresh={this.handleRefresh}
                                    data={this.state.receiptHistory}
                                    renderItem={({ item, index }) => this._renderdata(item, index)}
                                />}
                        </View>
                  
            </View>
        )
    }
}

const mapStateToProps = state => {

    return {
        Token: state.AuthReducer.Token
    }
}


//   const mapDispatchToProps = dispatch => {
//     return { actions: bindActionCreators({ SaveuserDetails }, dispatch) }
//   }

export default connect(mapStateToProps,

)(withNavigationFocus(RecieptHistory));


const style = StyleSheet.create({
    container: {
        flex:1,
        // justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: "rgb( 247, 249, 251)",
        width: wp('100%')

    },
    headerView: {
        height: hp('15%')
    },
    datePickerView: {
        flexDirection: 'row',
        width: wp('95%'),
        height: hp('6%'),
        // backgroundColor:'yellow',
        justifyContent: 'space-between',
        marginVertical: hp('6%'),
    },
    searchButton: {
        backgroundColor: "#23a7fa",
        width: wp('22%'),
        height: hp('6%'),
        borderRadius: 25,
        //  alignSelf:'center'
        justifyContent: 'center',
        alignItems: 'center'
    }



})
