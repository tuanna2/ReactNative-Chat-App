import React from 'react';
import { Text } from 'react-native-elements'
import { Image, ScrollView, View } from 'react-native';

const withContainer = (WrappedComponent) => {
    return class extends React.Component {
        render() {
            return (
                <ScrollView style={{ flex: 1, padding: 10 }}>
                    <View testID = "logo" style={{  //shoud have logo
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Image source={require("../assets/img/icon.png")} resizeMode='cover' style={{ width: 230, height: 167 }} />
                        <Text style={{
                            textAlign: "center",
                            fontWeight: "700",
                            color: "#337ab7"
                        }}
                            h3>RN TESTER</Text>
                    </View>
                    <View style={{ flex: 1, marginTop: 30 }}>
                        <WrappedComponent />
                    </View>
                </ScrollView>
            );
        }
    }
}
export default withContainer;