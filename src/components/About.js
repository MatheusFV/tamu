import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


export const About = () => (
    <View style={styles.container}>
        <Text style={[styles.text, {fontSize: 20}]}> Aplicativo desenvolvido por: </Text>
        <Text/>
        <Text style={styles.text}> Matheus Freitas Venosa </Text>
        <Text style={styles.text}> Tiago Sueda Limone </Text>
        <Text style={styles.text}> José Suen </Text>
    </View>
)

const styles = {
    container: {
        display: "Flex",
        justifyContent: "center",
        alignContent: "center",
        padding: 20,
        height: "100%"
    },
    text: {
        color: "gray",
        textAlign: "center",
        fontSize: 16,
    }
}