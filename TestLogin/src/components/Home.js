import React, {useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import { Text, Button } from 'react-native-elements'
import {Link, useHistory} from 'react-router-native';
import Context from '../services/context';
import withContainer from './withContainer';

const Home = () => {
	const {user, setTitle} = useContext(Context);
    const history = useHistory();
	setTitle("TRANG CHỦ");
	if(!user.username)
		return (
			<View testID ="home" style={styles.container}>
                    <Text style={styles.text}>Bạn chưa đăng nhập! Hãy </Text>
					<Link testID ="tap-login" to="/login"><Text style={styles.textLink}>Đăng nhập</Text></Link>
					<Text style={styles.text}> hoặc </Text>
                    <Link testID ="tap-signup" to="/signup"><Text style={styles.textLink}>Đăng ký</Text></Link>
					<Text style={styles.text}> để tiếp tục ! </Text>
			</View>
		);
	return (
			<View testID ="home-logged">
				<Text style={styles.text}>Xin chào {user.fullname} !</Text>
				<Text style={styles.text}>Username : {user.username}</Text>
				<Button testID ="btn-join-chat" style = {styles.btn} title = "Vào phòng chat" onPress = {()=> history.push("/chat")} />
			</View>
		)
}
const styles = StyleSheet.create({
    container:{
        flexDirection: 'row', flexWrap: 'wrap', justifyContent: "center", marginTop: 30
    },
    text: {
		fontSize: 20,
	},
	textLink: {
		fontSize: 20,
        color: "#288cdd",
    },
    btn:{
        marginTop:30
    }
})

export default withContainer(Home);