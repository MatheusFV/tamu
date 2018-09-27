import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Container, Header, Button, Picker, Form, Icon, Textarea, Tab, Tabs, TabHeading } from "native-base";
import { Home } from "../components/Home";
import {About} from "../components/About";
import {CONSTANTS} from "../Helpers/constants";

export default class MessageScreen extends React.PureComponent {

    static navigationOptions = {
        headerLeft: null,
        headerStyle: {
            height: 0,
            backgroundColor: "white"
        },
    }

    constructor(props) {
        super(props);
        this.state = {
            selected: null,
            mock: []
        };
    }

    onValueChange(value) {
        this.setState({
            selected: 0
        });
    }

    render() {

        const {
            mock
        } = this.state

        return (
            <Container>
                <Tabs>
                    <Tab heading={ <TabHeading><Text>Inicio</Text></TabHeading>}>
                        <Home text={CONSTANTS.home}/>
                    </Tab>
                    <Tab heading={ <TabHeading><Text>Mensagens</Text></TabHeading>}>
                        {this.renderScreen(mock)}
                    </Tab>
                    <Tab heading={ <TabHeading><Text>Sobre</Text></TabHeading>}>
                        <About/>
                    </Tab>
                </Tabs>
            </Container>
        );
    }

    renderInitialState = () => (
        <View style={styles.initialStateContainer}>
            <Text style={styles.initialStateText}> Para enviar mensagens é necessário encontrar os dispositivos disponíveis, selecione o botão para buscar e enviar sua mensagem.</Text>
            <Button block light style={styles.button} onPress={() => this.setState({mock : [
                    {port: 200},
                    {port: 300}
                ]})}>
                <Text>Buscar Dispositivos</Text>
            </Button>
        </View>
    )

    renderScreen = (mock) => (
        <Container>
            {mock.length > 0 ?
                <View>
                    <View>
                        <View>
                            <Text style={styles.pickerText}> Selecione o dispositivo </Text>
                            <Form>
                                <Picker
                                    note
                                    mode="dropdown"
                                    iosIcon={<Icon name="ios-arrow-down-outline" />}
                                    style={{ width: 180 }}
                                    selectedValue={this.state.selected}
                                    onValueChange={this.onValueChange.bind(this)}
                                >
                                    { mock.map((value, index) => (
                                        <Picker.Item label={value.port} key={index} value={index}/>
                                    ))}
                                </Picker>
                            </Form>
                        </View>
                        <View style={{width: "100%", padding: 15, alignContent: "center", display: "flex"}}>
                            <Textarea rowSpan={5} bordered placeholder="Escreva sua mensagem"/>
                        </View>
                        <Button block primary style={styles.button}>
                            <Text style={{color: "white"}}>Enviar</Text>
                        </Button>
                        <Button block primary style={styles.button}>
                            <Text style={{color: "white"}}>Buscar novamente</Text>
                        </Button>
                    </View>
                </View>
                :
                this.renderInitialState()
            }
        </Container>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    pickerText: {
        color: "gray",
        margin: 15
    },
    button: {
        margin: 15,
    },
    initialStateContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        backgroundColor: "white",
        padding: 15
    },
    initialStateText: {
        color: "gray",
        marginBottom: 15,
        textAlign: "center"
    }
});
