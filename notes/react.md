```javascript



```

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
