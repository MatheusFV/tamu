import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


export const Home = ({text}) => (
    <View style={styles.container}>
        <Text style={styles.text}> {text} </Text>
    </View>
)

const styles = {
    container: {
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        padding: 20,
        height: "100%"
    },
    text: {
        color: "gray",
        textAlign: "center",
    }
}