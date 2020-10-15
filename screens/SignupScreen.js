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
            password: "",
            confirmedPassword: ""
        }
    }

    userSignUp = (email, password, confirmedPassword) => {
        if(password !== confirmedPassword){
            return Alert.alert("password doesn't match\nCheck your password.")
        } else {
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(() => {
                    db.collection('users').add({
                        "email_id": email,
                    })
                    .then(() => {
                        return Alert.alert("Account Created Successfuly")
                    })
                })
                .catch((error) => {
                    console.log(error)
                })
        }
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
                
                <TextInput
                    style={styles.inputBox}
                    placeholder="Confirm Password"
                    secureTextEntry={true}
                    onChangeText={text => {
                        this.setState({confirmedPassword: text})
                    }}
                />

                <TouchableOpacity style={styles.button} onPress={() => {
                    this.userSignUp(this.state.email, this.state.password, this.state.confirmedPassword)
                    this.props.navigation.navigate('Login')
                }}>
                    <Text style={styles.buttonText}>Create Account</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => {
                    this.props.navigation.navigate('Login')
                }}>
                    <Text style={styles.buttonText}>Or Login</Text>
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