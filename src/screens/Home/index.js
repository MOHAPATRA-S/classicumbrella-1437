import React, { Component } from 'react';
import {
  ImageBackground,
  View,
  Text,
  ScrollView,
  FlatList,
  Image, SafeAreaView,
  Alert,

}
  from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { CustomHeader2 } from '../../components/globalComponents/Header'
import NavIcons from '../../Router/NavigationIcons'
import Icons from './icon';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { withNavigationFocus } from 'react-navigation';
import { connect, } from 'react-redux';
import { SaveuserDetails } from '../../redux/Actions/AuthAction';
import AsyncStorage from '@react-native-community/async-storage';
import { bindActionCreators } from 'redux';
import ApiRequest from "../../services/webservice"
import { SliderBox } from "react-native-image-slider-box";
import { Loader } from '../../components/globalComponents/Loader';
class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      most_popular_product: "",
      popular_category: "",
      banner: "",
      bannerarray: "",
      isLoading: false

    };
  }
  componentDidMount() {
    this.homelistApi()
  }

  homelistApi() {
    this.setState({ isLoading: true })
    ApiRequest('', "user-management/home", "GET", `JWT ${this.props.Token}`)
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
            await this.setState({
              most_popular_product: resp.data.most_popular_product,
              popular_category: resp.data.popular_category,

            })


            let convertbannerarray = resp.data.banner.map(element => {
              return element.image

            })

            this.setState({ bannerarray: convertbannerarray })

            break;
          }
          case (401): {

            this.setState({ isLoading: false })
            setTimeout(() => {
              Alert.alert(
                '',
                resp.data.details,
                [
                  { text: 'OK', onPress: () => this.props.navigation.navigate("Login") },
                ],
                { cancelable: false },
              );
            }, 200);
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
  popularCategory(item, index) {

    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate("Category")}

        style={{
          alignItems: "center",
          marginHorizontal: wp("1%"),
          width: wp("40%"),
          height: hp("25%"),
          backgroundColor: "white",
          shadowColor: '#ffffff',
          shadowOffset: {
            width: 0,
            height: 3
          },
          shadowRadius: 5,
          shadowOpacity: 0.6,
          borderRadius: 8
        }}>

        <Image
          style={{
            marginVertical: ("2%"),
            width: wp("25%"),
            height: hp("15%")
          }}
          resizeMode="contain"
          source={{ uri: item.image }} />
        <View style={{
          width: wp("40%"),
          marginLeft: wp("3%"),
        }}>
          <Text style={{
            color: "rgb(123, 125, 127)",
            fontWeight: "bold",
            marginVertical: ("2%")
          }}>
            {item.name}
          </Text>
          <Text style={{
            color: "rgb(78 ,82, 84)",
            marginVertical: ("2%"),
            fontWeight: "600",
          }}>
            {item.cost}
          </Text>
        </View>

      </TouchableOpacity>
    )
  }
  MostpopularCategory(item, index) {

    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate("ProductName", { "user_sub_category": item })}
        style={{
          alignItems: "center",
          marginHorizontal: wp("1%"),
          width: wp("40%"),
          height: hp("25%"),
          backgroundColor: "white",
          shadowColor: '#ffffff',
          shadowOffset: {
            width: 0,
            height: 3
          },
          shadowRadius: 5,
          shadowOpacity: 0.6,
          borderRadius: 8
        }}>

        <Image
          style={{
            marginVertical: ("2%"),
            width: wp("25%"),
            height: hp("15%")
          }}
          resizeMode="contain"
          source={{ uri: item.image[0].image }} />
        <View style={{
          width: wp("40%"),
          marginLeft: wp("3%"),
        }}>
          <Text style={{
            color: "rgb(123, 125, 127)",
            fontWeight: "bold",
            marginVertical: ("2%")
          }}>
            {item.product_name}
          </Text>
          <Text style={{
            color: "rgb(78 ,82, 84)",
            marginVertical: ("2%"),
            fontWeight: "600",
          }}>
            ₹{item.amount}
          </Text>
        </View>

      </TouchableOpacity>
    )
  }




  async searchTextvalidate(text) {

    await this.setState({ searchText: text  })
    

    this.searchCategory()
  }

  searchCategory() {
    // this.setState({ isLoading: true })
    ApiRequest('', `user-management/home?qf=${this.state.searchText}`, "GET", `JWT ${this.props.Token}`)
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
            await this.setState({
              popular_category: resp.data.popular_category,


            })


            let convertbannerarray = resp.data.banner.map(element => {
              return element.image

            })

            this.setState({ bannerarray: convertbannerarray })

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


      <View style={{
        //marginTop:Platform.OS==="ios" ? hp('11%') : null
        //backgroundColor: "pink"
        flex: 1,
        backgroundColor: 'rgb(247,249,251)',


      }}>

        <Loader
          visible={this.state.isLoading}
        />
        <CustomHeader2 Size={"medium"} bellicon={NavIcons.bellicon}
          menuonPress={() =>
            this.props.navigation.openDrawer()
          }
          placeholder={"Search by category name"}
          bellicononpress={() => this.props.navigation.navigate("Notification")}
          menuicon={NavIcons.menuicon} location={true} search={true} Title="Home"
          onChangeText={(text) => this.searchTextvalidate(text)}
          editonPress={() => this.props.navigation.navigate("EditAddress")
          } />

        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled"
        >
          <SliderBox
            // resizeMode="contain"

            images={this.state.bannerarray}
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
          <Text style={{
            fontWeight: "bold",
            marginLeft: wp("4%"),
            marginVertical: hp("4%"),
          }}>
            Popular Category
          </Text>
          <View style={{
            marginLeft: wp("2%"),


          }}>
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              data={this.state.popular_category}
              renderItem={({ item, index }) => this.popularCategory(item, index)}
              keyExtractor={item => item.id}
            />
          </View>
          <View style={{ alignItems: "flex-end", width: wp("95%"), alignSelf: 'center', justifyContent: "flex-end" }}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Category")}
              style={{ justifyContent: "flex-end" }}>
              <Text style={{
                textDecorationColor: "#23a7fa",
                //textDecorationLine: 1,
                color: "#23a7fa"
              }}>
                View More...
          </Text>
            </TouchableOpacity>
          </View>



          <Text style={{
            fontWeight: "bold",
            marginLeft: wp("4%"),
            marginVertical: hp("4%"),
            // marginBottom: ("4%"),
          }}>
            Most Popular Product
          </Text>
          <View style={{
            marginLeft: wp("2%"),
            paddingVertical: wp('1%')
          }}>
            {this.state.most_popular_product.length === 0 ?
              <View style={{ height: hp("30%"), alignItems: "center", justifyContent: 'center', }}>
                <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                  No Records Found!
            </Text>
              </View>
              :
              <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                data={this.state.most_popular_product}
                renderItem={({ item, index }) => this.MostpopularCategory(item, index)}
              // keyExtractor={item => item.id}
              />
            }
          </View>

        </ScrollView>

      </View>
    );
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
)(withNavigationFocus(HomeScreen));

