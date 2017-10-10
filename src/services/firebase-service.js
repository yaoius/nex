import * as firebase from 'firebase';

const FIREBASE_CONFIG = {
    apiKey: "AIzaSyCDJUSZ9cX5dmDzVbHAURREHCUXwMGPBjw",
    authDomain: "nex-36193.firebaseapp.com",
    databaseURL: "https://nex-36193.firebaseio.com",
    projectId: "nex-36193",
    storageBucket: "nex-36193.appspot.com",
    messagingSenderId: "595199242404"
};

class FirebaseService {
    constructor() {
        firebase.initializeApp(FIREBASE_CONFIG);
        this.authListeners = {};
    }

    init() {
        this.database = firebase.database();
        this.auth = firebase.auth();
        this.user = null;
        firebase.auth().onAuthStateChanged((user) => { this.onStateChange(user); });
    }

    set(ref, data) {
        return ref.set(data);
    }

    fetch(ref) {
        return ref.once('value');
    }

    update(ref, updates) {
        return ref.update(updates);
    }

    push(ref) {
        return ref.push().key;
    }

    remove(ref) {
        ref.remove();
    }

    addDataListener(type, ref, cb) {
        return ref.on(type, cb);
    }

    addAuthListener(id, cb) {
        this.authListeners[id] = cb;
    }

    removeAuthListener(id) {
        delete this.authListeners[id];
    }

    removeDataListener(ref) {
        ref.off();
    }

    getReference(path) {
        return this.database.ref(path);
    }

    createUser(email, password) {
        return this.auth.createUserWithEmailAndPassword(email, password);
    }

    authenticate(email, password) {
        return this.auth.signInWithEmailAndPassword(email, password);
    }

    signOut() {
        return this.auth.signOut();
    }

    getUser() {
        return this.auth.currentUser;
    }

    isAuthenticated() {
        return !!this.getUser();
    }

    onStateChange(user) {
        this.user = user;
        for (const [_, cb] of Object.entries(this.authListeners)) {
            cb(user);
        }
    }
}

export default new FirebaseService();