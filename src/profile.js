import React from 'react';
import ReactDOM from 'react-dom';
import {ProfilePic, PicUploader} from './profile-pic';
import axios from './axios';

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editBioToggle: false
        };
        this.toggleEditBio = this.toggleEditBio.bind(this);
    }
    toggleEditBio() {
        this.setState({
            editBioToggle: !this.state.editBioToggle
        }, () => {
            console.log('JUST Clicked editButton:', this.state.editBioToggle);
        });
    }
    render() {
        var { first_name, last_name, profile_pic, bio} = this.props.info;
        return (
            <div id="bio-wrapper" className="profile-wrapper">
                <sidebar>
                <ProfilePic imgsrc={profile_pic}
                            first_name={first_name}
                            last_name={last_name}/>
                </sidebar>
                <section id="edit-section">
                <h2>{first_name} {last_name}</h2>
                <h2>Bio</h2>
                    {this.state.editBioToggle ?
                        (
                            <div id="edit-bio">
                                <textarea cols='100' rows='4' onChange={this.props.events.handleInput}>
                                    {bio || 'Add a bio!'}
                                </textarea>
                                <button onClick={(e) => {this.props.events.updateProfile(e); this.toggleEditBio(e);}}>Save</button>
                            </div>
                        ) :
                        (
                            <div>
                                <p>{bio || 'Add a bio!'}</p>
                                <button onClick={this.toggleEditBio}>Edit</button>
                            </div>
                        )}
                </section>
            </div>
        );
    }
}
