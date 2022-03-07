import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Text,
    ScrollView
} from 'react-native';

import { LocalNotification } from '../services/local_notifications';

export default class Hall extends Component {
    state = {
        location: '',
        this_place: 'Hall'
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

        const cityEvents = [
            {id: 1, name: "Concerto - Carlão", day: "07-03-2022", hour: "17:00"},
            {id: 2, name: "Concerto - Carlão", day: "07-03-2022", hour: "17:00"},
            {id: 3, name: "Concerto - Carlão", day: "07-03-2022", hour: "17:00"},
            {id: 4, name: "Concerto - Carlão", day: "07-03-2022", hour: "17:00"},
            {id: 5, name: "Concerto - Carlão", day: "07-03-2022", hour: "17:00"},
            {id: 6, name: "Concerto - Carlão", day: "07-03-2022", hour: "17:00"},
            {id: 7, name: "Concerto - Carlão", day: "07-03-2022", hour: "17:00"},
        ];

        const emergencyNumbers = [
            {id: 1, name: "emergency", number: "1234567"},
            {id: 2, name: "emergency", number: "1234567"},
            {id: 3, name: "emergency", number: "1234567"},
            {id: 4, name: "emergency", number: "1234567"},
            {id: 5, name: "emergency", number: "1234567"},
            {id: 6, name: "emergency", number: "1234567"},
            {id: 7, name: "emergency", number: "1234567"},
        ];

        const renderActivityItem = (item) => (
            <View style={style.activityItem} key={item.id}>
                <Text style={style.activityTitle}>{item.name}</Text>

                <View style={style.horizontal}>
                    <Text></Text>
                    <Text>{item.day} {item.hour}</Text>
                </View>
            </View>
        );

        const renderEmergencyItem = (item) => (
            <View style={style.emergencyItem} key={item.id}>
                <View style={style.lineSeparator}>
                    <Text>{item.name}</Text>
                </View>
                <View>
                    <Text>{item.number}</Text>
                </View>
            </View>
        );

        return (
            <ScrollView style={style.background}>
                <View style={style.container}>
                    <View style={style.header}>
                        <Text style={style.boldText}>welcome to our</Text>
                        <Text style={style.title}> HOTEL </Text>
                    </View>

                    <View style={style.activities}>
                        <View style={{...style.underline, width: '30%'}}>
                            <Text style={style.subTitle}>What to Do?</Text>
                        </View>
                        <View style={{...style.emergencyNumbers, marginHorizontal: 40}}>
                            {
                                cityEvents.map((item) => (
                                    renderActivityItem(item)
                                )) 
                            }
                        </View>
                    </View>

                    <View style={style.info}>
                        <View style={{...style.underline, width: '35%'}}>
                            <Text style={style.subTitle}>Room Service</Text>
                        </View>
                        <View style={{...style.emergencyNumbers, marginTop: 10}}>
                            <Text>Please call 453 from your room's phone</Text>
                        </View>
                    </View>

                    <View style={{...style.info, marginBottom: 30}}>
                        <View style={style.underline}>
                            <Text style={style.subTitle}>Emergency Numbers</Text>
                        </View>
                        <View style={style.emergencyNumbers}>
                            {
                                emergencyNumbers.map((item) => (
                                    renderEmergencyItem(item)
                                )) 
                            }
                        </View>
                    </View>
                </View>
            </ScrollView>
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
    },
    header: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 10,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 50,
        color: '#197278',
        fontStyle: 'italic',
        textShadowColor: 'rgba(21, 96, 102, 0.70)',
        textShadowOffset: {width: -1.5, height: 2},
        textShadowRadius: 5,
        textDecorationLine: 'underline',
        transform: [{ rotate: '-4deg'}]
    },
    boldText: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#1C8087'
    },
    info: {
        marginTop: 20,
    },
    emergencyNumbers: {        
        justifyContent: 'center',
        alignItems: 'center',
    },
    underline: {
        borderBottomColor: '#FF7F11',
        borderBottomWidth: 1,
        width: '53%',
        marginHorizontal: 30,
    },
    subTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#6F686D',
    },
    emergencyItem: {
        width: '90%',
        paddingTop: 20,
        paddingHorizontal: 30,
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent: 'space-between',
        borderBottomColor: '#FF7F11',
        borderBottomWidth: 1,
    },
    activities: {
        flex: 2,
        paddingTop: 20,
        alignContent: 'center',
        justifyContent: 'center',
        paddingBottom: 10
    },
    activityItem: {
        width: '100%',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#FF7F11',
        marginVertical: 10,
        padding: 10,
    },
    activityTitle: {
        fontWeight: 'bold',
        fontSize: 16
    },
    horizontal: {
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent: 'space-between',
    }
});