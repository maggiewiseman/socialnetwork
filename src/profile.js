import React from 'react';
import ReactDOM from 'react-dom';
import {ProfilePic, PicUploader} from './profile-pic';

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editBioToggle: false
        }
        console.log('PROFILE: ', this.props);
        this.saveProfile = this.saveProfile.bind(this);
        this.toggleEditBio = this.toggleEditBio.bind(this);
    }
    saveProfile() {
        console.log('Profile component: Save Button clicked');
        this.setState({
            editBioToggle: !this.state.editBioToggle
        }, () => {
            console.log('JUST SAVED... editButton:', this.state.editBioToggle);
        });
    }
    toggleEditBio() {
        console.log('editing toggle button');
        this.setState({
            editBioToggle: !this.state.editBioToggle
        }, () => {
            console.log('JUST Clicked editButton:', this.state.editBioToggle);
        });
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
                    {this.state.editBioToggle ?
                        (
                            <div id="edit-bio">
                                <textarea cols='100' rows='4'>
                                    {this.props.info.bio || 'Add a bio!'}
                                </textarea>
                                <button onClick={this.saveProfile}>Save</button>
                            </div>
                        ) :
                        (
                            <div>
                                <p>{this.props.info.bio || 'Add a bio!'}</p>
                                <button onClick={this.toggleEditBio}>Edit</button>
                            </div>
                        )}
                </section>
            </div>
        )
    }
}
