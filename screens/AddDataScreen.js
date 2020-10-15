import React,{Component}from 'react';
import {
    View,
    Text,
    TextInput,
    Modal,
    KeyboardAvoidingView,
    StyleSheet,
    TouchableOpacity,
    Image,
    Alert,
    ScrollView,
} from 'react-native';

import db from '../config';
import firebase from 'firebase';

export default class AddDataScreen extends React.Component {
    constructor() {
        super()

        this.state = {

            userId: firebase.auth().currentUser.email,
            userDocId: "",

            isTeacherModalVisible: false,
            isStudentModalVisible: false,

            teacherFirstName: "",
            teacherLastName: "",
            teacherContact: "",
            teacherAddress: "",
            subject: " ",

            studentFirstName: "",
            studentLastName: "",
            studentContact: "",
            studentAddress: "",
            studentClass: 0,
            studentSchool: ""
        }
    }

    getDocId = () => {
        var query = db.collection('users')
        .where('email_id', '==', this.state.userId)
        .get()
        .then((snapshot) => {
            snapshot.forEach((doc) => {
                this.setState({
                    userDocId: doc.id
                })
            })
        console.log(this.state.userDocId)
        })
    }

    saveTeacherData = () => {
        db.collection('users').doc(this.state.userDocId).update({
            "first_name": this.state.teacherFirstName,
            "last_name": this.state.teacherLastName,
            "contact": this.state.teacherContact,
            "address": this.state.teacherAddress,
            "subject": this.state.subject,
            "account_type": "teacher"
        })
        .then((response) => {
            console.log(response)
            Alert.alert('Data added successfully')
            this.props.navigation.navigate('TeacherClasses')
        })
        .catch((err) => {console.log(err)})
    }

    saveStudentData = () => {
        db.collection('users').doc(this.state.userDocId).update({
            "first_name": this.state.studentFirstName,
            "last_name": this.state.studentLastName,
            "contact": this.state.studentContact,
            "address": this.state.studentAddress,
            "student_class": this.state.studentClass,
            "student_school": this.state.studentSchool,
            "account_type": "student"
        })
        .then((response) => {
            console.log(response)
            Alert.alert('Data added successfully')
            this.props.navigation.navigate('SearchScreen')
        })
        .catch((err) => {console.log(err)})
    }

    showTeacherModal = () => {
        return(
            <Modal
            animationType="fade"
            transparent={true}
            visible={this.state.isTeacherModalVisible}>
                <View style={styles.modalContainer}>
                    <ScrollView style={{width:'100%', height: '100%'}}>
                        {/* <KeyboardAvoidingView style={styles.KeyboardAvoidingView}> */}
                        <Text style={styles.modalTitle}>Registration</Text>
                        <TextInput
                            style={styles.inputBox}
                            placeholder ={"First Name"}
                            maxLength ={8}
                            onChangeText={(text)=>{
                                this.setState({
                                teacherFirstName: text
                            })
                            }}
                        />
                        <TextInput
                            style={styles.inputBox}
                            placeholder ={"Last Name"}
                            maxLength ={8}
                            onChangeText={(text)=>{
                                this.setState({
                                teacherLastName: text
                            })
                            }}
                        />
                        <TextInput
                            style={styles.inputBox}
                            placeholder ={"Contact"}
                            maxLength ={10}
                            keyboardType={'numeric'}
                            onChangeText={(text)=>{
                                this.setState({
                                teacherContact: text
                            })
                            }}
                        />
                        <TextInput
                            style={styles.inputBox}
                            placeholder ={"Address"}
                            multiline = {true}
                            onChangeText={(text)=>{
                                this.setState({
                                teacherAddress: text
                            })
                            }}
                        />
                        <TextInput
                            style={styles.inputBox}
                            placeholder ={"Subject"}
                            
                            onChangeText={(text)=>{
                                this.setState({
                                subject: text
                            })
                            }}
                        />
                         <TouchableOpacity
                            style={styles.button}
                            onPress={()=>
                                this.saveTeacherData()
                            }>
                            <Text style={styles.buttonText}>Register</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => { this.setState({isTeacherModalVisible: false}) }}
                        >
                        <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                        {/* </KeyboardAvoidingView> */}
                    </ScrollView>
                </View>
            </Modal>
        )
    }

    showStudentModal = () => {
        return(
            <Modal
            animationType="fade"
            transparent={true}
            visible={this.state.isStudentModalVisible}>
                <View style={styles.modalContainer}>
                    <ScrollView style={{width:'100%', height: '100%'}}>
                        {/* <KeyboardAvoidingView style={styles.KeyboardAvoidingView}> */}
                        <Text style={styles.modalTitle}>Registration</Text>
                        <TextInput
                            style={styles.inputBox}
                            placeholder ={"First Name"}
                            maxLength ={8}
                            onChangeText={(text)=>{
                                this.setState({
                                studentFirstName: text
                            })
                            }}
                        />
                        <TextInput
                            style={styles.inputBox}
                            placeholder ={"Last Name"}
                            maxLength ={8}
                            onChangeText={(text)=>{
                                this.setState({
                                studentLastName: text
                            })
                            }}
                        />
                        <TextInput
                            style={styles.inputBox}
                            placeholder ={"School Name"}
                            maxLength ={50}
                            onChangeText={(text)=>{
                                this.setState({
                                studentSchool: text
                            })
                            }}
                        />
                        <TextInput
                            style={styles.inputBox}
                            placeholder ={"Contact"}
                            maxLength ={10}
                            keyboardType={'numeric'}
                            onChangeText={(text)=>{
                                this.setState({
                                studentContact: text
                            })
                            }}
                        />
                        <TextInput
                            style={styles.inputBox}
                            placeholder ={"Class"}
                            maxLength ={2}
                            keyboardType={'numeric'}
                            onChangeText={(text)=>{
                                this.setState({
                                studentClass: text
                            })
                            }}
                        />
                        <TextInput
                            style={styles.inputBox}
                            placeholder ={"Address"}
                            multiline = {true}
                            onChangeText={(text)=>{
                                this.setState({
                                studentAddress: text
                            })
                            }}
                        />
                         <TouchableOpacity
                            style={styles.button}
                            onPress={()=>
                                this.saveStudentData()
                            }>
                            <Text style={styles.buttonText}>Register</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => { this.setState({isStudentModalVisible: false}) }}
                        >
                        <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                        {/* </KeyboardAvoidingView> */}
                    </ScrollView>
                </View>
            </Modal>
        )
    }

    componentDidMount() {
        this.getDocId()
    }
    
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.header}>Who Are You,{"\n"}Fellow Human?</Text>
                <View style={{justifyContent: 'center',alignItems: 'center'}}>
                    {
                        this.showTeacherModal()
                    }
                    {
                        this.showStudentModal()
                    }
                </View>
  
                <View style={{ justifyContent: 'center' }}>
                <Text style={[styles.header, { fontSize: 30 } ]}>I am</Text>
                    <TouchableOpacity style={[styles.button, { marginTop: 20, height: 80 }]} onPress={() => { this.setState({isStudentModalVisible: true}) }}>
                        {/* <Image source={} /> */}
                        <Text style={[styles.buttonText, { fontSize: 20 }]}>A Student</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity style={[styles.button, { marginTop: 40, height: 80 }]} onPress={() => { this.setState({isTeacherModalVisible: true}) }}>
                        {/* <Image source={} /> */}
                        <Text style={[styles.buttonText, { fontSize: 20 }]}>A Teacher</Text>
                    </TouchableOpacity>
                </View>
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
    modalContainer:{
        flex:1,
        borderRadius:20,
        alignItems:'center',
        backgroundColor:"#ffff",
        marginRight:20,
        marginLeft : 20,
        marginTop: 20,
        paddingBottom: 60
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
        fontSize: 20,
        margin:10,
        paddingLeft: 10
    },
    modalTitle :{
        justifyContent:'center',
        alignSelf:'center',
        fontSize:30,
        color:'#ff5722',
        margin:50
    },
    header: {
        fontSize: 35,
        color: '#ff5400',
        marginTop: 30,
        marginBottom: 40,
        alignItems: 'center',
        textAlign: 'center',
    },
})