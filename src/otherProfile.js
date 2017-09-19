import React from 'react';
import ReactDOM from 'react-dom';
import axios from './axios';
import { ProfilePic } from './profile-pic';
import { Sidebar, MainSection, UnderNav } from './styledComponents/wrapper';
import { SectionHeader } from './styledComponents/headers';
import { SidebarMenu, SidebarMenuItem } from './styledComponents/menus';
import styled from 'styled-components';
import FriendButton from './friendButton';
import { HintText } from './styledComponents/text';

export default class OtherProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentWillReceiveProps() {
        console.log('will receive props', this.props);
        this.componentWillMount();
    }
    componentWillMount() {
        //check props.state for id, otherwise do the following:
        console.log('in OtherProfile Comoneent');
        let id = this.props.params.id;
        var url = '/api/user/' + id;
        axios.get(url).then((res)=> {
            console.log('OtherProfile after mounting: res is:', res);
            if(res.data.success == '200') {
                var { first_name, last_name, profile_pic, bio } = res.data.userInfo;
                this.setState({ id, first_name, last_name, profile_pic, bio}, () => {
                    console.log('did mount state: ', this.state);
                });
            } else if (res.data.success == 204) {
                //redirect to home page this is the same user
                location.replace('/');
            }

        }).catch((e) =>{
            this.setState({
                error: e
            });
            console.error(e);
        });
    }
    render() {
        var { id, first_name, last_name, profile_pic, bio} = this.state;
        console.log('ID', id);
        return (

            <UnderNav>
                <Sidebar>
                    <ProfilePic imgsrc={profile_pic}
                            first_name={first_name}
                            last_name={last_name}/>
                            {id && <FriendButton receiver={id}/>}
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
