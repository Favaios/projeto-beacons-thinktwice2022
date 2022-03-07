import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Text,
    ScrollView
} from 'react-native';

import { LocalNotification } from '../services/local_notifications';

export default class Pool extends Component {
    state = {
        location: '',
        this_place: 'Pool'
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

        const activities = [
            {id: 1, title: "Sunset DJ Set", day: "07-03-2022", hour: "17:00", reservation: false},
            {id: 2, title: "Sunset DJ Set", day: "07-03-2022", hour: "17:00", reservation: true, limit: "50", now: "23"},
            {id: 3, title: "Sunset DJ Set", day: "07-03-2022", hour: "17:00", reservation: false},
            {id: 4, title: "Sunset DJ Set", day: "07-03-2022", hour: "17:00", reservation: true, limit: "50", now: "23"},
            {id: 5, title: "Sunset DJ Set", day: "07-03-2022", hour: "17:00", reservation: false},
            {id: 6, title: "Sunset DJ Set", day: "07-03-2022", hour: "17:00", reservation: true, limit: "50", now: "23"},
            {id: 7, title: "Sunset DJ Set", day: "07-03-2022", hour: "17:00", reservation: false},
            {id: 8, title: "Sunset DJ Set", day: "07-03-2022", hour: "17:00", reservation: true, limit: "50", now: "23"},
        ];

        const renderActivityItem = (item) => (
            <View style={style.activityItem} key={item.id}>
                {!item.reservation && (
                    <Text style={style.activityTitle}>{item["title"]}</Text>
                )}
                {item.reservation && (
                    <Text style={style.activityTitle}>{item["title"]} <Text style={{color: '#FF7F11'}}>*</Text></Text>
                )}

                <View style={style.horizontal}>
                    {!item.reservation && (
                        <Text></Text>
                        )}
                    {item.reservation && (
                        <Text>{item.now}/{item.limit}</Text>
                    )}
                    <Text>{item.day} {item.hour}</Text>
                </View>
            </View>
        );

        return (
            <ScrollView style={style.background}>
                <View style={style.container}>
                    <View style={style.header}>
                        <Text style={style.boldText}>welcome to our</Text>
                        <Text style={style.title}> POOL </Text>
                    </View>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
                    <View style={style.activities}>
                        <View style={style.underline}>
                            <Text style={style.subTitle}>Activities</Text>
                        </View>
                        {
                            activities.map((item) => (
                                renderActivityItem(item)
                            )) 
                        }
                        
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
    activities: {
        flex: 2,
        paddingTop: 20,
        paddingHorizontal: 40,
        alignContent: 'center',
        justifyContent: 'center',
        paddingBottom: 10
    },
    underline: {
        borderBottomColor: '#FF7F11',
        borderBottomWidth: 1,
        width: '33%',
    },
    subTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#6F686D',
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