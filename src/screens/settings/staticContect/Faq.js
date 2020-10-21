// import React from 'react';
// import {
//   SafeAreaView,
//   TouchableOpacity,
//   FlatList,
//   StyleSheet,
//   Text,
//   View,
//   Image
// } from 'react-native';

// import Icons from "../icon"



// const DATA = [
//   {
//     id: '0',
//     title: 'First Item,Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
//     details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. '
//   },
//   {
//     id: '1',
//     title: 'Second Item,Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
//     details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. '

//   },
//   {
//     id: '2',
//     title: 'Third Item,Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
//     details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. '

//   },
//   {
//     id: '3',
//     title: 'Third Item,Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
//     details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. '

//   },
//   {
//     id: '4',
//     title: 'Third Item,Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
//     details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. '

//   },
//   {
//     id: '5',
//     title: 'Third Item,Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
//     details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. '

//   },
// ];

// function Item({ id, title, selected, details, onSelect }) {
//   return (<View style={{ flex: 1 }} >
//     <View style={[styles.item]} >
//       <View style={styles.wrapper}>
//         <Text style={[styles.title, { flex: 0.95 }]}>{title}</Text>
//         <TouchableOpacity style={{ alignSelf: 'flex-end', flex: 0.05 }} onPress={() => onSelect(id)}>
//           <Image style={{ height: 20, width: 20 }} source={selected ? Icons.popupIcon : Icons.dropDownIcon} />
//         </TouchableOpacity>
//       </View>

//       {selected ?
//         <View >
//           <View style={styles.textWrapper} />
//           <Text style={[{ paddingTop: 10 }, styles.title]}>{details}</Text>
//         </View>
//         : null}
//     </View>
//   </View>
//   );
// }

// export default function FAQ() {
//   const [selected, setSelected] = React.useState(new Map());

//   const onSelect = React.useCallback(
//     id => {
//       const newSelected = new Map(selected);
//       newSelected.set(id, !selected.get(id));

//       setSelected(newSelected);
//     },
//     [selected],
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       <FlatList
//         data={DATA}
//         renderItem={({ item }) => (
//           <Item
//             id={item.id}
//             title={item.title}
//             details={item.details}
//             selected={!!selected.get(item.id)}
//             onSelect={onSelect}
//           />
//         )}
//         keyExtractor={item => item.id}
//         extraData={selected}
//       />
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginTop: 10,
//     backgroundColor: '#e6e6e6'
//   },
//   item: {
//     backgroundColor: 'white',
//     padding: 20,
//     marginVertical: 2,
//     marginHorizontal: 16,
//     borderRadius: 5
//   },
//   title: {
//     fontSize: 10,
//   },
//   wrapper:{
//     paddingBottom: 10,
//    flexDirection: 'row' 
//   },
//   textWrapper:{
//     width: '100%', 
//     borderBottomColor: '#cccccc', 
//     borderBottomWidth: 0.5 
//   }
// });
import React ,{Component} from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  Platform
} from 'react-native';
import Icons from "../icon"
import { connect, } from 'react-redux';
import { bindActionCreators } from 'redux';
import ApiRequest from '../../../services/webservice'
import { SaveuserDetails } from '../../../redux/Actions/AuthAction';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { CustomHeader } from '../../../components/globalComponents/Header';
import NavigationIcons from '../../../Router/NavigationIcons';









function Item({ id, title, selected, details, onSelect }) {
  return (<View style={{ flex: 1 }} >
    <View style={[styles.item]} >
      <View style={styles.wrapper}>
        <Text style={[styles.title, { flex: 0.95 }]}>{title}</Text>
        <TouchableOpacity style={{ alignSelf: 'flex-end', flex: 0.05 }} onPress={() => onSelect(id)}>
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

 class FAQ extends Component{
   
  constructor(props) {
        super(props);
        this.state = {
          selected : new Map(),
          FAQData:''
        };
      }

    onSelect = id => {
      const newSelected = new Map( this.state.selected);
      newSelected.set(id, !this.state.selected.get(id));
   this.setState({selected : newSelected })  
    }
    

    componentDidMount(){
      this.FAQAPi()

}

FAQAPi(){

 ApiRequest('', "content/faq", "GET",`JWT ${this.props.isLoading}`)
 .then(async resp => {

   this.setState({Term: resp.data.description})
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
       this.setState({FAQData:resp.data.data})
      
       break;
     }


     default: {
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
    <View style={styles.container}>
                  <CustomHeader
                  //  Size={"medium"} 
                    backicon={true}goback={()=>this.props.navigation.goBack()}
                     backicon={NavigationIcons.backicon} Title="FAQ's" />

      <FlatList
      showsVerticalScrollIndicator={false}
        data={this.state.FAQData}
        renderItem={({ item }) => (
          <Item
            id={item.id}
            title={item.question}
            details={item.answer}
            selected={!!this.state.selected.get(item.id)}
            onSelect={this.onSelect}
          />
        )}
        keyExtractor={item => item.id}
        extraData={this.state.selected}
      />
    </View>
  );
  }
}


const mapStateToProps = state => {

  return {
    isLoading: state.AuthReducer.Token
  }
}


const mapDispatchToProps = dispatch => {
  return { actions: bindActionCreators({ SaveuserDetails }, dispatch) }
}

export default connect(mapStateToProps,
  mapDispatchToProps
)(FAQ);





const styles = StyleSheet.create({
  container: {
    flex: 1,
    //marginTop: 10,
    // marginVertical:Platform.OS==='ios' ? wp('20%') :null,
    backgroundColor: '#e6e6e6'
  },
  item: {
    backgroundColor: 'white',
    padding: 20,
    marginVertical: 2,
    marginHorizontal: 16,
    borderRadius: 5
  },
  title: {
    fontSize:15,
  },
  wrapper:{
    paddingBottom: 10,
   flexDirection: 'row' 
  },
  textWrapper:{
    width: '100%', 
    borderBottomColor: '#cccccc', 
    borderBottomWidth: 0.5 
  }
});

