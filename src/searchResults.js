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
import FriendList from './friendList';
import FriendRequestList from './friendRequestList';
import { updateFriendship } from './actions';


class SearchResults extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.dispatch = this.props.dispatch.bind(this);
    }
    render() {
        const { searchResults, dispatch } = this.props;
        console.log('this.props', this.props);
        if(!searchResults) {
            console.log('no users');
            return null;
        } else {
            console.log('RENDER function of friends. here is list of friends:', searchResults);
        }
        return (
            <UnderNav>
                <MainSection>
                    <SectionHeader>
                        Search Results:
                    </SectionHeader>
                    {<FriendRequestList friends={searchResults} handleFriendshipChange={id => dispatch(updateFriendship(id))}/>}
                </MainSection>
            </UnderNav>
        );
    }
}

{/********* CONNECTED COMPONENT ********/}

{/*the connect function we use below (and that was imported) will pass state to the mapStateToProps function. */
// const mapStateToProps = function(state) {
//     return {
//         searchResults: state.searchResults
//     };
// };
//
// export default connect(mapStateToProps)(SearchResults);
}
