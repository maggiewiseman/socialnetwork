import React from 'react';
import ReactDOM from 'react-dom';
import { ProfilePic, PicUploader } from './profile-pic';
import axios from './axios';
import { UnderNav, Column } from './styledComponents/wrapper';
import { SectionHeader } from './styledComponents/headers';
import { SidebarMenu, ProfileListItem } from './styledComponents/menus';
import styled from 'styled-components';
import { Button } from './styledComponents/buttons';
import { HintText } from './styledComponents/text';

export default class Friends extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            friends: [],
            others: []
        };
    }
    render() {
        return (
            <UnderNav>
                <Column two>
                    <SidebarMenu>
                        <SectionHeader>
                            Dogs you might know:
                        </SectionHeader>
                        <ul>
                            <ProfileListItem>
                            </ProfileListItem>
                        </ul>
                    </SidebarMenu>
                </Column>
                <Column two>
                    <SidebarMenu>
                        <SectionHeader>
                            Friends:
                        </SectionHeader>
                        <ul>
                            <ProfileListItem>
                            </ProfileListItem>
                        </ul>
                    </SidebarMenu>
                </Column>
            </UnderNav>
        );
    }
}
