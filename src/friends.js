import React from 'react';
import ReactDOM from 'react-dom';
import { ProfilePic, PicUploader } from './profile-pic';
import axios from './axios';
import { Sidebar, MainSection, UnderNav, Column } from './styledComponents/wrapper';
import { SectionHeader } from './styledComponents/headers';
import { SidebarMenu, ProfileListItem } from './styledComponents/menus';
import styled from 'styled-components';
import { Button } from './styledComponents/buttons';
import { HintText } from './styledComponents/text';

export default class Friends extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            friends: [{
                id: 1,
                first_name: 'Phil',
                last_name: 'Bulldog',
                profile_pic: 'https://s3.amazonaws.com/maggiesgingersocialnetwork/6xuprnPc76QwWoSGJhDt4BifybxUPfZR.png'
            }, {
                id: 2,
                first_name: 'Mr',
                last_name: 'Peanutbutter',
                profile_pic: 'https://s3.amazonaws.com/maggiesgingersocialnetwork/2vZpdN1StHdAf32l-iPQpYJCbGmCHaAQ.png'
            }],
            pendingFriends: [{
                id: 3,
                first_name: 'Sheryl',
                last_name: 'Poodle',
                profile_pic: 'https://s3.amazonaws.com/maggiesgingersocialnetwork/6xuprnPc76QwWoSGJhDt4BifybxUPfZR.png'
            }, {
                id: 4,
                first_name: 'Copper',
                last_name: 'Wood',
                profile_pic: 'https://s3.amazonaws.com/maggiesgingersocialnetwork/qe3CFN72NssirxS8-dhCY9dF1DzBmXzZ.png'
            }]
        };
    }
    render() {


        const friend = (
            <div>
                <SidePic>
                    <ProfilePic nav
                        imgsrc={'https://s3.amazonaws.com/maggiesgingersocialnetwork/6xuprnPc76QwWoSGJhDt4BifybxUPfZR.png'}
                        first_name={'Phil'}
                        last_name={'Bulldog'} />
                </SidePic>
                <DogInfo>
                    Phil Bulldog
                    <Button>End Friendship</Button>
                </DogInfo>

            </div>
        );



        return (
            <UnderNav>
                <Column two>
                    <SidebarMenu>
                        <SectionHeader>
                            Dogs who want to be friends:
                        </SectionHeader>
                        <ul>
                            {friend}
                        </ul>
                    </SidebarMenu>
                </Column>
                <Column two>
                    <SidebarMenu>
                        <SectionHeader>
                            Friends:
                        </SectionHeader>
                        <ul>
                            {friend}
                        </ul>
                    </SidebarMenu>
                </Column>
            </UnderNav>
        );
    }
}

const SidePic = styled.div`
    width: 30%;
    text-align: center;
    padding: 6px 0;
    float: left;
`;

const DogInfo = styled.div`
    width: 60%;
    float: left;
    padding: 6px 0;
`;
