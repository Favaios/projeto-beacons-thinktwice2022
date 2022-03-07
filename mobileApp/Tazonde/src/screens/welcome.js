import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Text,
    ScrollView,
    FlatList
} from 'react-native';

import { LocalNotification } from '../services/local_notifications';

export default class Welcome extends Component {
    state = {
        location: '',
        this_place: 'Welcome'
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

        const renderActivityItem = (item) => (
            <View style={style.activityItem} key={item.id}>
                <Text style={style.activityTitle}>{item.name}</Text>

                <View style={style.horizontal}>
                    <Text></Text>
                    <Text>{item.day} {item.hour}</Text>
                </View>
            </View>
        );

        return (
            <ScrollView style={style.background}>
                <View style={style.container}>
                    <View style={style.header}>
                        <Text style={style.boldText}>welcome to our</Text>
                        <Text style={style.title}> HOTEL </Text>
                        <Text style={{...style.boldText, marginTop: 10}}>seems like you are new around here!</Text>
                    </View>

                    <View style={style.todaysOffers}>
                        <Text style={{...style.boldText, marginTop: 10, textAlign: 'center', color: '#FF7F11'}}>We hope you like it around here</Text>
                    </View>

                    <View style={style.todaysOffers}>
                        <View style={{...style.underline, width: '30%'}}>
                            <Text style={style.subTitle}>Check In</Text>
                        </View>
                        <Text style={style.justified}>- Please wait at the Hall, someone will meet you there to guide you to your room.</Text>
                    </View>
                    <View style={style.activities}>
                        <View style={{...style.underline, width: '28%', marginHorizontal: 50}}>
                            <Text style={style.subTitle}>City Events</Text>
                        </View>
                        <View style={{...style.emergencyNumbers, marginHorizontal: 40}}>
                            {
                                cityEvents.map((item) => (
                                    renderActivityItem(item)
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
    justified: {
        textAlign: 'justify',
        marginTop: 10
    },
    boldText: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#1C8087',
    },
    todaysOffers: {
        flex: 2,
        paddingTop: 20,
        paddingHorizontal: 50,
    },
    underline: {
        borderBottomColor: '#FF7F11',
        borderBottomWidth: 1,
        width: '47%'
    },
    subTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#6F686D',
    },
    menuItem: {
        width: '100%',
        paddingTop: 10,
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent: 'space-between',
        borderBottomColor: '#FF7F11',
        borderBottomWidth: 1,
        alignItems: 'center'
    },
    menuText: {
        fontSize: 18,
    },
    activities: {
        flex: 2,
        paddingTop: 20,
        alignContent: 'center',
        justifyContent: 'center',
        paddingBottom: 10,
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
        fontSize: 16,
    },
    horizontal: {
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent: 'space-between',
    }
});                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     