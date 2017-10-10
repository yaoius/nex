import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import FirebaseService from '../../../../services/firebase-service';

import './class-list.css';

class ClassListItem extends Component {
    render() {
        const {imageUrl, title, linkUrl, params} = this.props;
        return (
            <div className='class-list-item'>
                <Link to={linkUrl} params={params ? params : null}>
                    <div className='class-thumbnail'>
                        { title }
                    </div>
                    <span className='class-identifier'>
                        { title }
                    </span>
                </Link>
            </div>
        );
    }
}

class ClassList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const classList = this.props.model.map((c, i) => this.formatClassItem(c, i));

        return (
            <div className='class-list-container'>
                <div className='user-links'>
                    <ClassListItem
                        imageUrl={'404'}
                        title='username'
                        linkUrl='/me'
                        nonClass
                    />
                    <ClassListItem
                        imageUrl='gears'
                        title='preferences'
                        linkUrl='/preferences'
                        nonClass
                    />
                </div>
                <div className='class-list'>
                    {classList}
                </div>
                <div className='logout'>
                    <button onClick={this.logout}>

                    </button>
                </div>
            </div>
        );
    }

    formatClassItem(classData, i) {
        return <ClassListItem
            key={i}
            imageUrl={classData.imageUrl}
            title={classData.title}
            linkUrl={`${this.props.baseUrl}/${classData.cid}`}
            params={classData}
        />;
    }

    logout() {
        FirebaseService.signOut();
    }
}

export default ClassList;