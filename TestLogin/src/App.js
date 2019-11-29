import React, { useState } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { NativeRouter, Route, Switch } from "react-router-native";
import Context from './services/context';
import { Header, Form, BoxChat, Home } from './components';
const { LoginForm, SignupForm } = Form;

const App: () => React$Node = () => {
	const [user, setUser] = useState({});
	const [title, setTitle] = useState("Loading...");
	return (
		<KeyboardAvoidingView behavior='padding' style={{ flex: 1 }}>
			<NativeRouter style={{ flex: 1 }}>
				<Context.Provider value={{ title, setTitle, user, setUser }}>
					<Header />
					<Switch>
						<Route exact path="/" component={Home} />
						<Route path="/login" component={LoginForm} />
						<Route path="/signup" component={SignupForm} />
						<Route path="/chat" component={BoxChat} />
					</Switch>
				</Context.Provider>
			</NativeRouter>
		</KeyboardAvoidingView>
	);
};

export default App;
