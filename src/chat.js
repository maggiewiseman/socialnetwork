import React from 'react';
import ReactDOM from 'react-dom';

import { connect } from 'react-redux';
import styled from 'styled-components';
import { UnderNav } from './styledComponents/wrapper';
import { SectionHeader } from './styledComponents/headers';
import { SidebarMenu } from './styledComponents/menus';

class Chat extends React.Component {
    render() {
        return (
            <UnderNav>
                <SidebarMenu>
                    <SectionHeader>
                        Online Users:
                    </SectionHeader>
                    <textarea cols='60' rows='4' >
                    </textarea>
                </SidebarMenu>
            </UnderNav>
        );
    }
}


const mapStateToProps = function(state) {
    console.log('mapping state to props in chat');
    return {
        messages: state.messages
    };
};

export default connect(mapStateToProps)(Chat);
