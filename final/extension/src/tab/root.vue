<template>
    <div id="tab">
        <div v-if="is_login">
            <button class="roomcode" disabled>{{this.roomcode}}</button>
            <button
                @click="lineup"
                :class="{ 'btu_toogle': is_lineup }"
            >{{this.lineup_msg}}</button>
            <button
                @click="logout"
            >Logout</button>
        </div>
        <div v-else >
            <button
                @click="login"
            >Login</button>
        </div>
    </div>
</template>
<script>
  export default {
    data: () => ({
        is_login: false,
        is_lineup: null,
        lineup_msg: "Lineup",
        roomcode: ''
    }),
    computed: { },
    created () {
        const config = {
            apiKey: "AIzaSyBvOSImsqT0VXGt0hprrvaXGWXB-xaIS40",
            authDomain: "cnlabteam8.firebaseapp.com",
            databaseURL: "https://cnlabteam8.firebaseio.com",
            projectId: "cnlabteam8",
            storageBucket: "cnlabteam8.appspot.com",
            messagingSenderId: "1096796622713"
        }; firebase.initializeApp(config);
    },
    mounted () {
        chrome.runtime.sendMessage({ action: "get_user" }, (result) => {
            if ( result ) {
                this.is_login = true;
            }
        });
    },
    methods: {
        login () {
            let currentUser = firebase.auth().currentUser;
            if (!currentUser) {
                let provider = new firebase.auth.GoogleAuthProvider();
                firebase.auth().signInWithPopup(provider).then( (result) => {
                    this.is_login = true;
                }).catch( error => { console.log(error); });
            } else {
                this.is_login = true;
            }
        },
        logout () {
            let currentUser = firebase.auth().currentUser;
            if (currentUser) {
                firebase.auth().signOut().then( () => {
                    this.is_login = false;
                } ).catch( error => {console.log(error);} );
            } else {
                this.is_login = false;
            }
        },
        lineup () {
            if ( this.is_lineup ) {
                this.lineup_msg = "Lineup";
                clearInterval( this.is_lineup ); this.is_lineup = null;
            } else {
                this.lineup_msg = "Lineup now...";
                this.is_lineup = setInterval( () => {
                    chrome.runtime.sendMessage({ action: "lineup" }, (e) => {
                        if (e.roomcode) {
                            this.roomcode = e.roomcode;
                            clearInterval( this.is_lineup ); this.is_lineup = null;
                            this.lineup_msg = "Lineup";
                        }
                    });
                }, 5000);
            }
        }
    }
  }
</script>
<style lang="scss">
    #tab {
        width: 100vw; height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    $green: #1ECD97;

    .roomcode {
        height: 5vh;
    }
    button {
        display: block;
        margin: 2vh auto;
        outline:none;
        height: 8vh;
        text-align: center;
        width: 30vw;
        border-radius:40px;
        background: #fff;
        border: 2px solid $green;
        color: $green;
        letter-spacing:1px;
        text-shadow:0;
        font-size: 1.5em;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.25s ease;
        &:hover {
            color:white;
            background: $green;
        }
    }

    .btu_toogle {
        animation: button-loading 1.5s linear infinite;
    }
    @keyframes button-loading {
        0%   { box-shadow: 0 0 0 0 $green;     }
        50%  { box-shadow: 0 0 5px 5px $green; }
        100% { box-shadow: 0 0 0 0 $green;     }
    }
</style>
