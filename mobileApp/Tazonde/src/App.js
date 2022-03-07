import React, {Component} from 'react';
import {
    SafeAreaView,
    Text,
    ActivityIndicator,
    Button,
    PermissionsAndroid,
    View,
    FlatList,
    Alert,
    StyleSheet
} from 'react-native';

import Eddystone from "@lg2/react-native-eddystone";
import { BleManager } from 'react-native-ble-plx';

import { getBeacons, postMyLocation } from './services/api_connector';

import { LogBox } from 'react-native';
LogBox.ignoreLogs(
    [
        'NativeEventEmitter',
        'new NativeEventEmitter', 
        'Non-serializable values were found in the navigation state',
        'Possible Unhandled Promise Rejection'
    ]
);

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DeviceInfo from 'react-native-device-info';

import Home from './screens/home';
import Hall from './screens/hall';
import Bar from './screens/bar';
import Pool from './screens/pool';
import Welcome from './screens/welcome';

export default class App extends Component {

    state = {
        devicesFound: 0,
        btstate: undefined,
        isLoading: false,
        devices: [],
        permissions_granted: false,
        known_beacons: {},
        actual_location: 'Home',
        devices_ids: [],
    };

    constructor(){
        super();
        this.manager = new BleManager();
        this.Stack = createNativeStackNavigator();
    }

    async componentDidMount() {
        const subscription = this.manager.onStateChange(
            (state) => {
                if (state === 'PoweredOn') {
                    this.setState({btstate: 'PoweredOn'});
                    subscription.remove();
                }
                else if (state === 'PoweredOff') {
                    this.setState({btstate: 'PoweredOff'});
                    subscription.remove();
                }
            },
            true
        );  

        await this.grantPermissions();

        const api_response = getBeacons((api_response) => {
            if (api_response["success"] === true) {
                let beacons = {}

                JSON.parse(api_response.msg).forEach((beacon) => {
                    beacons[beacon["id"]] = beacon
                });

                this.setState({
                    known_beacons: JSON.parse(api_response.msg)
                });

                console.log(JSON.parse(api_response.msg))

                this.scanAndConnect();
            }
            else {
                console.log("error");
            }
        });
    }

    async grantPermissions() {
        if (await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)) {
            this.setState({permissions_granted: true});
        }
        else {
            try {
                const granted = PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        title: 'Permission Localisation Bluetooth',
                        message: 'Requirement for Bluetooth',
                        buttonNeutral: 'Later',
                        buttonNegative: 'Cancel',
                        buttonPositive: 'OK',
                    }
                );

                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    this.setState({permissions_granted: true})
                }
                else {
                    // permission denied
                    this.setState({permissions_granted: false})
                }                
            }
            catch (err) {
                console.warn(err);
                this.setState({permissions_granted: false})
            }
        }
    }

    updateInfo(beacon) {

        if (beacon.id !== undefined){
            const repeated = this.state.devices_ids.includes(beacon.id);
            if (repeated) {
                return;
            }

            const isKnown = this.state.known_beacons.find((b) => {
                return (b["id"] === beacon.id);
            });
            console.log(isKnown)

            if (!repeated === true && isKnown !== undefined) {
                console.log(this.state.devices);
                console.log(this.state.devices_ids);

                const d = this.state.known_beacons.find((dev) => dev["id"] === beacon.id);

                this.setState({
                    devicesFound: ++this.state.devicesFound,
                    devices: [...this.state.devices, {"beacon": beacon, "location": d["location"]}],
                    devices_ids: [...this.state.devices_ids, beacon.id]
                });
            }
        }
    }

    scanAndConnect() {
        const read = () => {
            Eddystone.addListener("onUIDFrame", (beacon) => {
                console.log(beacon)
                this.updateInfo(beacon);
            });
            Eddystone.addListener("onEIDFrame", (beacon) => {
                this.updateInfo(beacon);
            });

            if (!this.state.permissions_granted) {
                Alert.alert(
                    'Permission error',
                    'Location permission not granted. Cannot scan for beacons',
                    [{text: 'OK', onPress: () => console.log('OK Pressed')}],
                    {cancelable: false},
                );
            }
            
            Eddystone.startScanning();
        
            // stop scanning devices after 5 seconds
            setTimeout(() => {
                try {
                    Eddystone.stopScanning();
                }
                catch {
                    console.log("error")
                }

                this.state.devices.forEach((dev) => {
                    postMyLocation(DeviceInfo.getUniqueId(), dev["beacon"]["id"], (api_response) => {
                        if (api_response["success"] === true) {
                            let msg = JSON.parse(api_response["msg"]);

                            if (msg.new) {
                                console.log("-----------new------------");
                                this.setState({actual_location: 'Welcome'})
                            }
                            else {
                                this.setState({actual_location: dev["location"]["name"]})
                            }
                        }
                        else {
                            console.log("error");
                        }
                    });
                });
            }, 5000);
        };

        read();
        setInterval(() => {
            read();
            this.setState({
                devicesFound: 0,
                devices: [],
                devices_ids: []
            });
        }, 10000);
    }

    render() {

        const Stack = this.Stack;
        const getLocation = () => {return this.state.actual_location};

        return (
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false
                    }}
                >
                    <Stack.Screen name="Home" component={Home} initialParams={{getLocation: getLocation}} />
                    <Stack.Screen name="Hall" component={Hall} initialParams={{getLocation: getLocation}} />
                    <Stack.Screen name="Bar" component={Bar} initialParams={{getLocation: getLocation}} />
                    <Stack.Screen name="Pool" component={Pool} initialParams={{getLocation: getLocation}} />
                    <Stack.Screen name="Welcome" component={Welcome} initialParams={{getLocation: getLocation}} />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center"
    },
});