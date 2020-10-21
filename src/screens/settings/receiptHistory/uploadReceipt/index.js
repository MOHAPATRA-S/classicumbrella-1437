//import liraries
import React, { Component } from 'react';
import { Alert, View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import ImagePicker from 'react-native-image-picker'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { connect, } from 'react-redux';
import { Loader } from '../../../../components/globalComponents/Loader';
import AsyncStorage from '@react-native-community/async-storage';
import { withNavigationFocus } from 'react-navigation';
import NavigationIcons from '../../../../Router/NavigationIcons';
import { CustomHeader } from '../../../../components/globalComponents/Header';




class UploadReceipt extends Component {

    constructor(props) {
        super(props);
        this.state = {
            receipt: "",
            isUploadImg: false,
            isLoading: false,


        }

    }
    componentDidMount() {

    }


    imageUpload() {
        var options = {
            title:'Select photo',
            // customButtons: [
            //     {title: 'Choose Photo from Gallery' },
            // ],
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };
        ImagePicker.showImagePicker(options, (response) => {


            if (response.didCancel) {

            } else if (response.error) {

            } else if (response.customButton) {

            } else {
                const source = { uri: response.uri };

                this.setState({
                    receipt: response.uri,
                    type: response.type,

                });

            }
        });

    }


    uploadReceiptApi() {
        this.setState({ isLoading: true })
        let imageName = "fileName"
        let formdata = new FormData();
        formdata.append("upload_reciept", {
            uri: this.state.receipt,
            name: 'image.jpg',
            type: this.state.type,
        })
        if (this.state.receipt === "" && this.state.receipt != null) {
            this.setState({ isLoading: false })
            alert("Please upload a valid image.")

        }
        else {
            formdata.append("order_list", this.props.navigation.state.params.ID)

            fetch("http://13.234.145.105:1510/v1/api/user-management/reciept", {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `JWT ${this.props.Token}`
                },
                body: formdata
            })



                .then(response => {

                    response.json().then(data => {

                        this.setState({ isLoading: false })
                        AsyncStorage.setItem("UploadReceipt", JSON.stringify(true))
                        setTimeout(() => {
                            Alert.alert(
                                '',
                                data.response_message,
                                [
                                    { text: 'OK', onPress: () => this.props.navigation.navigate("RecieptHistory") },
                                ],
                                { cancelable: false },
                            );
                        }, 200);

                    })
                        .catch((error) => {

                        });
                })
        }





    }
    render() {
        return (

            <View style={{ flex: 1 }} >
                <CustomHeader
                    Size={"medium"} backicon={true} goback={() => this.props.navigation.goBack()} Bellicon={NavigationIcons.bellicon} backicon={NavigationIcons.backicon} Title="Upload Receipt" />

                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ alignSelf: 'center', marginTop: wp('2%') }} >
                        <Image source={{ uri: this.state.receipt }} style={styles.uploadReceipt} />
                    </View>
                    <View style={{}}>




                        <TouchableOpacity
                            onPress={() => this.imageUpload()} //yaha se pass hogi v

                            style={{
                                marginTop: wp('10%'),
                                marginLeft: wp("60%"),
                                alignSelf: "stretch",
                                backgroundColor: '#23a7fa',
                                width: wp("35%"),
                                height: hp("4%"),
                                borderTopLeftRadius: 13,
                                borderBottomLeftRadius: 13
                            }}
                        >
                            <Text style={{ color: 'white', alignSelf: 'center', marginLeft: wp('2%'), marginTop: wp('1%'), fontWeight: '700' }}>UPLOAD RECEIPT</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: wp('72%'), flexDirection: 'row', alignSelf: 'center', justifyContent: 'space-between', marginTop: wp('10%') }}>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('RecieptHistory')}
                            style={{
                                width: wp('35%'),
                                height: hp('7%'),
                                alignItems: 'center',
                                borderWidth: 2,
                                borderColor: '#23a7fa',
                                borderRadius: 25,
                                justifyContent: 'center'
                            }}>
                            <Text style={{ color: '#23a7fa', fontWeight: '700' }}> C A N C E L</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.uploadReceiptApi()}
                            style={{
                                width: wp('35%'),
                                backgroundColor: '#23a7fa',
                                height: hp('7%'),
                                alignItems: 'center',
                                borderWidth: 2,
                                borderColor: '#23a7fa',
                                borderRadius: 25,
                                justifyContent: 'center'
                            }}

                        >
                            <Text style={{ color: '#ffffff', fontWeight: '700' }}> S A V E</Text>
                        </TouchableOpacity>
                    </View>
                    <Loader
                        visible={this.state.isLoading}


                    />
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



export default connect(mapStateToProps,

)(withNavigationFocus(UploadReceipt));
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
    uploadReceipt: {
        backgroundColor: 'white',
        width: wp('80%'),
        height: wp('100%')
    }
});



