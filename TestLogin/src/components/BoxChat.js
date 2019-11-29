import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import { Input, Button } from 'react-native-elements'
import io from 'socket.io-client';
import Context from '../services/context';

const socket = io('http://localhost:3000');

const BoxChat = () => {
  const [messages, setMessages] = useState([]);
  const [chatInputContent, setChatInputContent] = useState("");
  const [ isSending, setIsSending ] = useState(false);
  const { user, setTitle } = useContext(Context);
  
  setTitle("PHÒNG CHAT");
  socket.on('receive-message',msg => setMessages([...messages, msg]));
  
  const renderChatLine = (item) => {
    if (item.username === user.username) {
      return (
        <View style={{ alignItems: 'flex-end' }} >
           <View style={ styles.send } >
          <Text style ={{color: 'white'}}>{item.chatContent}</Text>
      </View>
        </View>
      );
    }
    return (
      <View style={styles.receive} >
        <Text style={{ color: 'black', marginBottom: 5, fontSize:16, fontWeight:"bold" }} >{item.username}</Text>
        <Text style ={{color: '#323232'}}>{item.chatContent}</Text>
    </View>
    );
  };
  const onSend = () => {
    if(chatInputContent === "") return;
    setIsSending(true);
    setChatInputContent("");
    socket.emit('send-message', {
      username: user.username,
      chatContent: chatInputContent,
    })
  }
  useEffect(() => {
    socket.emit('receive-all-messages');
    socket.on('receive-all-messages',msgs => setMessages(msgs));
    socket.on('sended', () => setIsSending(false));
    return () =>  {
      socket.off('receive-message');
      socket.off('receive-all-messages');
      socket.off('sended');
    }
  }, [])
  return (
    <View testID = "view-chat" style={styles.container} >
      <View 
        style={{ flex: 9 / 10, backgroundColor: 'white', flexDirection: 'column', justifyContent: 'flex-end' }} >
        <FlatList data={messages.slice().reverse()} renderItem={({ item }) => renderChatLine(item)}
          keyExtractor={(e, i) => i.toString()} inverted = {-1}
        />
      </View>
      <View style={{ flex: 1 / 10 }} >
        <View style={styles.footer}  >
          <View style={{ flex: 8 / 10 }} >
            <Input testID ="input-message" placeholder="Nhập nội dung chat" value={chatInputContent}
              onChangeText={(text) => setChatInputContent(text)} style={{ height: 100, fontSize: 18 }} />
          </View>
          <View style={{ flex: 2 / 10 }} >
            <Button
              testID ="btn-send-message"
              title="Gửi"
              onPress={onSend}
              loading = {isSending}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: 'column', justifyContent: 'flex-end' },
  footer: {
    paddingLeft: 5,
    paddingRight: 10,
    flexDirection: 'row', backgroundColor: '#FFF',
    width: '100%', height: '100%', justifyContent: 'space-around', alignItems: 'center', marginLeft: 2
  },
  send: {
    flexDirection: 'column', width: '50%', alignItems: 'flex-start',
    padding: 8, backgroundColor: '#2089dc', borderRadius: 8,marginBottom : 10,marginTop : 10,marginLeft : 5,marginRight : 5
  },
  receive: {
    flexDirection: 'column', width: '50%', alignItems: 'flex-start',
    padding: 8, backgroundColor: '#f1f0f0', borderRadius: 8,marginBottom : 10,marginTop : 10,marginLeft : 5,marginRight : 5
  }
})

export default BoxChat;

