import React from 'react';
import ReactDOM from 'react-dom';
import axios from './axios';
import { ProfilePic } from './profile-pic';
import { Sidebar, MainSection, UnderNav } from './styledComponents/wrapper';
import { SectionHeader } from './styledComponents/headers';
import { SidebarMenu, SidebarMenuItem } from './styledComponents/menus';
import styled from 'styled-components';
import { Button } from './styledComponents/buttons';
import { HintText } from './styledComponents/text';

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
            var { first_name, last_name, profile_pic, bio, friendshipStatus } = res.data;
            this.setState({ id, first_name, last_name, profile_pic, bio, friendshipStatus}, () => {
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
        var { id, first_name, last_name, profile_pic, bio, friendshipStatus} = this.state;
        console.log('friendshipStatus: ', friendshipStatus);
        return (

            <UnderNav>
                <Sidebar>
                    <ProfilePic imgsrc={profile_pic}
                            first_name={first_name}
                            last_name={last_name}/>
                            <Button center>Make Friend Request</Button>
                </Sidebar>
                <MainSection>
                    <h2>{first_name} {last_name}</h2>
                    <h3>Bio</h3>
                    <p>{bio}</p>
                </MainSection>
            </UnderNav>
        );
    }
}
