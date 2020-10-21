import React, { Component } from 'react'
import { Modal,
    Alert,ScrollView, Text, View, StyleSheet, Image, TouchableOpacity, ImageBackground, Platform } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { SliderBox } from "react-native-image-slider-box";
import Icons from "../icon"
import { CustomTextInput } from '../../../components/globalComponents/GlobalTextInput';
import { connect, } from 'react-redux';
import { SaveuserDetails } from '../../../redux/Actions/AuthAction';
import AsyncStorage from '@react-native-community/async-storage';
import { bindActionCreators } from 'redux';
import { withNavigationFocus } from 'react-navigation';
import ApiRequest from "../../../services/webservice"
import { Loader } from '../../../components/globalComponents/Loader';
import { CustomHeader } from '../../../components/globalComponents/Header';

class ProductName extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalVisible:false,
            errorQuantity: "",
            Quantityenter: "",
            amount: "",
            product_name: "",
            about_product: "",
            product_id: "",
            imageforbanner: "",
            quantity: "",
            bannerImage: "",

        }
    }
    async componentDidMount() {

        await this.setState({
            product_name: this.props.navigation.state.params.user_sub_category.product_name,
            amount: this.props.navigation.state.params.user_sub_category.amount,
            about_product: this.props.navigation.state.params.user_sub_category.about_product,
            product_id: this.props.navigation.state.params.user_sub_category.product_id,
            imageforbanner: this.props.navigation.state.params.user_sub_category.image,
            quantity: this.props.navigation.state.params.user_sub_category.quantity,


        })

        let convertbannerarray = this.state.imageforbanner.map(element => {
            return element.image

        })
        this.setState({ bannerImage: convertbannerarray })

    }
    enterQuantity(text) {
        var numberRegex =/^\d+(,\d{3})*(\.\d{1,2})?$/;
        if(numberRegex.test(text)){
        if (this.state.quantity >= text) {
            this.setState({ Quantityenter: text })
            this.setState({ errorQuantity: "" })
        }
        else {
            this.setState({ errorQuantity: "Quantity out of stock." })
        }

        }
        else{
            this.setState({ errorQuantity: "Enter valid quantity." })
        }

    }
    
    addItem=()=> {
if(this.state.Quantityenter===""){
    this.setState({ errorQuantity: "Please enter quantity" })  
}
else{
    this.addItemApi()
}
    }
addItemApi(){
        this.setState({ isLoading: true })
        let AddItemdeatils =
        {
            "product_id": this.state.product_id,
            "quantity":Number(this.state.Quantityenter*12)

        }
        ApiRequest(AddItemdeatils, 'user-management/add-cart-manawith-quantity', "POST", `JWT ${this.props.Token}`)
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
                        AsyncStorage.setItem("AddItemfromCategoryname", JSON.stringify(true))
                        this.setState({ isLoading: false })
                        this.setState({ responsemessage: resp.data.response_message })
                        this.setState({ modalVisible: !this.state.modalVisible })
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
    render() {

        return (
          
                <View style={style.container}>
                <CustomHeader
                goback={()=>this.props.navigation.goBack()}
                Size={"medium"}
                backicon={true}
                Title={this.state.product_name} />
                  <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={style.ImageSliderView}>
                      
                        <SliderBox
                            images={this.state.bannerImage}
                            sliderBoxHeight={hp('20%')}
                            onCurrentImagePressed={index => (`images ${index} pressed`)}
                            currentImageEmitter={index => (`current pos is: ${index}`)}
                            ImageComponentStyle={{
                                height: hp('30%'),
                                width: wp('100%'),
                            }}
                            resizeMode="contain"
                            imageLoadingColor="#2196F3"
                            dotColor='#23a7fa'
                            dotStyle={{
                                width: 8,
                                height: 8,
                                borderRadius: 20,

                            }}

                        />
                    </View>
                    <View style={style.productDataStyle}>
                        <View style={style.ProductNameView}>
                            <View style={{ width: wp('40%'),  }}>
                                <Text  style={{ fontWeight: '300', fontSize: 16, marginHorizontal: wp('3%') }}>
                                    {this.state.product_name}
                                    </Text>
                            </View>
                            <View style={{ width: wp('30%'), height: hp('5%'), paddingTop: 5 }}>
                                <Text style={{ fontSize: 16, fontWeight: '500', marginHorizontal: wp('3%') }}>₹{this.state.amount}</Text>
                            </View>
                        </View>

                        <TouchableOpacity style={style.buttonView}>
                            <TouchableOpacity onPress={() => this.addItem()
                            }>
                                <ImageBackground source={Icons.roundedRectabgle}
                                    resizeMode='contain'
                                    style={{ width: wp('50%'), height: hp('8%'), justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 12, fontWeight: '400', color: '#fff', textAlign: 'center', }}>Add to Cart</Text>
                                </ImageBackground>
                            </TouchableOpacity>
                        </TouchableOpacity>

                    </View>
                    <View style={style.TextInputStyleView}>
                        <View style={{
                            width: wp('30%'), height: hp('8%'),
                            justifyContent: "center", alignSelf: 'center', alignItems: 'center',
                        }}>
                            <Text style={{ fontSize: 14, }}>Enter Quantity In Dorzen</Text>
                        </View>
                        <View style={{ width: wp('60%'), height: hp('7%'), justifyContent: "center", alignSelf: 'center', alignItems: 'center' }}>
                            <CustomTextInput
                                MyPlaceholder="123"
                                keyboardType={"numeric"}
                                // returnKeyType={}
                                InputFieldMainContainer={{ height: hp('6%'), width: wp('65%'), alignSelf: 'center' }}
                                textInputStyle={{ paddingLeft: 20, height: hp('6%'), width: wp('65%') }}
                                onChangeText={(text) => this.enterQuantity(text)}

                            />
                            <View>
                                <Text style={{ color: "red" }}>
                                    {this.state.errorQuantity}
                                </Text>
                            </View>
                        </View>

                    </View>
                    <View style={style.cardViewStyle}>
                        <View style={{ marginHorizontal: wp('3%'), marginVertical: hp('2%') }}>
                            <Text style={{ fontWeight: '600' }}>About Product</Text>
                        </View>
                        <View style={{ marginHorizontal: wp('3%'), justifyContent: 'center' }}>
                            <Text style={{ color: 'gray' }}>
                                {this.state.about_product}</Text></View>

                    </View>
                    <View style={{alignItems:"center",flex:1,  justifyContent:"center"}}>
        <Modal
          transparent={true}
          visible={this.state.modalVisible}
        
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
              height: hp("25%"),
              marginBottom:hp("30%")
            
                }}>
                <View style={style.crossView}>
                <TouchableOpacity  onPress={()=>this.setState({modalVisible:!this.state.modalVisible})}>
           <Image source={Icons.crossicon}/>
        
           </TouchableOpacity>
           </View>

                <View style={{width:wp("60%")}}>
               
              <Text
              
                style={{
                  fontSize:15,
                 marginBottom:hp("13%"),
                 marginHorizontal:wp('8%'),
                 marginVertical:hp('-8%'),
                 alignSelf:'center'


                }}
              >
              {this.state.responsemessage}
           </Text>
           </View>   
             
       
          </View>
          </View>
        </Modal>
        </View>
                    </ScrollView>
                </View>
           
        )
    }
}

const mapStateToProps = state => {

    return {
        Token: state.AuthReducer.Token
    }
}


const mapDispatchToProps = dispatch => {
    return { actions: bindActionCreators({ SaveuserDetails }, dispatch) }
}

export default connect(mapStateToProps,
    mapDispatchToProps
)(withNavigationFocus(ProductName));

const style = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        // backgroundColor: 'rgb(247,249,251)'
       

    },
    ProductNameView: {
        width: wp('50%'),
        height: hp('8%'),
        flexDirection: 'column'
        

    },
    buttonView: {
        width: wp('50%'),
        height: hp('7%'),
        marginHorizontal: wp('3%'),
        justifyContent: "center", alignItems: 'center'

    },
    ImageSliderView: {
        height: hp('30%'),
        width: wp('100%')
        ,
        borderWidth: 0.2
    },
    productDataStyle: {
        width: wp('100%'),
        height: hp('8%'),
        marginVertical: hp('2%'),
        flexDirection: 'row',




    },
    TextInputStyleView: {
        flexDirection: 'row',
        width: wp('95%'),
        height: hp('8%'),


        justifyContent: 'space-around'

    },
    cardViewStyle: {
        alignSelf: 'center',
        borderWidth: 2,
        borderColor: 'rgb(245,245,245)',

        width: wp('90%'),
        height: hp('50%'),
        backgroundColor: '#fff',
        marginVertical: hp('2%')

    },
    crossView:{  
        alignSelf:'flex-end',
        
        marginBottom: hp('15%'),
        marginHorizontal:wp('-1%')
        
        },



})