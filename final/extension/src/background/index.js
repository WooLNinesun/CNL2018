// Initialize Firebase
const config = {
    apiKey: "AIzaSyBvOSImsqT0VXGt0hprrvaXGWXB-xaIS40",
    authDomain: "cnlabteam8.firebaseapp.com",
    databaseURL: "https://cnlabteam8.firebaseio.com",
    projectId: "cnlabteam8",
    storageBucket: "cnlabteam8.appspot.com",
    messagingSenderId: "1096796622713"
}; firebase.initializeApp(config);

var last_time = 0, logger_tabId = 0, roomcode = null;
const work_server = 'http://work.hortune.tw:5566';
const get_current_user = () => {
    let currentUser = firebase.auth().currentUser;
    return (currentUser != null)? currentUser.uid: null;
};
const sendhttp = {
    record( response ) {
        if ( response.res !== "fail" ) {
            let cur_time = (new Date()).getTime(), uid = get_current_user();
            if (!uid) {
                uid = '00000000';
            } let url = work_server + '/record/' + uid + '?' + cur_time;

            let send_logger = response.logger +'|'+  (response.time);
            let params = '{"record":"' + send_logger + '"}';

            console.log(response.logger);

            let http = new XMLHttpRequest();
            http.open('POST', url, true);
            http.setRequestHeader('Content-type', 'application/json');
            http.send( params );
        }
    },
    lineup() {
        let cur_time = (new Date()).getTime(), uid = get_current_user();
        if ( !uid ) {
            roomcode = null; return
        } let url = work_server + '/lineup/' + uid + '?' + cur_time;

        let http = new XMLHttpRequest();
        http.open('GET', url, true);
        http.setRequestHeader('Content-type', 'application/json');
        http.onreadystatechange = () => {
            if (http.readyState == 4 && http.status == 200) {
                let res = JSON.parse(http.response);
                if ( res.result === "success" ) {
                    roomcode = res.room;
                    chrome.notifications.create( "100", { 
                        type: 'basic',
                        title: 'Get Teammate',
                        iconUrl: chrome.extension.getURL('../icons/48.png'),
                        message: 'room code: ' + roomcode
                    });
                }
            }
        };
        http.send();
    }
};
  
chrome.runtime.onMessage.addListener( (msg, sender, sendResponse) => {
    if ( msg.action === "get_tabId" ) {
        logger_tabId = sender.tab.id;
    }
    if ( msg.action === "get_user" ) {
        let uid = get_current_user()
        if ( uid != null ) {
            sendResponse( { uid } );
        }
    }
    if ( msg.action === "lineup" ) {
        sendhttp.lineup();
        sendResponse({roomcode});
    }
});
  
chrome.webRequest.onCompleted.addListener(
    (details) => {
        if ( origin && logger_tabId != 0 ) {
            let cur_time = (new Date()).getTime();
            if ( cur_time - last_time > 40000 ) {
                chrome.tabs.sendMessage(
                    logger_tabId, {
                        action: "recv_ad",
                        time: (cur_time - last_time)
                    }, sendhttp.record
                );
            } last_time = cur_time;
        }
    }, {
        urls:  [
            'https://adserver-us.adtech.advertising.com/*',
        ], types: [ 'xmlhttprequest' ]
    }
);
  