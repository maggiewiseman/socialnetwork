import React from 'react';
import ReactDOM from 'react-dom';
import { ProfilePic, PicUploader } from './profile-pic';
import axios from './axios';
import { Link } from 'react-router';
import { Sidebar, MainSection, UnderNav } from './styledComponents/wrapper';
import { SectionHeader } from './styledComponents/headers';
import { SidebarMenu, SidebarMenuItem } from './styledComponents/menus';
import styled from 'styled-components';
import { Button } from './styledComponents/buttons';
import { HintText } from './styledComponents/text';

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
        var divStyle = {
            marginTop: 10
        };
        return (
            <UnderNav>
                <Sidebar>
                    <ProfilePic imgsrc={profile_pic}
                        first_name={first_name}
                        last_name={last_name}/>
                    <SidebarMenu>
                        <SectionHeader>
                            Menu
                        </SectionHeader>
                        <ul>
                            <SidebarMenuItem><Link to='/'>Home</Link></SidebarMenuItem>
                            <SidebarMenuItem><Link to='/friends'>See Friends</Link></SidebarMenuItem>
                            <SidebarMenuItem>Edit Profile</SidebarMenuItem>
                            <SidebarMenuItem><Link to='/onlineUsers'>Who is Online</Link></SidebarMenuItem>
                            <SidebarMenuItem><Link to='/chat'>Chat</Link></SidebarMenuItem>
                        </ul>
                    </SidebarMenu>
                </Sidebar>
                <MainSection>
                    <SectionHeader>
                        Edit Profile
                    </SectionHeader>
                    <h2>{first_name} {last_name}</h2>
                    <h3>Bio</h3>
                    <HintText>Limit 300 characters</HintText>
                    <EditBio>
                        {this.state.editBioToggle ?
                            (
                                <div>
                                    <textarea cols='60' rows='4' onChange={this.props.events.handleInput}>
                                        {bio || 'Add a bio!'}
                                    </textarea>
                                    <Button onClick={(e) => {this.props.events.updateProfile(e); this.toggleEditBio(e);}}>Save</Button>
                                </div>
                            ) :
                            (
                                <div>
                                    <p>{bio || 'Add a bio!'}</p>
                                    <Button onClick={this.toggleEditBio}>Edit</Button>
                                </div>
                            )}
                    </EditBio>
                </MainSection>
            </UnderNav>
        );
    }
}

const EditBio = styled.div`
    margin-left: 20px;

    > div {
        > textarea {
            display: block;

        }
    }
`;
