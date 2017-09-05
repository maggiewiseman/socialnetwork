## Webpack

* all of our code needs to be compiled to run in web browsers.  So we are going to use a transpiler.  Transpiler compile code from one language to another.
* our compiler is called Babel, it converts ES6 and JSX into ES5
* we also need all of the files to be bundled up and packaged together so we use a thing called webpack.
* webpack - you tell it where to start and it finds all the files and runs them through Babel and then packages it all together into one big giant javascript file. It figures out what to import based on the the import statements in each javascript "module"

* build file:
    - contains the configuration for webpack
    - in scripts section of json, it tells node to run the build script which builds the giant file and puts it in the public folder.  We only need to do this in production, but not in dev
    - when we put this in heroku, heroku runs npm start which if you look in pacakge.json runs the build script and then runs index.js

* inside the server we use a check for production. If we are not in production we use middleware that pauses the incoming requests while compilation is happening.
* pick babel plugins that convert whatever you used to whatever you need it to be.


## Compression middleware
* gzips your responses
* it is so simple to do you should do it on every project
* throw these lines into petition!
* adds a listener for when you send a response. If response is text that can be compressed, it auto compresses it using gzip.  Just about every browser knows how to automatically ungzip stuff

## Bundlejs

* src/start.js is the location configured as the beginning for building the big ole compressed file.
* Webpack sees that start.js is importing some stuff so it gets those and then those probably import some stuff
* all our other files we put in the src directory

## polyfill
* a term used for some mechanism for providing functionality that doesn't exist in certain environments.  
* there is now a method for strings called startsWith, but this is new, so if I wanted to make a polyfill for this I would put a method like

```javascript
String.prototype.startsWith = String.prototype.startsWith || function(arg) {
    return this.indexOf(arg) == 0;
}

//or instead you can just write yoru own function rather than doing a poly fill. This method causes less collision.
function startsWith(string, arg) {
    if(string.startsWith) {
        return strings.startsWith(arg);
    }
    return this.indexOf(arg) == 0;
}

```
