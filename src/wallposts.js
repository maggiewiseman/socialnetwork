import React from 'react';
import { connect } from 'react-redux';
import axios from './axios';
import { getWallPosts, saveWallPosts } from './actions';
import { HintText } from './styledComponents/text';
import { Button } from './styledComponents/buttons';
import styled from 'styled-components';


class WallPosts extends React.Component {
    constructor(props) {
        super(props);
        this.handleInput = this.handleInput.bind(this);
        this.savePost = this.savePost.bind(this);
    }
    componentDidMount() {
        // axios.post('/api/wallposts/' + this.props.currUser.id).then((results) => {
        //     this.props.dispatch(getWallPosts(results));
        // });
    }
    handleInput(e) {
        this.setState({
            currPost: e.target.value
        });
    }
    savePost() {
        this.props.dispatch(saveWallPosts(this.state.currPost));
    }
    render() {
        var taStyle = {
            width: '100%'
        };

        return(
            <div>
                <h3>Wall Posts</h3>
                <HintText>Say something! </HintText>
                <EditField>
                    <textarea style={taStyle} rows='4' onChange={this.handleInput}></textarea>
                    <Button onClick={this.savePost}>Post</Button>
                    {this.props.posts && <div>{this.props.posts} POSTS!!! </div>}
                </EditField>
            </div>
        );
    }
}


{/********* CONNECTED COMPONENT ********/}

{/*the connect function we use below (and that was imported) will pass state to the mapStateToProps function. */}
const mapStateToProps = function(state) {
    return {
        currUser: state.currUser,
        posts: state.posts
    };
};

export default connect(mapStateToProps)(WallPosts);

{/********* STYLED COMPONENTS ********/}
export const EditField = styled.div`
    margin-left: 20px;

    > div {
        > textarea {
            display: block;

        }
    }
`;
