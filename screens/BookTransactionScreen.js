import React from 'react';
import {Text,View,TouchableOpacity, StyleSheet} from 'react-native';
import {BarCodeScanner} from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions';

export default class BookTransactionScreen extends React.Component{
    constructor(){
        super();
        this.state = {
            hasCameraPermissions: null,
            scanned: false,
            scanData: '',
            buttonState: "normal",
        }
    }
    getCameraPermission = async() =>{
        const {status} = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
            /*status === 'granted' is true when user has granted permission
            status==='granted' is false when user has not given permission*/ 
            hasCameraPermissions: status === 'granted',
            buttonState: "clicked"
        })
    }
    handleBarCodeScanned= async({type,data})=>{
        this.setState({
            scanned: true,
            scanData: data,
            buttonState: "normal"
        })
    }
    render(){
        const hasCameraPermissions = this.state.hasCameraPermissions;
        const scanned = this.state.scanned;
        const buttonState = this.state.buttonState;
        if(buttonState === "clicked" && hasCameraPermissions){
            return(
                <BarCodeScanner 
                onBarCodeScanned = {scanned? undefined : this.handleBarCodeScanned}
                style = {StyleSheet.absoluteFilledObject}/>
            )
        }
        else if(buttonState === "normal"){
            return(
                <View style = {styles.container}>
                    <Text style = {styles.displayText}>
                        hasCameraPermissions === true? this.state.scanData: "Request camera permission"</Text>
                    <TouchableOpacity style = {styles.scanButton} onPress = {this.getCameraPermission}>
                        <Text style = {styles.buttonText}>Scan QR Code</Text>
                    </TouchableOpacity>
                </View>
            )
        }   
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    displayText: {
        fontSize: 15,
        textDecorationLine: 'underline'
    },
    scanButton: {
        backgroundColor: '#2196F3',
        padding: 10,
        margin: 10
    },
    buttonText: {
        fontSize:20
    }
})