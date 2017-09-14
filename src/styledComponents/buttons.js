import styled from 'styled-components';

export const Button = styled.button`
    background:  ${props => {
        if(props.go) {
            return 'rgba(123, 200, 25, 1)';
        } else if ( props.cancel ) {
            return 'rgba(255, 69, 25, 1)';
        } else if ( props.search){
            return 'rgba(123, 69, 25, 1)';
        } else {
            return 'hsla(27, 66%, 5%, 1)';
        }
    }};

    border: transparent 2px solid;
    color: white;
    padding: 0.25em 0.5em;
    border-radius: 0;

    display: ${props => {
        if(props.go || props.cancel || props.search) {
            return 'inline';
        } else {
            return 'block';
        }
    }};

    :hover {
        background: white;
        border: ${props => {
            if(props.go) {
                return 'rgba(123, 200, 25, 1) solid 2px';
            } else if ( props.cancel ) {
                return 'rgba(255, 69, 25, 1) solid 2px';
            } else {
                return 'hsla(27, 66%, 5%, 1) solid 2px';
            }
        }};


        color: ${props => {
            if(props.go) {
                return 'rgba(123, 200, 25, 1)';
            } else if ( props.cancel ) {
                return 'rgba(255, 69, 25, 1)';
            } else {
                return 'hsla(27, 66%, 5%, 1)';
            }
        }};
    }

    margin:  ${props => props.center ? '0 auto' : '5px 0' };
`;

export const ButtonGroup = styled.div`

    > button {
        margin-right: 5px;
    }
`;
