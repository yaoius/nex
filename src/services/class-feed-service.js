import FirebaseService from './firebase-service';
import { FIREBASE_PATHS } from './firebase-enums';

class ClassFeedService {
    init() {
        this.classRef = FirebaseService.getReference(FIREBASE_PATHS.CLASSES);
    }

    createClass(number, name, description) {
        const cid = FirebaseService.push(this.classRef);
        const classData = {
            cid,
            number,
            name,
            description,
            nextPostId: 0,
            instructors: []
        };
        return this.classRef.child(cid).set(classData);
    }

    fetchClassData(cid) {
        FirebaseService.fetch(this.classRef.child(cid));
    }

    fetchClassFeed(cid) {
        return new Promise((resolve) => {
            resolve([
                {pid: 0, poster: 'user0', text: 'text 0'},
                {pid: 1, poster: 'user1', text: 'text 1'}
            ])
        });

        const childRef = this.classRef.child(cid);
        return FirebaseService.fetch(childRef);
    }

    fetchPostData(cid, pid) {
        const postRef = this.classRef.child(`${cid}/${pid}`);
        return FirebaseService.fetch(postRef);
    }
}

export default new ClassFeedService();