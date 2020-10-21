import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, FlatList, ImageBackground } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import Icon from './icon'
import { connect, } from 'react-redux';
import ApiRequest from "../../../services/webservice"
import {Loader} from "../../../components/globalComponents/Loader"
import NavigationIcons from '../../../Router/NavigationIcons';
import { CustomHeader2 } from '../../../components/globalComponents/Header';
class MyOrderHistory extends Component {
    constructor(props) {
        super(props)
        this.state = {
            orderHistory: [],
            isLoading: false,
            isRefreshing:false
        }
    }
    componentDidMount() {
        this.OrderHistoryApi()
    }
    OrderHistoryApi() {
        this.setState({ isLoading: true })
        ApiRequest("", "user-management/order-history", "GET", `JWT ${this.props.Token}`)
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
                        this.setState({ isLoading: false, isRefreshing: false })
                        this.setState({
                            orderHistory: resp.data.order_list
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
    handleRefresh = () => {
        this.setState({
       
          isRefreshing: true,
        }, () => {
            this.OrderHistoryApi()
        });
      };
    renderData = (item, index) => {

        return (
            <View style={{ }}>
                
                <View style={style.cardViewStyle}>
                    <View style={style.umbrellaImageViewStyle}>
                        <Image
                            source={{ uri: item.sub_category.image[0].image }}
                            resizeMode='contain'
                            style={{ width: wp('18%'), height: hp('20%'), }}
                        />

                    </View>
                    <View style={style.ProductViewStyle}>

                        <View style={{ width: wp('58%'), }}>

                            <View style={{
                                flexDirection: 'row',
                                width: wp('57%'),
                                alignItems: 'center',
                                paddingTop: 3
                            }}>
                                {
                                    item.status === "Delivered" ?
                                        <View style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            width: wp('62%'),
                                            alignItems: 'center',
                                        }}>
                                            <Text style={{
                                                fontWeight: '700',
                                                fontSize: 15,
                                                color: 'rgb(84,88,90)',
                                                marginVertical: hp('1%')
                                            }}>{item.product_name}
                                            </Text>

                                            <ImageBackground
                                                source={item.image2} style={{ width: wp('32%'), alignItems: 'center', justifyContent: 'center' }}
                                                resizeMode='stretch'
                                            >

                                                <Text style={{ color: '#fff', fontWeight: '600', textAlign: 'center' }}>Reorder</Text>

                                            </ImageBackground>
                                        </View>

                                        :
                                        <Text
                                            style={{
                                                fontWeight: '700',
                                                fontSize: 16,
                                                color: 'rgb(84,88,90)',

                                                paddingTop: 3,
                                            }}>{item.sub_category.product_name}
                                        </Text>
                                }
                            </View>
                            <View style={{ width: wp('70%'), }}>
                                <Text style={{ fontWeight: '700', fontSize: 15, color: 'rgb(123,125,127)', }}> ₹{item.amount}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', height: hp('3%'), width: wp('20%') }}>
                                <Text style={{ width: wp('23%'), }} >Quantity</Text>
                                <Text style={{ width: wp('1%'), marginHorizontal: wp('1%') }}>:</Text>
                                <Text style={{ width: wp('23%'), }}>{item.quantity}</Text>
                            </View>

                            <View>
                            </View>
                        </View>

                        <View style={{
                            width: wp('70%'), height: hp('12%'), flexDirection: 'column'
                        }
                        }>
                            <View style={{ flexDirection: 'row', height: hp('5%'), width: wp('70%'), justifyContent: 'space-between', paddingTop: 3 }}>
                                <Text style={{ width: wp('23%'), paddingTop: 5 }}>Order ID</Text>
                                <Text style={{ width: wp('2%'), height: hp("5%"), paddingTop: 5 }}>:</Text>
                                <Text
                                numberOfLines={2}
                                    style={{ width: wp('42%'),height: hp("8%"),marginRight:wp("2%") }}>{item.order_id}</Text>

                            </View>
                            <View style={{ flexDirection: 'row', height: hp('3%'), width: wp('70%'), justifyContent: 'space-between',paddingTop: 1  }}>
                                <Text style={{ width: wp('23%'), paddingTop: 5 }}>Delivery Date</Text>
                                <Text style={{ width: wp('2%'), paddingTop: 5 }}>:</Text>
                                <Text style={{ width: wp('48%'), marginLeft: 15, paddingTop: 5 }}>{item.delivery_date}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', height: hp('3%'), width: wp('70%'), justifyContent: 'space-between',paddingTop: 1  }}>
                                <Text style={{ width: wp('23%'), paddingTop: 5 }}>Order Date</Text>
                                <Text style={{ width: wp('2%'), paddingTop: 5 }}>:</Text>
                                <Text style={{ width: wp('48%'), marginLeft: 15, paddingTop: 5 }}>{item.created_at.split("T")[0].split("-").reverse().join('-')}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', height: hp('4%'), width: wp('70%'), justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={{ width: wp('23%') }}>Status</Text>
                                <Text style={{ width: wp('2%'), }}>:</Text>
                                <Text style={{
                                    width: wp('48%'), fontsize: 8, marginLeft: 15,
                                    color: item.status === "Pending" ? "rgb(255,56,56)" : item.status === "Delivered" ? "rgb(12,182,77)" : "red"
                                }}>{item.status}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>

        )
    }
    render() {
        return (
            <View style={style.container}>
                 <CustomHeader2 Size={"medium"} 
            menuonPress={() =>
                this.props.navigation.openDrawer()
            }
            bellicononpress={()=>this.props.navigation.navigate("Notification")} 
            bellicon={NavigationIcons.bellicon} menuicon={NavigationIcons.menuicon} Title="My Order History"/>
                <Loader
                    visible={this.state.isLoading}
                />

              
                {this.state.orderHistory.length === 0 ?
                                <View style={{ width:wp("100%"),height: hp("30%"), alignItems: "center", justifyContent: 'center', }}>
                                    <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                                        No Records Found!
            </Text>
                                </View>

                                :
                    <FlatList showsVerticalScrollIndicator={false}
                     refreshing={this.state.isRefreshing}
                     onRefresh={this.handleRefresh}
                        data={this.state.orderHistory}
                        renderItem={({ item, index }) => this.renderData(item, index)}
                    />
                }
                {/* </View> */}
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

)(MyOrderHistory);
const style = StyleSheet.create({
    container: {
        flex:1
    },
    cardViewStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderWidth: 2,
        borderColor: 'rgb(245,245,245)',
        flexDirection: 'row',
        width: wp('90%'),
        height: hp('27%'),
        backgroundColor: '#fff',
        // backgroundCo/lor:"green",
        marginVertical: hp('0.5%')

    },
    cardDataStyle: {
        width: wp('89%'),
        height: hp('29%'),
        flexDirection: 'row',

    },
    umbrellaImageViewStyle: {
        width: wp('18%'), height: hp('20%'),
        alignItems: "center"
        // ,backgroundColor:"yellow"


    },
    ProductViewStyle: {
        width: wp('70%'),
        flexDirection: 'column',

        height: hp('27%'),
        
    }

})       