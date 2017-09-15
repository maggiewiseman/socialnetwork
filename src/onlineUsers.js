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

class OnlineUsers extends React.Component {
    render() {
        const { users } = this.props;
        console.log('this.props', this.props);
        if(!users) {
            console.log('no onlineUsers');
            return null;
        } else {
            console.log('RENDER function of friends. here is list of friends:', users);
        }
        var list = makeFriendList(users);
        return (
            <UnderNav>
                <SidebarMenu>
                    <SectionHeader>
                        Online Users:
                    </SectionHeader>
                    {list}
                </SidebarMenu>
            </UnderNav>
        );
    }
}

{/********* CONNECTED COMPONENT ********/}

{/*the connect function we use below (and that was imported) will pass state to the mapStateToProps function. */}
const mapStateToProps = function(state) {
    return {
        users: state.users
    };
};

export default connect(mapStateToProps)(OnlineUsers);
