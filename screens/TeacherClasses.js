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

import db from '../config';
import firebase from 'firebase';

import { ListItem } from 'react-native-elements'

import AppHeader from '../components/AppHeader';

// import { ActivityIndicator } from 'react-native-paper'

export default class ClassesAndSearch extends React.Component {
    constructor() {
        super()

        this.state = {
            accountType: '',
            classList : [],
            isLoaded: false
        }

        this.requestRef = null;
    }

    getAccountType=()=> {
        var email = firebase.auth().currentUser.email;
        db.collection('users').where('email_id','==',email).get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                var data = doc.data()
                this.setState({
                accountType: data.account_type
            })
        });
    })
    }

    getClassList=()=>{
        var user = firebase.auth().currentUser
        this.requestRef = db.collection("classes").where('userId', '==', user.uid)
        .onSnapshot((snapshot)=>{
          var classList = snapshot.docs.map((doc) => doc.data())
          this.setState({
            classList : classList
          });
        })
    }


    componentDidMount() {
        this.getAccountType()
        this.getClassList()
    }

    componentWillUnmount() {
        this.requestRef()
    }

    keyExtractor = (item, index) => index.toString()

  renderItem = ( {item, i} ) =>{
    return (
      <ListItem
        key={i}
        title={item.class_name}
        subtitle={<Text style={{color: "#797979", fontSize: 18}}>Subject: {item.class_subject}{"\n"}For Class(s): {item.class_standard}</Text>}
        titleStyle={{ color: 'black', fontWeight: 'bold', fontSize: 25,  marginBottom: 10 }}
        // leftElement={
        //   <Image
        //     style={{height: 50, width: 50}}
        //     source={{uri: item.image_link}}
        //   />
        // }
        // rightElement={
        //     <TouchableOpacity style={styles.button}
        //       onPress ={()=>{
        //         this.props.navigation.navigate("RecieverDetails",{"details": item})
        //       }}
        //       >
        //       <Text style={{color:'#ffff'}}>View</Text>
        //     </TouchableOpacity>
        //   }
        bottomDivider
      />
    )
  }

    render() {
        return (
            <View style={{flex: 1, marginTop: 20}}>
                <AppHeader title="Your Classes" navigation={this.props.navigation} style={{marginTop: -30}} />
                <FlatList
                    keyExtractor={this.keyExtractor}
                    renderItem={this.renderItem}
                    data={this.state.classList}
                />
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