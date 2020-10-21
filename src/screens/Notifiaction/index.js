import React, { Component } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View,
  Alert
} from 'react-native';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import ApiRequest from "../../services/webservice"
import { withNavigationFocus } from 'react-navigation';
import { connect, } from 'react-redux';
import { SaveuserDetails } from '../../redux/Actions/AuthAction';
import AsyncStorage from '@react-native-community/async-storage';
import { bindActionCreators } from 'redux';
import { SwipeListView } from 'react-native-swipe-list-view';
// import Icons from "../settings/icon"
import Icons from "./icon"
import { Loader } from '../../components/globalComponents/Loader'
import hardSet from 'redux-persist/es/stateReconciler/hardSet';
import { CustomHeader } from '../../components/globalComponents/Header';
function Item({ id, title, selected, details, onSelect }) {
  return (<View style={{ flex: 1 }} >
    <View style={[styles.item]} >
      <View style={styles.wrapper}>
        <Text style={[styles.title]}>{title}</Text>
        <TouchableOpacity style={{ alignSelf: 'flex-end', width: wp("5%"),height:hp("5%"),alignItems:"center",justifyContent:"center" }} onPress={() => onSelect(id)}>
          <Image style={{ height: 20, width: 20 }} source={selected ? Icons.popupIcon : Icons.dropDownIcon} />
        </TouchableOpacity>
      </View>

      {selected ?
        <View >
          <View style={styles.textWrapper} />
          <Text style={[{ paddingTop: 10 }, styles.title]}>{details}</Text>
        </View>
        : null}
    </View>
  </View>
  );
}



class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Notificationlist: "",
      listViewData: [
        {
          id: '0',
          title: ' Item,Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
          details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. '
        },
        {
          id: '1',
          title: ' Item,Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
          details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. '

        },
        {
          id: '2',
          title: ' Item,Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
          details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. '

        },
        {
          id: '3',
          title: ' Item,Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
          details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. '

        },
        {
          id: '4',
          title: ' Item,Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
          details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. '

        },
        {
          id: '5',
          title: ' Item,Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
          details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. '

        },
      ],
      selected: new Map()
    };
  }
  componentDidMount() {
    this.getAllnotificationList()


  }
  getAllnotificationList() {
    this.setState({ isLoading: true })

    ApiRequest('', 'user-management/notification', "GET", `JWT ${this.props.Token}`)
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
            this.setState({ Notificationlist: resp.data.data })
            AsyncStorage.setItem("ALERTCOUNT", JSON.stringify(resp.data.data.length))
            break;
          }
          // 
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

  deleteRow(ID) {
    var detletedetails = {
      notification_id: ID
    }

    ApiRequest(detletedetails, 'user-management/notification', "POST", `JWT ${this.props.Token}`)
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
            this.getAllnotificationList()
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


  closeRow(rowMap, rowKey) {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  }

  onSelect = id => {
    const newSelected = new Map(this.state.selected);
    newSelected.set(id, !this.state.selected.get(id));
    this.setState({ selected: newSelected })
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#e6e6e6' }}>
                    <CustomHeader Size={"medium"}  backicon={true}goback={()=>this.props.navigation.goBack()} Title="Notification" />

        <Loader
          visible={this.state.isLoading}
        />
        <View style={{ marginHorizontal: 10, flex: 1 }}>

          <SwipeListView
            showsVerticalScrollIndicator={false}
            data={this.state.Notificationlist}
            renderItem={data => (
              <View
                onPress={() => console.log(data.item.message)}
                style={styles.rowFront}
                underlayColor={'#AAA'}
              >
                {/* <Text>{data.item.title}</Text> */}
                <Item
                  id={data.item.notification_id}

                  title={data.item.message.substring(0, 50)}
                  details={data.item.message}
                  selected={!!this.state.selected.get(data.item.notification_id)}
                  onSelect={this.onSelect}
                />
              </View>

            )}

            renderHiddenItem={(data, rowMap) => (
              <View style={styles.rowBack}>

                <TouchableOpacity
                  style={[
                    styles.backRightBtn,
                    styles.backRightBtnRight,
                  ]}
                  onPress={() =>
                    this.deleteRow(data.item.notification_id
                    )
                  }
                >
                  <Image source={Icons.delete} />
                  {/* <Text style={styles.backTextWhite}>
                            Delete
                        </Text> */}
                </TouchableOpacity>
              </View>
            )}

            //  leftOpenValue={75}
            rightOpenValue={-75}
          />
        </View>
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
)(withNavigationFocus(Notification));
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  standalone: {
    marginTop: 30,
    marginBottom: 30,
  },
  standaloneRowFront: {
    alignItems: 'center',
    backgroundColor: '#CCC',
    justifyContent: 'center',
    height: 50,
  },
  standaloneRowBack: {
    alignItems: 'center',
    backgroundColor: '#8BC645',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
  },
  backTextWhite: {
    color: '#FFF',

  },
  rowFront: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomColor: 'black',
    marginVertical: 2,
    justifyContent: 'center',

  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    height: 70,
    marginVertical: 10,
    width: 50,
  },
  backRightBtnLeft: {
    backgroundColor: 'blue',
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: 'rgb( 255, 100, 136)',
    right: 0,
    borderBottomLeftRadius: 8,
    borderTopLeftRadius: 8
  },
  controls: {
    alignItems: 'center',
    marginBottom: 30,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 5,
  },
  switch: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    paddingVertical: 10,
    width: Dimensions.get('window').width / 4,
  },
  trash: {
    height: 25,
    width: 25,
  },
  item: {
    width: wp("90%"),
    alignSelf:"center",
    padding: 20,
    marginVertical: 2,
    marginHorizontal: 16,
    justifyContent: "space-between",
    borderRadius: 5
  },
  wrapper: {
    width: wp("80%"),
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "space-between",
   height:hp("5%"),
    // paddingBottom: 10,
    flexDirection: 'row'
  },
  title: {
    width: wp("75%"),
   
    alignSelf: "center",
    fontSize: 15,
  },
  textWrapper: {
    width: '100%',
    borderBottomColor: '#cccccc',
    borderBottomWidth: 0.5
  }
});
