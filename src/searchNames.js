import React from 'react';
import styled from 'styled-components';
import { Button } from './styledComponents/buttons';
import { SearchDiv } from './styledComponents/inputs';
import wrapSearchForm from './searchWrapper';
import { connect } from 'react-redux';

function SearchName({ handleInput, submit }) {
    return (

        <SearchDiv>
            <label forHTML="searchBox">Search</label>
            <input name="searchBox" type="text" placeholder="Search" onChange={handleInput} placeholder="Name"/>
            <Button search onClick={submit}>Find By Name</Button>
        </SearchDiv>
    );
}


const SearchNames = wrapSearchForm(SearchName, '/api/findAFriend');

export default connect()(SearchNames);
