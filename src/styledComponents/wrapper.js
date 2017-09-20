import styled from 'styled-components';

export const Wrapper = styled.div`
    background: hsla(27, 66%, 88%, 1);
    min-height: 100vh;
`;

export const Nav = styled.div`
    background: hsla(27, 66%, 5%, 1);

    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;

    > div  {
        ul {
            list-style: none;
            margin: 0;
            padding: 0;
            display: inline-block;


            > li {
                display: inline-block;
                padding-right: 20px;

                color: white;

                > a {
                    text-decoration: none;
                    color: white;
                }

                :hover,
                a:hover {
                    color: hsl(27, 66%, 29%);
                }
            }
        }
    }

`;

export const UnderNav = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;
    margin-top: 10px;

    @media (max-width: 530px) {
        flex-flow: column nowrap;
    }


`;

export const Sidebar = styled.aside`
    width: 25%;
    text-align: center;

`;

export const MainSection = styled.section`
    width: 73%;
    border: 1px solid hsla(27, 15%, 36%, 1);
    background: hsla(27, 66%, 97%, 1);
    margin-right: 1%;

    > * {
        padding: 0.25em;
    }
`;

export const FullPageModal = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    background: hsla(27, 15%, 36%, 0.45);
    width: 100%;
    height: 100vh;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
`;

export const Column = styled.section`
    width:  ${props => {
        if(props.two) {
            return '50%';
        } else if ( props.three ) {
            return '33%';
        } else if ( props.four ){
            return '25%';
        } else {
            return '100%';
        }
    }};

`;
