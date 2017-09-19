import React from 'react';
import styled from 'styled-components';
import { Button } from './styledComponents/buttons';
import { SearchDiv } from './styledComponents/inputs';
import wrapSearchForm from './searchWrapper';
import { connect } from 'react-redux';

function SearchBio({ handleInput, submit }) {
    return (
        <SearchDiv>
            <input name="searchBox" type="text" placeholder="Search" onChange={handleInput} placeholder="Keyword"/>
            <Button search onClick={submit}>Find By Keyword</Button>
        </SearchDiv>
    );
}


const SearchBios = wrapSearchForm(SearchBio, '/api/searchbio');

export default connect()(SearchBios);
