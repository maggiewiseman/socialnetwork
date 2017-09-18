import React from 'react';
import ReactDOM from 'react-dom';

import { connect } from 'react-redux';
import styled from 'styled-components';
import { UnderNav } from './styledComponents/wrapper';
import { SectionHeader } from './styledComponents/headers';
import { SidebarMenu } from './styledComponents/menus';
import { addMessage } from './actions';

const ENTER = 13;

class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.handleInput = this.handleInput.bind(this);
    }
    handleInput(e) {
        if(e.keyCode == ENTER) {
            console.log('enter! ');
            //here's where I call
            this.props.dispatch(addMessage(e.target.value));
        }
        console.log(e);
    }
    render() {
        return (
            <UnderNav>
                <SidebarMenu>
                    <SectionHeader>
                        Online Chat:
                    </SectionHeader>
                    {this.props.messages}
                    <textarea cols='60' rows='4' onKeyDown={this.handleInput} >
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
