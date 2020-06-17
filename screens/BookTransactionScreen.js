import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity,Image,TextInput } from 'react-native';
import * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner';


export default class BookTransactionScreen extends React.Component{
    constructor()
    {
        super();
        this.state={
            hasCameraPermissions:null,
            scanned:false,
            scannedData:'',
            scannedBookid:'',
            scannedStudentid:'',
            buttonState:'normal',
        }
    }

    getCameraPermission=async(id)=>{
        const {status}=await Permissions.askAsync(Permissions.CAMERA);

        this.setState({
            hasCameraPermissions:status==="granted",
            buttonState:id,
            scanned:false
        });
    }
    handleBarCodeScanned = async({type, data})=>{
        const {buttonState} = this.state
  
        if(buttonState==="BookId"){
          this.setState({
            scanned: true,
            scannedBookid: data,
            buttonState: 'normal'
          });
        }
        else if(buttonState==="StudentId"){
          this.setState({
            scanned: true,
            scannedStudentid: data,
            buttonState: 'normal'
          });
        }
        
      }
    render(){
        const hasCameraPermissions=this.state.hasCameraPermissions;
        const scanned=this.state.scanned;
        const buttonState=this.state.buttonState;
        if(buttonState !=='normal'&&hasCameraPermissions){
            return(
                <BarCodeScanner onBarCodeScanned={scanned?undefined:this.handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}/>
            )
        }
        else if(buttonState==="normal")
        {
        return(
            <View style={styles.container}>
<View>
    <Image source={require("../assets/booklogo.jpg")}
    style={{width:200,height:200}}/>
    <Text style={{textAlign:'center',fontSize:30}}>Willy</Text>
</View>



                <View style={styles.inputView}>
               <TextInput style={styles.inputBox}
               placeholder="Book ID"
               value={this.state.scannedBookid}/>
                <TouchableOpacity style={styles.scanButton}
                onPress={()=>{
                    this.getCameraPermission("BookId");
                }}>
               
                    <Text style={styles.buttonText}>Scan </Text>
                </TouchableOpacity>
               </View>
               <View style={styles.inputView}>
               <TextInput style={styles.inputBox}
               placeholder="Student ID"
               value={this.state.scannedStudentid}/>
                <TouchableOpacity style={styles.scanButton}
                 onPress={()=>{
                    this.getCameraPermission("StudentId");
                }}>
               
                    <Text style={styles.buttonText}>Scan </Text>
                </TouchableOpacity>
               </View>
            </View>
        );
    }}
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    displayText:{
        fontSize:15,
        textDecorationLine:'underline'
    },
    scanButton:{
        backgroundColor:'#66BB6A',
        width:50,
        borderWidth:1.5,
        borderLeftWidth:0,
    },
    buttonText:{
        fontSize:15,
        textAlign:'center',
        marginTop:10,
    },
    inputView:{
        flexDirection:'row',
        margin:20,
    },
    inputBox:{
        width:200,
        height:40,
        borderWidth:1.5,
        borderRightWidth:0,
        fontSize:20,
    },

})