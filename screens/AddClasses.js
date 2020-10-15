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
    ScrollView,
    FlatList
} from 'react-native';

import AppHeader from '../components/AppHeader'

import db from '../config';
import firebase from 'firebase';

export default class AddClasses extends React.Component {
    constructor() {
        super()

        this.state = {
            userId: firebase.auth().currentUser.email,

            teacherClassName: '',
            teacherClassSubject: '',
            teacherClassStandard: '',
            teacherClassContact: '',
            teacherClassEmail: '',
            teacherClassAddress: '',
        }
    }

    createUniqueId() {
        return Math.random().toString(36).substring(7);
    }

    saveClassData = (className, classSubject, classStandard, classContact, classEmail, classAddress) => {
        var userId = firebase.auth().currentUser.uid
        // var docId = this.createUniqueId()
        db.collection("classes").add({
            "userId": userId,
            "class_name": className,
            "class_subject": classSubject,
            "class_standard": classStandard,
            "class_contact": classContact,
            "class_email": classEmail,
            "class_address": classAddress,
            // "id": docId
        })

        this.setState({
            teacherClassName: '',
            teacherClassSubject: '',
            teacherClassStandard: '',
            teacherClassContact: '',
            teacherClassEmail: '',
            teacherClassAddress: ''
        })

        return Alert.alert("Data Added Successfully")
    }

    render() {
        return(
            <View style={styles.container}>
                <ScrollView>
                        {/* <KeyboardAvoidingView style={styles.KeyboardAvoidingView}> */}
                        <AppHeader title="Add Class" navigation={this.props.navigation} style={{marginTop: -30}} />
                        <TextInput
                            style={styles.inputBox}
                            placeholder ={"Class Name"}
                            maxLength ={8}
                            onChangeText={(text)=>{
                                this.setState({
                                teacherClassName: text
                            })
                            }}
                        />
                        {/* Maths, Physics, Chemistry, Biology, English, History, Civics, Geography, Hindi, Computer, Music, Art*/}
                        <TextInput
                            style={styles.inputBox}
                            placeholder ={"Subject"}
                            maxLength ={8}
                            onChangeText={(text)=>{
                                this.setState({
                                teacherClassSubject: text
                            })
                            }}
                        />
                        <TextInput
                            style={styles.inputBox}
                            placeholder ={"What Standards Is This Class For?"}
                            maxLength ={2}
                            keyboardType={'numeric'}
                            onChangeText={(text)=>{
                                this.setState({
                                teacherClassStandard: text
                            })
                            }}
                        />
                        <TextInput
                            style={styles.inputBox}
                            placeholder ={"Displayed Phone Number"}
                            maxLength ={10}
                            keyboardType={'numeric'}
                            onChangeText={(text)=>{
                                this.setState({
                                teacherClassContact: text
                            })
                            }}
                        />
                        <TextInput
                            style={styles.inputBox}
                            placeholder ={"Displayed Email Address"}
                            multiline = {true}
                            onChangeText={(text)=>{
                                this.setState({
                                teacherClassEmail: text
                            })
                            }}
                        />
                        <TextInput
                            style={styles.inputBox}
                            placeholder ={"Location"}
                            multiline = {true}
                            onChangeText={(text)=>{
                                this.setState({
                                teacherClassAddress: text
                            })
                            }}
                        />
                         <TouchableOpacity
                            style={styles.button}
                            onPress={()=>
                                this.saveClassData(this.state.teacherClassName, this.state.teacherClassSubject, this.state.teacherClassStandard, this.state.teacherClassContact, this.state.teacherClassEmail, this.state.teacherClassAddress)
                            }>
                            <Text style={styles.buttonText}>Add Class</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => { this.props.navigation.navigate('ClassesAndSearch') }}
                        >
                        <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                        {/* </KeyboardAvoidingView> */}
                    </ScrollView>
                </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "#fff",
        alignItems: 'center',
        marginTop: 50,
        justifyContent: 'center'
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
    },
    KeyboardAvoidingView:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    inputBox: {
        width: 300,
        height: 50,
        borderBottomWidth: 1.5,
        borderColor : '#ff8a65',
        fontSize: 18,
        margin:10,
        paddingLeft: 10
    },
    modalTitle: {
        alignSelf:'center',
        fontSize:30,
        color:'#ff5722',
        marginTop:10
    }
})