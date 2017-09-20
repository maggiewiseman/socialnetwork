import React from 'react';
import ReactDOM from 'react-dom';
import { ProfilePic, PicUploader } from './profile-pic';
import { Sidebar, MainSection, UnderNav, Column } from './styledComponents/wrapper';
import { SectionHeader } from './styledComponents/headers';
import { SidebarMenu, ProfileListItem } from './styledComponents/menus';
import styled from 'styled-components';
import { Button } from './styledComponents/buttons';
import { HintText } from './styledComponents/text';
import { receiveFriends } from './actions';
import { connect } from 'react-redux';
import makeFriendList from './makeFriendList';
import { SidebarComp } from './sidebarComp';

class OnlineUsers extends React.Component {
    render() {
        const { users } = this.props;
        if(!users) {
            console.log('no onlineUsers');
            return null;
        }
        var list = makeFriendList(users);
        return (
            <UnderNav>
                <SidebarComp first_name={this.props.currUser.first_name} last_name={this.props.currUser.last_name} profile_pic={this.props.currUser.profile_pic}/>
                <MainSection>
                    <SectionHeader>
                        Online Users:
                    </SectionHeader>
                    {list}
                </MainSection>
            </UnderNav>
        );
    }
}

{/********* CONNECTED COMPONENT ********/}

{/*the connect function we use below (and that was imported) will pass state to the mapStateToProps function. */}
const mapStateToProps = function(state) {
    return {
        users: state.users,
        currUser: state.currUser

    };
};

export default connect(mapStateToProps)(OnlineUsers);
