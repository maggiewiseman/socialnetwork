import styled from 'styled-components';

export const Button = styled.button`
    background: hsla(27, 66%, 5%, 1);
    border: transparent 2px solid;
    color: white;
    padding: 0.25em 0.5em;
    border-radius: 0;
    margin: 4px 0;

    :hover {
        border: hsla(27, 66%, 5%, 1) 2px solid;
        background: white;
        color: hsla(27, 66%, 5%, 1);
    }
`;