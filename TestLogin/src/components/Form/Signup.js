import React, { useState, useContext } from 'react';
import { StyleSheet, View, } from 'react-native';
import { Button, Input, Text } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import api from '../../services/api';
import { Link, useHistory } from "react-router-native";
import Context from '../../services/context';
import withContainer from '../withContainer';

const validateSignup = (value) => {
    const regex = /^[a-zA-Z0-9]{5,20}$/;
    const regexFullname = /^[\sa-zA-Z0-9]{3,50}$/;
    return regex.test(value.username) ? ( regex.test(value.password) ? regexFullname.test(value.fullname) : false ) : false;
}
const LoginForm = () => {
    const [value, setValue] = useState({ fullname:"", username: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [warning, setWarning] = useState("");
    const {setTitle, setUser} = useContext(Context);
    const history = useHistory();
    setTitle("ĐĂNG KÝ");
    const handleSignup = () => {
        if(!validateSignup(value)){
            setWarning("Tài khoản và mật khẩu phải từ 5 đến 20 kí tự và chỉ chứa chữ và số, họ tên từ 3 đến 50 ký tự");
            return;
        }
        setLoading(true);
		api.POST('/signup', value)
        .then(e => {
            setUser(e.data);
            history.push("/");
        })
        .catch(err => setWarning(err.message))
        .finally(()=> setLoading(false))
	}
    return (
        <>
            <View testID = "form-signup" style={{ flex: 1, justifyContent: "center" }}>
                <Text testID = "validation-message-signup" style = {styles.textWarning}>{warning}</Text>
                <Input
                    testID = "input-fullname-signup"
                    containerStyle={styles.input}
                    placeholder='Họ tên'
                    value={value.fullname}
                    onChangeText={e => setValue({ ...value, fullname: e })}
                    rightIcon={{ type: 'font-awesome', name: 'child' }
                    }
                />
                <Input
                    testID = "input-username-signup"
                    containerStyle={styles.input}
                    placeholder='Tài khoản'
                    value={value.username}
                    onChangeText={e => setValue({ ...value, username: e })}
                    rightIcon={{ type: 'font-awesome', name: 'user' }
                    }
                />
                <Input
                    testID = "input-password-signup"
                    containerStyle={styles.input}
                    placeholder='Mật khẩu'
                    value={value.password}
                    onChangeText={e => setValue({ ...value, password: e })}
                    secureTextEntry={true}
                    rightIcon={{ type: 'font-awesome', name: 'lock' }
                    }
                />

            </View>
            <View style={{ flex: 1,marginTop: 20 }}>
                <Button
                    testID ="btn-signup"
                    onPress={handleSignup}
                    buttonStyle = {{backgroundColor: "#5cb85c"}}
                    style={styles.buttonLogin}
                    title=" Đăng ký"
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
                    <Text style={styles.text}>Đã có tài khoản? </Text>
                    <Link to="/login"><Text style={styles.textLink}>Đăng nhập</Text></Link>
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
		marginBottom: 15,
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