import React from 'react';
import ReactDOM from 'react-dom';
import {ProfilePic, PicUploader} from './profile-pic';

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editBioToggle: false
        }
        console.log('PROFILE: ', this.props)
        this.saveProfile = this.saveProfile.bind(this);
    }
    saveProfile() {
        console.log('Profile component: Save Button clicked');
    }
    render() {
        return (
            <div id="bio-wrapper">
                <sidebar>
                <ProfilePic imgsrc={this.props.info.profile_pic}
                            first_name={this.props.info.first_name}
                            last_name={this.props.info.last_name}/>
                </sidebar>
                <section id="edit-section">
                    <textarea cols='50' rows='40'>
                        {this.props.info.bio || 'Add a bio!'}
                    </textarea>
                    <button onClick={this.saveProfile}>Save</button>
                </section>
            </div>
        )
    }
}
