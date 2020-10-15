import React,{Component}from 'react';
import {
    View,
    Text,
    TextInput,
    Modal,
    KeyboardAvoidingView,
    StyleSheet,
    TouchableOpacity,
    Alert,
    ScrollView} from 'react-native';

import db from '../config';
import firebase from 'firebase';

export default class LoginScreen extends React.Component {
    constructor() {
        super()

        this.state = {
            email: "",
            password: ""
        }
    }

    userLogin = (email, password)=>{
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(()=>{
          Alert.alert("Logged In Successfully")
          db.collection('users').where('email_id', '==', email).get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    var data = doc.data()
                    if(data.account_type == "student") {
                        this.props.navigation.navigate('SearchClasses')
                    } else if(data.account_type == "teacher") {
                        this.props.navigation.navigate('AddClasses')
                    } else {
                        this.props.navigation.navigate('AddData')
                    }
                })
            })
        })
        .catch((error)=> {
          var errorCode = error.code;
          var errorMessage = error.message;
          return Alert.alert(errorMessage)
        })
      }

    render() {
        return (
            <View style={styles.container}>

                <Text style={styles.header}>Login</Text>

                <TextInput
                    style={styles.inputBox}
                    placeholder="Email Id"
                    keyboardType="email-address"
                    onChangeText={text => {
                        this.setState({email: text})
                    }}
                />
                <TextInput
                    style={styles.inputBox}
                    placeholder="Password"
                    secureTextEntry={true}
                    onChangeText={text => {
                        this.setState({password: text})
                    }}
                />
                <TouchableOpacity style={styles.button} onPress={() => {
                    this.userLogin(this.state.email, this.state.password)
                    this.props.navigation.navigate('')
                }}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => {
                    this.props.navigation.navigate('Signup')
                }}>
                    <Text style={styles.buttonText}>Or Signup</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        marginTop: 50,
    },
    header: {
        fontSize: 35,
        color: '#ff5400',
        marginTop: 30,
        marginBottom: 40
    },
    inputBox: {
        width: 300,
        height: 50,
        borderBottomWidth: 1.5,
        borderColor : '#ff8a65',
        fontSize: 20,
        margin:10,
        paddingLeft: 10
    },
    button: {
        width:300,
        height:50,
        justifyContent:'center',
        alignItems:'center',
        borderRadius: 20,
        marginTop: 20,
        backgroundColor:"#ff9800",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.30,
        shadowRadius: 10.32,
        elevation: 16,
        padding: 10
    },
    buttonText: {
        color:'#ffff',
        fontWeight:'200',
        fontSize:18
    }
})