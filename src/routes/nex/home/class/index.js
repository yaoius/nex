import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Feed from '../../../../components/home/sidebar/feed';
import PostView from './post-view';

import ClassFeedService from '../../../../services/class-feed-service';

import './class.css';

class Class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            classData: props.match.params,
            model: this.initModel()
        };
    }

    render() {
        const {match} = this.props;
        const {classData} = this.state;
        return (
            <div className='class-view fill'>
                {classData.cid}
                <Feed feedList={this.state.model.feedList}/>
                <div className='post-view-container'>
                    <Route path={`${match.url}/:pid`} component={PostView}/>
                </div>
            </div>
        );
    }

    componentDidMount() {
        this.fetchModel();
    }

    componentWillReceiveProps(props) {
        this.setState({
            loading: true,
            classData: props.match.params
        });
        this.fetchModel();
    }

    initModel() {
        return {
            classData: {},
            feedList: []
        };
    }

    fetchModel() {
        const {cid} = this.state.classData;
        ClassFeedService.fetchClassFeed(cid).then((feedList) => {
            this.setState({
                model: {feedList}
            })
        });
    }
}

export default Class;