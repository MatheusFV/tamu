import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { Container, Header, Button, Picker, Form, Icon, Textarea, Tab, Tabs, TabHeading } from "native-base";
import {connect} from "react-redux";
import { Home } from "../components/Home";
import {About} from "../components/About";
import { getPorts, sendMessage } from "../actions/Message/MessageActions";
import {CONSTANTS} from "../helpers/constants";


class MessageScreen extends React.PureComponent {

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
            text: '',
            selected: 0
        };
    }

    onValueChange(value) {
        this.setState({
            selected: value
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.err) {
            alert("Ocorreu um erro, por favor tente novamente.")
        } else if (nextProps.messageSent) {
            alert("Mensagem enviada com sucesso")
        }
    }

    render() {
        const {
            ports,
            loading,
            err
        } = this.props

        return (
            <Container>
                <Tabs>
                    <Tab heading={ <TabHeading><Text>Inicio</Text></TabHeading>}>
                        <Home text={CONSTANTS.home}/>
                    </Tab>
                    <Tab heading={ <TabHeading><Text>Mensagens</Text></TabHeading>}>
                        {this.renderScreen(ports)}
                    </Tab>
                    <Tab heading={ <TabHeading><Text>Sobre</Text></TabHeading>}>
                        <About/>
                    </Tab>
                </Tabs>
                {loading && <ActivityIndicator size="large"  color="black"
                                               style={{
                                                   position:'absolute', left:0, right:0, bottom:0, top:0 }}/> }
            </Container>
        );
    }

    renderInitialState = () => (
        <View style={styles.initialStateContainer}>
            <Text style={styles.initialStateText}> Para enviar mensagens é necessário encontrar os dispositivos disponíveis, selecione o botão para buscar e enviar sua mensagem.</Text>
            <Button block light style={styles.button} onPress={() => this.props.getPorts()}>
                <Text>Buscar Dispositivos</Text>
            </Button>
        </View>
    )

    renderScreen = (ports) => (
        <Container>
            {ports && ports.length > 0 ?
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
                                    { ports.map((value, index) => (
                                        <Picker.Item label={value.port} key={index} value={index}/>
                                    ))}
                                </Picker>
                            </Form>
                        </View>
                        <View style={{width: "100%", padding: 15, alignContent: "center", display: "flex"}}>
                            <Textarea rowSpan={5} bordered placeholder="Escreva sua mensagem"
                                      onChangeText={(text) => this.setState({text})}
                                      value={this.state.text}
                            />
                        </View>
                        <Button block primary style={styles.button} onPress={() => {
                            console.log('ports', ports.length)
                            console.log('text', this.state.text)
                            console.log('selected', this.state.selected)
                            console.log(ports.length > this.state.selected)
                            if (this.state.text && this.state.selected !== undefined
                                && ports.length > this.state.selected) {
                                this.props.sendMessage(this.state.text, ports[this.state.selected])
                                this.setState({text: ''})
                            } else {
                                alert("Digite uma mensagem e escolha um dispositivo, por favor.")
                            }
                        }}>
                            <Text style={{color: "white"}}>Enviar</Text>
                        </Button>
                        <Button block primary style={styles.button} onPress={() => this.props.getPorts()}>
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

function mapStateToProps(state) {
    return {
        ports: state.messageState.ports,
        loading: state.messageState.loading,
        err: state.messageState.err,
        messageSent: state.messageState.messageSent
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getPorts: () => dispatch(getPorts()),
        sendMessage: (message, port) => dispatch(sendMessage(message, port))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageScreen);

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
