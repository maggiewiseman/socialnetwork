import React from 'react';
import styled from 'styled-components';
import { Button } from './styledComponents/buttons';
import { SearchDiv } from './styledComponents/inputs';
import wrapSearchForm from './searchWrapper';
import { connect } from 'react-redux';
import { SectionHeader } from './styledComponents/headers';
import { Link } from 'react-router';

function SearchName({ handleInput, submit, results }) {
    if(results) {
        var resultsList = results.map((msg) => {
            const { id, first_name, last_name } = msg;
            var link = '/profile/' + id;
            return (
                <li key={id.toString()}><Link to={link}>{first_name + ' ' + last_name}</Link></li>
            );
        });
    }


    return (

        <SearchDiv>
            <label forHTML="searchBox">Search</label>
            <input name="searchBox" type="text" placeholder="Search" onChange={handleInput} placeholder="Name"/>
            <Button search onClick={submit}>Find By Name</Button>
            {results &&
            <Results>
                <SectionHeader>
                    Results
                </SectionHeader>
                {resultsList}
            </Results>}
        </SearchDiv>
    );
}


const SearchNames = wrapSearchForm(SearchName, '/api/findAFriend');

export default connect()(SearchNames);

const Results = styled.div`
    position: absolute;
    top: 50px;
    left: -1px;
    background: white;
    height: 300px;
    width: 228px;
    border: 1px solid hsla(27, 66%, 5%, 1);
`;
