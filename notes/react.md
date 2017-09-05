# components

Conceptually, components are like JavaScript functions. They accept arbitrary inputs (called "props") and return React elements describing what should appear on the screen

componentDidMount() {
  this.timerID = setInterval(
    () => this.tick(),
    1000
  );
}
Note how we save the timer ID right on this.

While this.props is set up by React itself and this.state has a special meaning, you are free to add additional fields to the class manually if you need to store something that is not used for the visual output.

If you don't use something in render(), it shouldn't be in the state.

# state
* Every component can have its own state
* what can be state for one component can be props for another.
* when you change the state of a component it automatically updates the components
* uses one way data binding.
    * the data flows in one way
    * emphasized function cannot change state

* when jsx is parsed and put everything in dom, it maintains a model of the dom: a bunch of js objects taht represents the dom elements in the page.  When something changes it does a practice run  an compares that to the virtual dom and then only updates the changed elements in the live dom
* it is advised to not do too much stuff in your render b/c it gets called over and over again.
    * creating a function is slower than just referring to a function, but if you use this.functionName the this reference will be lost so do the following in the constructor

    ```javascript

    this.functioName = this.functionName.bind(this)

    ```
* Lifting State
    * when you have a couple of components that are using the same data, you want to have a common parent component that can send data to both of them
