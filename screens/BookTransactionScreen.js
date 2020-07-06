import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default class TransactionScreen extends React.Component {

  constructor(){
    state = {
      hasCameraPermission: null,
      scanned: false, 
      scannedData:"",
      buttonState:"normal",
    };
  }

  async getCameraPermission(){
    const {status} = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === "granted",
      buttonState: "clicked",
    })
  }

    handleBarCodeScanned = async({type, data})=>{
      this.setState({
        scannedData:data,
        scanned: true,
        buttonState:"normal"
      })
    }

    render() {
      const buttonState = this.state.buttonState
      const hasCameraPermission = this.state.hasCameraPermission
      const scanned = this.state.scanned

      if (buttonState === "clicked" && hasCameraPermission === true){
        return(
          <BarCodeScanner 
          onBarCodeScanned={scanned? undefined:this.handleBarCodeScanned}>

          </BarCodeScanner>
        )
      }else if(buttonState === "normal"){
        return (
        <View style={styles.container}>

      <Text style={styles.displayText}>{hasCameraPermission === true? this.state.scannedData:"request camera permission" }</Text>

        <TouchableOpacity 
        style={styles.scanButton}
        onPress={this.getCameraPermission}>
        <Text>Scan your code</Text>
        </TouchableOpacity>

        </View>
      );
    }
      }
  }

const styles=StyleSheet.create({
  container:{
    flex: 1, justifyContent: 'center', alignItems: 'center' 
  },
  displayText:{
    fontSize: 20,
    textDecorationLine: "underline",
  },
  scanButton:{
    width:60,
    height: 40,
    padding: 10,
    margin: 10,
  },
  BarCodeScanner:{
    alignItems: "center",
  }
});
