import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
    //example of JSX: javascript XML
    <HelloWorld />, //this is a componment
    //components can be written as functions and they wold be called functional components
    //components can also be written as classes
    // every tag has to be closed with />
    //A jsx epxression has to be one element in its entirety

    document.querySelector('main')
);

function HelloWorld() {
    //note that there's no strings around the html
    return ( // () aren't necessary, just needed for multiline
        <div>Hello, <Emphasized word="World" />!</div>
        //this would not work if we added another div in here unless we wrapped them both
        //a functional componet returns some jsx that can be rendered
    );
    //JSX is like a domain specific language.  A little syntax created for doing specific tasks
    //wen you create a component: I've defined it with a capital letter. Normally we reserve capital letters for constructors. That is still true except that all components start with a capital letter.
    //They need to start with a capital letter b/c we have to distinguish between html elements (lowercase) and the components I made (capital letter)

}
//make a component that emphasizes a word
//components are passed props that contain the attributes given the component.
function Emphasized(props) {
    return (
        //first set of curly braces means evaluate as js
        //the next set is the object of styles
        //remember even though this LOOKS like html....it is NOT.  It is Javascript (well, JSX)
        //so if you want some Javascript evaluation to happen you must wrap the expression in curly braces
        <span id='emph' className="{emph ${props.word}}" style={{fontWeight: 'bold', fontStyle:"italic", textDecoration: 'underline'}}><{props.word}/span>
    );
}

//it would be wrong for me to reset props to something else.
//you use them but don't edit them.

function NiceToSeeYOu(props) {
    return (
        <div>It is nice to see you <Emphasized word={props.word} />!</div>
    );
}

function HelloWorld2() {
    //looping through and array.  This might not be the exact syntax
    return (
        <div>
            <ul>{['World', 'KITTY', 'Moon'].map(<NiceToSeeYou word={name} />)} </ul>
        </div>
    )
        <div>Hello, <Emphasized word="World" />!</div>
}

rando = Math.random()*10;
//a kind of if statment...only show yes if rando is less than 5
{rando < 5 && 'yes!'}

===================================================

ReactDOM.render(
    //function components do not have state
    //to get state I need to have a class so going to convert hello that uses class
    <Hello />, //this is a componment

    document.querySelector('main')
);

class Hello extends React.Component {
    //if you want a Component to have a state that can change, use class
    constructor(props) {
        super(props);
        //this is the only time you can directly set things on this object
        this.state = {
            word: 'World'
        };
    }
    changeWord() {
        //every object has a setState method that allows us to change state properties
        this.setState({
            //when we change the state, React calls the render coponents of all the relevant coponents that have that particular state in it.
            word: e.target.value
        })
    }
    //classes need render that returns some JSX
    //classy components are stateful components
    render() {
        return (
            <div>
                <div>Hello, <Emphasized word={this.state.word} />!</div>
                // make it so that typing in the input field changes the state property
                //the event object that gets sent isn't exactly the same event, but it is a synthetic event and it has all the stuff we want.

                //<input id="name-changed" onChange={e => this.changeWord(e)}/>
                <NameChanger changeName={(e) => this.changeWord(e)}
                // or if I wanted to pass a function...there's more to it than this...
                <NameChanger changeName={this.changeWord}
            </div>
        );
    }
}

function NameChanger() {
    return (
        <input id="name-changer" onChange={e=> props.changeName(e)} />
    )
}
