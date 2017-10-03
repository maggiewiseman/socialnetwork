# Social Network

## Summary
Mock social network project for dogs. Includes some unit tests written with Mocha and Chai.

## Tech Stack
* React
* Redux
* Express.js on Node.js
* Socket.io
* Postgresql
* AWS S3 to store images

## Styles
* Custom logo created using Adobe Illustrator
* styled-components library used for styling

## Features
* Login and registration. Passwords are hashed using the bcrypt library. Forms include CSRF protection using the csurf npm package.
<img src="https://raw.githubusercontent.com/maggiewiseman/socialnetwork/master/assets/screenshots/dogBookReg.png" width="400px" alt="Landing page. Shows registration" />
* Users can personalize their page by adding bio and image.
* Users can see who is online.
* Users can use the group chat feature to chat with everyone that is online. 
* Users can find friends using the search box that uses incremental search methods.
* Users can see a list of friends as well as make, cancel, end, and receive friend requests.  
