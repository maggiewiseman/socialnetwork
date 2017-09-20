import React from 'react';
import axios from './axios';
import styled from 'styled-components';
import { Button } from './styledComponents/buttons';
import { findAFriend, saveSearchResults, deleteSearchResults  } from './actions';
import { browserHistory } from 'react-router';
import { SearchDiv } from './styledComponents/inputs';
import { connect } from 'react-redux';
import { SectionHeader } from './styledComponents/headers';
import { Link } from 'react-router';


class Search extends React.Component {
    constructor(props) {
        super(props);
        this.handleInput = this.handleInput.bind(this);
        this.handleChoice = this.handleChoice.bind(this);
    }
    handleInput(e) {
        if(!e.target.value) {
            console.log('target value is blank');
            this.props.dispatch(deleteSearchResults());
        } else {
            axios.post('/api/search', {string: e.target.value}).then((results) => {
                console.log(results.data.results);
                this.props.dispatch(saveSearchResults(results.data.results));

            }).catch(e => {
                console.log(e);
            });
        }
    }
    handleChoice(e) {

        this.searchInput.value = '';
    }
    render() {
        console.log('wrapper: ', this.props);

        const liStyle = {
            margin: '6px 4px'
        };

        const aStyle = {
            color: 'brown',
        };

        const ulStyle = {
            listStyle: 'none'
        };

        const xStyle = {
            display: 'inline-block',
            cursor: 'pointer',
            paddingLeft: '140px'
        };

        const inputStyle = {
            marginBottom: '4px',
            padding: '2px'
        }

        if(this.props.searchResults) {
            console.log('results', this.props.searchResults);
            var resultsList = this.props.searchResults.map((result) => {
                const { id, first_name, last_name } = result;
                var link = '/profile/' + id;
                return (
                    <li id={id}  style={liStyle} key={id.toString()}><Link to={link} style={aStyle} ><span onClick={this.handleChoice}>{first_name + ' ' + last_name}</span></Link></li>
                );
            });
        }
        return (

            <SearchDiv>
                <label forHTML="searchBox">Search</label>
                <input name="searchBox" type="text" placeholder="Search" onKeyUp={this.handleInput} placeholder="Name" ref={el => this.searchInput = el} style={inputStyle}/>
                {this.props.searchResults &&
                <Results>
                    <SectionHeader>

                        Results
                        <div style={xStyle} onClick={() => { this.handleChoice();
                            this.props.dispatch(deleteSearchResults());}}>X</div>
                    </SectionHeader>
                    <ul style={ulStyle}>
                        {this.props.searchResults && resultsList}
                    </ul>
                </Results>}
            </SearchDiv>
        );
    }
}

const mapStateToProps = function(state) {
    return {
        searchString: state.searchString,
        searchResults: state.searchResults
    };
};
export default connect(mapStateToProps)(Search);

const Results = styled.div`
    position: absolute;
    top: 40px;
    left: -1px;
    background: white;
    height: 300px;
    width: 228px;
    border: 1px solid hsla(27, 66%, 5%, 1);

`;
