import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Text,
    ScrollView,
    FlatList
} from 'react-native';

import { LocalNotification } from '../services/local_notifications';

export default class Bar extends Component {
    state = {
        location: '',
        this_place: 'Bar'
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

        const menu = [
            {id: 1, title: "Chicken Sandwich", price: "10"},
            {id: 2, title: "Chicken Sandwich", price: "10"},
            {id: 3, title: "Chicken Sandwich", price: "10"},
            {id: 4, title: "Chicken Sandwich", price: "10"},
            {id: 5, title: "Chicken Sandwich", price: "10"},
            {id: 6, title: "Chicken Sandwich", price: "10"},
            {id: 7, title: "Chicken Sandwich", price: "10"},
            {id: 8, title: "Chicken Sandwich", price: "10"},
        ];

        const drinks = [
            {id: 1, title: "Red Wine", price: "10"},
            {id: 2, title: "Red Wine", price: "10"},
            {id: 3, title: "Red Wine", price: "10"},
            {id: 4, title: "Red Wine", price: "10"},
            {id: 5, title: "Red Wine", price: "10"},
            {id: 6, title: "Red Wine", price: "10"},
            {id: 7, title: "Red Wine", price: "10"},
            {id: 8, title: "Red Wine", price: "10"},
        ];

        const renderMenuItem = (item) => (
            <View style={style.menuItem} key={item.id}>
                <Text style={style.menuText}>{item["title"]}</Text>
                <Text style={style.menuText}>{item.price}€</Text>
            </View>
        );

        return (
            <ScrollView style={style.background}>
                <View style={style.container}>
                    <View style={style.header}>
                        <Text style={style.boldText}>welcome to our</Text>
                        <Text style={style.title}> BAR </Text>
                    </View>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
                    <View style={style.todaysOffers}>
                        <View style={style.underline}>
                            <Text style={style.subTitle}>Today's Menu</Text>
                        </View>
                        {
                            menu.map((item) => (
                                renderMenuItem(item)
                            )) 
                        }
                        
                    </View>
                    <View style={style.drinks}>
                        <View style={{...style.underline, width: '38%'}}>
                            <Text style={style.subTitle}>Our Drinks</Text>
                        </View>
                        {
                            drinks.map((item) => (
                                renderMenuItem(item)
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
    drinks: {
        paddingTop: 20,
        paddingHorizontal: 50,
        paddingBottom: 50
    }
});                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     