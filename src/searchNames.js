import React from 'react';
import styled from 'styled-components';
import { Button } from './styledComponents/buttons';
import { SearchDiv } from './styledComponents/inputs';
import wrapSearchForm from './searchWrapper';
import { connect } from 'react-redux';
import { SectionHeader } from './styledComponents/headers';
import { Link } from 'react-router';

function SearchName({ handleInput, submit, results, handleChoice, inputVal }) {

    const liStyle = {
        margin: '6px 4px'
    };

    const aStyle = {
        color: 'brown',
    };

    const ulStyle = {
        listStyle: 'none'
    };

    if(results) {
        console.log('results', results);
        var resultsList = results.map((result) => {
            const { id, first_name, last_name } = result;
            var link = '/profile/' + id;
            return (
                <li id={id}  style={liStyle} key={id.toString()}><Link to={link} style={aStyle} >{first_name + ' ' + last_name}</Link></li>
            );
        });
    }


    return (

        <SearchDiv>
            <label forHTML="searchBox">Search</label>
            <input name="searchBox" type="text" placeholder="Search" onKeyUp={handleInput} placeholder="Name" value={inputVal}/>
            {results &&
            <Results>
                <SectionHeader>
                    Results
                </SectionHeader>
                <ul style={ulStyle}>
                    {results && resultsList}
                </ul>
            </Results>}
        </SearchDiv>
    );
}


const SearchNames = wrapSearchForm(SearchName, '/api/findAFriend');

const mapStateToProps = function(state) {
    return {
        searchString: state.searchString,
        searchResults: state.searchResults
    };
};
export default connect(mapStateToProps)(SearchNames);

const Results = styled.div`
    position: absolute;
    top: 50px;
    left: -1px;
    background: white;
    height: 300px;
    width: 228px;
    border: 1px solid hsla(27, 66%, 5%, 1);

`;
