import React, { useState, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { Input, Text, Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import api from '../../services/api';
import { Link, useHistory } from "react-router-native";
import Context from '../../services/context';
import withContainer from '../withContainer';

const validateLogin = (value) => {
    const regex = /^[a-zA-Z0-9]{5,20}$/;
    return regex.test(value.username) ? regex.test(value.password) : false;
}
const LoginForm = () => {
    const [value, setValue] = useState({ username: "", password: "" })
    const [loading, setLoading] = useState(false);
    const [warning, setWarning] = useState("");
    const { setTitle, setUser} = useContext(Context);
    const history = useHistory();

    setTitle("ĐĂNG NHẬP");
    const handleLogin = () => {
        if(!validateLogin(value)){
            setWarning("Tài khoản và mật khẩu phải từ 5 đến 20 kí tự và chỉ chứa chữ và số");
            return;
        }
        setLoading(true);
		api.POST('/login', value)
        .then(e => {
            setUser(e.data);
            history.replace("/");
        })
        .catch(err => setWarning(err.message))
        .finally(()=> setLoading(false))
    }
    return (
        <>
            <View testID = "form-login" style={{ flex: 1, justifyContent: "center" }}>
                <Text testID ="validation-message-login" style = {styles.textWarning}>{warning}</Text>
                <Input
                    testID = "input-username-login"
                    containerStyle={styles.input}
                    placeholder='Tài khoản'
                    value={value.username}
                    onChangeText={e => setValue({ ...value, username: e })}
                    rightIcon={{ type: 'font-awesome', name: 'user' }
                    }
                />
                <Input
                    testID = "input-password-login"
                    containerStyle={styles.input}
                    placeholder='Mật khẩu'
                    value={value.password}
                    onChangeText={e => setValue({ ...value, password: e })}
                    secureTextEntry={true}
                    rightIcon={{ type: 'font-awesome', name: 'lock' }
                    }
                />
            </View>
            <View style={{ flex: 1, marginTop:20 }}>
                <Button
                    testID = "btn-login"
                    onPress={handleLogin}
                    style={styles.buttonLogin}
                    title=" Đăng nhập"
                    loading = {loading}
                    disabled = {loading}
                    icon={
                        <Icon
                            name="sign-in"
                            size={15}
                            color="white"
                        />
                    }
                />
                <View style={styles.option}>
                    <Text style={styles.text}>Chưa có tài khoản? </Text>
                    <Link to="/signup"><Text style={styles.textLink}>Đăng ký</Text></Link>
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    input: {
		marginTop: 10
	},
	buttonLogin: {
		marginBottom: 15
	},
	text: {
		fontSize: 18,
	},
	textLink: {
		fontSize: 18,
		color: "#288cdd"
    },
    option:{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: "center" },
    textWarning: {
		fontSize: 18,
        color: "red",
        textAlign: "center"
    }
})

export default withContainer(LoginForm);