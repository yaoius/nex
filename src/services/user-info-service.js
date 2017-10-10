import FirebaseService from './firebase-service';
import {FIREBASE_PATHS} from './firebase-enums';

class UserInfoService {
    constructor() {
        this._cachedUserInfo = null;
    }

    init() {
        this.userPathRef = FirebaseService.getReference(FIREBASE_PATHS.USERS);
    }

    setCurrentUser(uid) {
        this.userRef = this.userPathRef.child(uid);
    }

    createUser(email, password) {
        return FirebaseService.createUser(email, password).then(() => {
            const user = {
                email,
                imageUrl: null
            };
            return this.userPathRef.child(email).set(user);
        });
    }

    updateProfile(updates) {
        return FirebaseService.update(this.userRef, updates);
    }

    fetchUserInfo(force=false) {
        return new Promise((resolve, reject) => {
            // const user = FirebaseService.getUser();
            const user = {
                name: 'test'
            };
            if (user) {
                resolve(user);
            } else {
                reject('no user');
            }
        });
    }

    fetchClassList(user, force=false) {
        return new Promise((resolve, reject) => {
            resolve([
                {
                    cid: 0,
                    number: 'cs100',
                    title: 'cs course 0'
                },
                {
                    cid: 1,
                    number: 'cs100',
                    title: 'cs course 1'
                }
            ])
        });
    }
}

export default new UserInfoService();