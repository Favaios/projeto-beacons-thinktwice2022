import FormData from 'form-data';
import Axios from 'axios';

const api_uri = 'http://192.168.202.176:5000/api';

async function getBeacons (_callback) {
    let ret = {success: false, msg: ""};
    //axios.get(`${api_uri}/beacons`).then(data => console.log(data))
    await Axios({
        method: 'GET', 
        url: `${api_uri}/beacons`
    })
    .then(function(response) {
        _callback({success: true, msg: JSON.stringify(response.data)});
    })
    .catch(function(error) {
        console.log('Error on getBeacons');
        console.log(error);
        _callback({success: false, msg: error});
    });
}

async function postMyLocation(deviceUid, beacon_id, _callback) {
    console.log(beacon_id)
    await Axios({
        method: 'POST',
        url: `${api_uri}/detections`,
        data: {
            "deviceId": deviceUid,
            "beaconId": beacon_id
        },
        headers: {'Content-type': 'application/json'}
    })
    .then(function(response) {
        console.log(response.data)
        _callback({success: true, msg: JSON.stringify(response.data)});
    })
    .catch(function(error) {
        console.log('Error on postMyLocation');
        console.log(error);
        _callback({success: false, msg: error});
    });
}

export {getBeacons, postMyLocation};