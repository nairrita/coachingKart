import React, { Component} from 'react';
import { Header,Icon,Badge } from 'react-native-elements';
import { View, Text, StyeSheet ,Alert} from 'react-native';
import db from '../config'

export default class AppHeader extends Component{
  constructor(props){
    super(props)
    this.state={
      value:4
    }
  }

// getNumberOfUnreadNotifications(){
//   db.collection('all_notifications').where('notification_status','==',"unread")
//   .onSnapshot((snapshot)=>{
//     var unreadNotifications = snapshot.docs.map((doc) => doc.data())
//     this.setState({
//       value: unreadNotifications.length
//     })
//   })
// }

// componentDidMount(){
//   this.getNumberOfUnreadNotifications()
// }


 BellIconWithBadge=()=>{
    return(
      <View>
        <Icon name='bell' type='font-awesome' color='#fff' size={25}
          onPress={() =>this.props.navigation.navigate('Notification')} containerStyle={{marginBottom: 10}} 
        />
        <Badge
            value={this.state.value}
            containerStyle={{ position: 'absolute', top: -4, right: -4 }}
        />
      </View>
    )
  }

  render(){
    return(
        <Header
          leftComponent={<Icon name='bars' type='font-awesome' color='#fff' containerStyle={{marginBottom: 10}} onPress={() => this.props.navigation.toggleDrawer()}/>}
          centerComponent={{ text: this.props.title, style: { color: '#fff', fontSize:30,fontWeight:"bold", marginBottom: 15} }}
          rightComponent={<this.BellIconWithBadge {...this.props}/>}
          backgroundColor = "#ff5400"
        />

)
}

}