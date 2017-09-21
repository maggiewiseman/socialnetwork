import React from 'react';
import { connect } from 'react-redux';
import axios from './axios';
import { getWallPosts, saveWallPosts } from './actions';
import { HintText } from './styledComponents/text';



class WallPosts extends React.Component {
    constructor(props) {
        super(props);
        this.handleInput = this.handleInput.bind(this);
    }
    componentDidMount() {
        // axios.post('/getWallPosts').then((results) => {
        //     this.props.dispatch(getWallPosts(results));
        // });
    }
    handleInput(e) {
        this.setState({
            currPost: e.target.value
        });
    }
    render() {
        var taStyle = {
            width: '100%'
        };

        return(
            <div>
                <h3>Wall Posts</h3>
                <HintText>Say something! </HintText>
                <textarea style={taStyle} rows='4' onChange={this.handleInput}></textarea>
            </div>
        );
    }
}


{/********* CONNECTED COMPONENT ********/}

{/*the connect function we use below (and that was imported) will pass state to the mapStateToProps function. */}
const mapStateToProps = function(state) {
    return {
        posts: state.posts
    };
};

export default connect(mapStateToProps)(WallPosts);
