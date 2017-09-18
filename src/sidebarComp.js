import React from 'react';
import { ProfilePic} from './profile-pic';
import { Link } from 'react-router';
import { Sidebar } from './styledComponents/wrapper';
import { SectionHeader } from './styledComponents/headers';
import { SidebarMenu, SidebarMenuItem } from './styledComponents/menus';
import styled from 'styled-components';


export function SidebarComp(props) {
    return (
        <Sidebar>
            <ProfilePic imgsrc={props.profile_pic}
                first_name={props.first_name}
                last_name={props.last_name}/>
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
    );
}
