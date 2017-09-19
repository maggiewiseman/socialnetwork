import React from 'react';
import axios from './axios';
import styled from 'styled-components';
import { Button } from './styledComponents/buttons';
import { findAFriend } from './actions';
import { browserHistory } from 'react-router';

export default function(Component, url) {
    return class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {url};
            this.handleInput = this.handleInput.bind(this);
            this.submit = this.submit.bind(this);
            this.handleChoice = this.handleChoice.bind(this);

        }
        handleInput(e) {
            console.log('sending get request', e);
            if(e.keyCode == 8) {
                console.log('backspace');
                this.setState({
                    searchString: null,
                    searchResults: null
                });
            }
            //console.log(e.target.name);
            /*Do ajax request here and then store in state */
            axios.get('/api/searchname/' + e.target.value).then((results) => {
                console.log(results.data.results);
                this.setState({
                    searchResults: results.data.results
                });
            }).catch(e => {
                console.log(e);
            });
        }
        handleChoice(e) {
            console.log('handle choice', e.target);
            this.setState({
                searchString: e.target.innerHTML,
                searchResults: null
            });
        }
        submit(e) {
            console.log(this.state.searchString);
            console.log(this);
            this.props.dispatch(findAFriend(this.state.searchString, this.state.url));
            browserHistory.push('/searchResults');
            this.setState({
                searchString: null
            });
        }
        render() {
        
            return <Component
                error={this.state.error}
                handleInput={this.handleInput}
                submit={this.submit}
                results={this.state.searchResults}
                handleChoice={this.handleChoice}
                inputVal={this.state.searchString}
            />;
        }
    };
}


// function SearchBio({ handleInput, submit }) {
//     return (
//         <SearchDiv>
//             <label forHTML="searchBox">Search</label>
//             <input name="searchBox" type="text" placeholder="Search" onChange={handleInput} placeholder="Name"/>
//             <Button search onClick={submit}>Find By Topic</Button>
//         </SearchDiv>
//     );
// }


// const SearchNames = wrapSearchForm(SearchName, '/api/findAFriend');
// const SearchBios = wrapSearchForm(SearchBio, '/api/searchBio');
//
// export default connect()(SearchNames);
