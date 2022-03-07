import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';

import { LocalNotification } from '../services/local_notifications';

import logo from "../../assets/logo.png"

export default class Home extends Component {

    state = {
        location: '',
        this_place: 'Home'
    }

    constructor() {
        super();
    }

    componentDidMount() {
        this.setState({location: this.props.route.params.getLocation()});

        const interval = setInterval(() => {
            const location = this.props.route.params.getLocation();
            this.setState({location: location});

            if (location !== this.state.this_place) {
                this.props.navigation.navigate(location)
                LocalNotification("Welcome to the " + location, "See what we have to offer you at the " + location);
                clearInterval(interval);
            }
        }, 10000);
    }

    render () {
        return (
            <View style={style.background}>
                <View style={style.container}>
                    <View style={style.logoContainer}>
                        <Image
                            style={style.logo}
                            source={logo}
                        />
                    </View>
                    <View style={style.infoContainer}>
                        <Text style={style.boldBigText}>Help us provide you a better service</Text>
                        <Text></Text>
                        <Text style={style.boldText}>Check what we have to offer</Text>
                        <TouchableOpacity>
                            <View style={style.btn}>
                                <Text style={style.boldText}>Let's spend holidays together?</Text>
                            </View>
                        </TouchableOpacity>

                        <View style={style.loader}>
                            <ActivityIndicator size={35} />
                        </View>
                    </View>
                </View>
            </View>
        );
    }
};

const style = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        backgroundColor: '#FFF4EC'
    },
    container: {
        flex: 1,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    logo: {
        marginTop: '20%',
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: 100,
        width: 260,
    },
    infoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 2,
    },
    boldBigText: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#197278'
    },
    boldText: {
        fontWeight: 'bold',
        fontSize: 15,
        color: '#197278'
    },
    btn: {
        borderWidth: 3,
        borderColor: '#197278',
        borderRadius: 50,
        padding: 15,
        marginTop: 50
    },
    loader: {
        marginVertical: 10,
        marginTop: 20,
    }
});