import React, { Component } from 'react';
import { 
  View, 
  Text,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Alert
 } from 'react-native';
 import {CustomHeader2} from '../../components/globalComponents/Header'
 import NavIcons from '../../Router/NavigationIcons'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import Icons from "./icon"
import { withNavigationFocus } from 'react-navigation';
import { connect, } from 'react-redux';
import { SaveuserDetails } from '../../redux/Actions/AuthAction';
import AsyncStorage from '@react-native-community/async-storage';
import { bindActionCreators } from 'redux';
import ApiRequest from "../../services/webservice"
import { Loader } from '../../components/globalComponents/Loader';

class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Shopbycategory:"",
      searchText:"",
      isLoading: false
    };
  }
  componentDidMount(){
    this.CategoryListApi()
  }
  CategoryListApi() {
    this.setState({ isLoading: true })
    ApiRequest('', "user-management/category-list", "GET", `JWT ${this.props.Token}`)
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
            this.setState({
              Shopbycategory:resp.data.data
          
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
 
    Shopbycategory = ({ item, index }) => {
      if (item.empty === true) {
        return <View style={[styles.item, styles.itemInvisible]}/>;
      }
      return (
        <View
          style={styles.item}
        >     
           <TouchableOpacity onPress={() => this.props.navigation.navigate("CategoryName",{"ID":item.id,"Ctegoryname":item.name}) } >
            <Image resizeMode="contain" style={{width:wp("25%"),height:hp("13%")}} source={{uri:item.image}} />
            </TouchableOpacity>
          <Text style={styles.itemText}>{item.name}</Text>
         
        </View>
      );
    };
  async searchTextvalidate(text) {
   
    await this.setState({ searchText:text })
   
    this.searchCategory()
  }

  searchCategory() {
    this.setState({ isLoading: true })
    ApiRequest('', `user-management/category-list?qf=${this.state.searchText}`, "GET", `JWT ${this.props.Token}`)
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
            this.setState({
              Shopbycategory:resp.data.data

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
  render() {
    return (  
          <View style={{ flex:1,backgroundColor:'rgb(247,249,251)'}} >
        {/* <View style={{height:hp("10%")}}> */}
        <Loader
                visible={this.state.isLoading}
                />
        <CustomHeader2 Size={"medium"} 
           placeholder={"Search by category name"}
 
            menuonPress={() =>
                this.props.navigation.openDrawer()
            }
            bellicononpress={()=>this.props.navigation.navigate("Notification")}
            onChangeText={(text)=>this.searchTextvalidate(text)}
          bellicon={NavIcons.bellicon} menuicon={NavIcons.menuicon} search={true} Title="Category" />
          <Text style={styles.titlestyle} >Shop By Category</Text>
        {/* </View> */}
        {this.state.Shopbycategory.length===0?
          <View style={{height:hp("30%"),alignItems:"center",justifyContent:'center',}}>
            <Text style={{fontWeight:"bold",fontSize:15}}>
              No Records Found!
            </Text>
          </View>
        :
        <View style={{ alignItems:"center",width:wp("95%"),alignSelf:"center", flex:1,}}>

        <FlatList
       
        showsVerticalScrollIndicator={false}
        data={this.state.Shopbycategory}
        renderItem={(item, index) => this.Shopbycategory(item, index)}
        numColumns={3}
        keyExtractor={item => item.key}
        style={styles.container}
      />
      </View>
        }
           
           {/* </ScrollView> */}
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
)(withNavigationFocus(Category));


const styles = StyleSheet.create({
  container: {
    //flex: 1,
    //backgroundColor:"white",
    //marginVertical: 20,
    marginBottom:wp('13%'),
    alignContent: 'space-between',  
       
  },
  titlestyle:{
   fontSize:20,
    fontWeight: "bold",
    marginLeft: wp("4%"),
    marginVertical:wp('8%')
    
  },

  item: {
    width:wp("28%"),
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
   alignSelf:"center",
  //  flex: 1,
   margin:6,
  //height: Dimensions.get('window').width / numColumns
    borderRadius:8,
    //width: wp("30%"),
        height: hp("20%"),
        shadowColor: 'white',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 5,
        shadowOpacity: 0.6

  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
  itemText: {
    fontSize:10,
    color: 'black',
  },
})
