import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class SplashScreen extends React.PureComponent {

    constructor(props) {
        super(props)

        setTimeout(
            () => props.navigation.navigate('MessageScreen'),
            3000
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>TRAMU</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
