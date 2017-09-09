import React from 'react';
import ReactDOM from 'react-dom';
import axios from './axios';
import { ProfilePic } from './profile-pic';

export default class OtherProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentWillMount() {
        console.log('in OtherProfile Comoneent');
        let id = this.props.params.id;
        var url = '/api/user/' + id;
        axios.get(url).then((res)=> {
            console.log('OtherProfile after mounting: res is:', res);
            var { first_name, last_name, profile_pic, bio } = res.data.userInfo;
            this.setState({ id, first_name, last_name, profile_pic, bio}, () => {
                console.log('did mount state: ', this.state);
            });

        }).catch((e) =>{
            this.setState({
                error: e
            });
            console.error(e)
        });
    }
    render() {
        var { id, first_name, last_name, profile_pic, bio} = this.state;
        return (

            <div className="profile-wrapper">
                <sidebar>
                <ProfilePic imgsrc={profile_pic}
                            first_name={first_name}
                            last_name={last_name}/>
                </sidebar>
                <h2>{first_name} {last_name}</h2>
                <h2>Bio</h2>
                <p>{bio}</p>
            </div>
        );
    }
}
