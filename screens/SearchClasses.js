import React,{Component}from 'react';
import {
    View,
    Text,
    TextInput,
    Modal,
    KeyboardAvoidingView,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Alert,
    ScrollView} from 'react-native';

import db from '../config';
import firebase from 'firebase';

export default class SearchClasses extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            allClasses: [],
            lastVisibleClass: null,
            search: ""
        }
    }

    fetchMoreClasses = async () => {
        var text = this.state.search.toUpperCase()
        var enteredText = text.split("")

        if(enteredText[0].toUpperCase === "M" /* Maths */ ) {
            const query = await db.collection('classes').where('class_subject', '==', text)
            .startAfter(this.state.lastVisibleClass)
            .limit(10)
            .get()

            query.docs.map((doc) => {
                this.setState({
                    allClasses: [...this.state.allClasses, doc.data()],
                    lastVisibleClass: doc
                })
            })
        } else if(enteredText[0].toUpperCase === "P" /* Physics */ ) {
            const query = await db.collection('classes').where('class_subject', '==', text)
            .startAfter(this.state.lastVisibleClass)
            .limit(10)
            .get()

            query.docs.map((doc) => {
                this.setState({
                    allClasses: [...this.state.allClasses, doc.data()],
                    lastVisibleClass: doc
                })
            })
        } else if(enteredText[0].toUpperCase === "C" /* Chemistry */ ) {
            const query = await db.collection('users').where('subject', '==', text)
            .startAfter(this.state.lastVisibleClass)
            .limit(10)
            .get()

            query.docs.map((doc) => {
                this.setState({
                    allClasses: [...this.state.allClasses, doc.data()],
                    lastVisibleClass: doc
                })
            })
        }else if(enteredText[0].toUpperCase === "B" /* Biology */) {
            const query = await db.collection('classes').where('class_subject', '==', text)
            .startAfter(this.state.lastVisibleClass)
            .limit(10)
            .get()

            query.docs.map((doc) => {
                this.setState({
                    allClasses: [...this.state.allClasses, doc.data()],
                    lastVisibleClass: doc
                })
            })
        } 
        // else if(enteredText[0].toUpperCase === "E" /** English */) {
        //     const query = await db.collection('classes').where('class_subject', '==', text)
        //     .startAfter(this.state.lastVisibleClass)
        //     .limit(10)
        //     .get()

        //     query.docs.map((doc) => {
        //         this.setState({
        //             allClasses: [...this.state.allClasses, doc.data()],
        //             lastVisibleClass: doc
        //         })
        //     })
        // } else if(enteredText[0].toUpperCase === "H" /* History */) {
        //     const query = await db.collection('classes').where('class_subject', '==', text)
        //     .startAfter(this.state.lastVisibleClass)
        //     .limit(10)
        //     .get()

        //     query.docs.map((doc) => {
        //         this.setState({
        //             allClasses: [...this.state.allClasses, doc.data()],
        //             lastVisibleClass: doc
        //         })
        //     })
        // } else if(enteredText[0].toUpperCase + enteredText[1].toUpperCase === "Ci") {
        //     const query = await db.collection('classes').where('class_subject', '==', text)
        //     .startAfter(this.state.lastVisibleClass)
        //     .limit(10)
        //     .get()

        //     query.docs.map((doc) => {
        //         this.setState({
        //             allClasses: [...this.state.allClasses, doc.data()],
        //             lastVisibleClass: doc
        //         })
        //     })
        // }
    }
    
    searchClasses = async (text) => {

        if(text.toUpperCase().includes("COMP")){
            var subject = "Computer"
            const classes = await db.collection("classes").where("class_subject","==",subject).get()
            classes.docs.map((doc) => {
                console.log(doc.data())
                this.setState({
                    allClasses: [...this.state.allClasses, doc.data()],
                    lastVisibleClass: doc
                })
            })
        }
        // /*var enteredText = text.split("")
        
        // if(enteredText[0].toUpperCase() === "M" /* Maths */ ) {
        //     const classes = await db.collection("classes").where('class_subject', '==', text).get()
        //     classes.docs.map((doc) => {
        //         this.setState({
        //             allClasses: [...this.state.allClasses, doc.data()],
        //             lastVisibleClass: doc
        //         })
        //     })
        // } else if(enteredText[0].toUpperCase() === "P" /* Physics */ ) {
        //     const classes = await db.collection("classes").where('class_subject', '==', text).get()
        //     classes.docs.map((doc) => {
        //         this.setState({
        //             allClasses: [...this.state.allClasses, doc.data()],
        //             lastVisibleClass: doc
        //         })
        //     })
        // } else if(enteredText[0].toUpperCase + enteredText[1].toUpperCase === "Ci") {
        //     const classes = await db.collection("classes").where('class_subject', '==', text).get()
        //     classes.docs.map((doc) => {
        //         this.setState({
        //             allClasses: [...this.state.allClasses, doc.data()],
        //             lastVisibleClass: doc
        //         })
        //     })
        // } else if(enteredText[0].toUpperCase() === "B" /* Biology */ ) {
        //     const classes = await db.collection("classes").where('class_subject', '==', text).get()
        //     classes.docs.map((doc) => {
        //         this.setState({
        //             allClasses: [...this.state.allClasses, doc.data()],
        //             lastVisibleClass: doc
        //         })
        //     })
        // }
    }

    componentDidMount = async() => {
        const query = await db.collection('classes').limit(10).get()
        query.docs.map((doc) => {
            this.setState({
                allClasses: [],
                lastVisibleClass: doc
            })
        })
    }

    render() {
        return(
            <View style={{flex: 1, alignItems: 'center', textAlign: 'center'}}>
                <View style={styles.searchBar}>
                    <TextInput style={styles.searchInput} placeholder="Enter Search Query" 
                    onChangeText={(text) => {this.setState({search: text})}}
                    />
                    <TouchableOpacity style={styles.searchBtn} onPress={() => {this.searchClasses(this.state.search)}}><Text>Search</Text></TouchableOpacity>
                </View>

                <FlatList data={this.state.allClasses}
                renderItem={({item}) => (
                    <View style={{borderBottomWidth: 3}}>
                        <Text>{"Class Name: " + item.class_name}</Text>
                        <Text>{"Subject: " + item.class_subject}</Text>
                        <Text>{"Class: " + item.class_standard}</Text>
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
                onEndReached={this.fetchMoreClasses}
                onEndReachedThreshold={0.7}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    searchBar: {
        flexDirection: 'row',
        height: 40, 
        width: 'auto',
        borderWidth: 0,
        alignItems: 'center', 
        backgroundColor: 'white',
        marginTop: 100
    },
    searchInput: {
        borderWidth: 2,
        height: 50,
        width: 300,
        marginLeft: 70,
        paddingLeft: 10,
        borderRadius: 5 
    },
    searchBtn: {
        borderWidth: 1, 
        height: 50,
        width: 100,
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: 'white',
        right: 100,
        marginTop: 110,
        borderRadius: 5
    }
})