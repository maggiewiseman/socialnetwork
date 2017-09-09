import styled from 'styled-components';

export const SidebarMenu = styled.div`
    width: 90%;
    background: hsla(27, 66%, 97%, 1);
    border: 1px solid hsla(27, 15%, 36%, 1);
    margin: 0 auto;

    > ul {
        list-style: none;
        margin: 0;
        padding: 0;
    }
`;


export const SidebarMenuItem = styled.li`
    padding: 0.7em .25em;
    text-align: left;

`;
