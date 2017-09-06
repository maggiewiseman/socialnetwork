# Composition:
* have similar components, why not make a generic component and give it some params and some conditionals
* have one component and just throw in some parameters with a bunch of conditionals, but that is messy
* React discourages inheritance b/c they think it causes confusion b/c you have to keep going up the prototype chain to understand all the stuff a given component could do
* So we will inherit functionality from one layer (extends React.Component) and that is it.

## The Alternative
* components can contain other components so you can grant functionality and behavior by wrapping it in another component.
* make a container component with certain syntax
    * classes b/c they have state
    * render function is simple basically lists the component to render
* make presentation components
    * primary role is to present things
    * usually functional components (don't have state)


```javascript

function Hello() {

}

//thie returns a new class
function wrap(Comp) {
    return class Whatever {
        render() {
            return (
                <div style={{
                    color: 'red'
                }}><Comp /></div>
            )
        }
    }
}

var WrappedHello = wrap(Comp)

```

* imagine a social network - they have lots of lists of users so you can make a presentational component called lists of userss and it just lists a bunch of users, b/c the data is different you have different containers that have different urls that will get different data, but have the same presentation component b/c you present the list of users in the same way. 
