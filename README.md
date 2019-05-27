# Social Network

## Summary
Mock social network project for dogs. Includes some unit tests written with Mocha and Chai.

## Tech Stack
* React
* Redux
* Express.js with Node.js
* Socket.io
* Postgresql
* AWS S3 to store images

## Styles
* Custom logo created using Adobe Illustrator
* styled-components npm package used for styling

## Features
* Login and registration. Passwords are hashed using the bcrypt library. Forms include CSRF protection using the csurf npm package.
<img src="https://raw.githubusercontent.com/maggiewiseman/socialnetwork/master/assets/screenshots/dogBookReg.png" width="400px" alt="Landing page. Shows registration" />

* Users can personalize their page by adding bio and image.
<img src="https://raw.githubusercontent.com/maggiewiseman/socialnetwork/master/assets/screenshots/dogBookProfilePage.png" width="400px" alt="Shows main user profile / home page" />

<img src="https://raw.githubusercontent.com/maggiewiseman/socialnetwork/master/assets/screenshots/dogBookEditBio.png" width="400px" alt="Show ability to edit bio" />

* Users can see who is online.
<img src="https://raw.githubusercontent.com/maggiewiseman/socialnetwork/master/assets/screenshots/dogBookOnlineUsers.png" width="400px" alt="Shows a list of online users" />

* Users can use the group chat feature to chat with everyone that is online. 
<img src="https://raw.githubusercontent.com/maggiewiseman/socialnetwork/master/assets/screenshots/dogBookChat.png" width="400px" alt="Shows chat messages" />

* Users can find friends using the search box that uses incremental search methods.
<img src="https://raw.githubusercontent.com/maggiewiseman/socialnetwork/master/assets/screenshots/dogBookIncrementalSearch.png" width="400px" alt="Shows profile page with s typed into search box and resulting list of users with s in their name" />

* Users can see a list of friends as well as make, cancel, end, and receive friend requests.  
<img src="https://raw.githubusercontent.com/maggiewiseman/socialnetwork/master/assets/screenshots/dogBookFriendsPage.png" width="400px" alt="Shows list of current friends and those requesting friendship" />

<img src="https://raw.githubusercontent.com/maggiewiseman/socialnetwork/master/assets/screenshots/dogBookOPafterFR.png" width="400px" alt="Shows profile of another user who has a pending friend request" />

## Requirements
* Node.js
* SQL Database such as PostgreSQL
* AWS S3 container

## Installation
* fork or clone the repo
* npm install

### Configure
* create database then set up tables using sql/setup.sql
* configure database connections strings in dbQuery.js
* configure client object in awsHandler.js with AWS info. 

### Run
* npm run server.js
* In a different terminal: node build-server.js which will serve the build file.  
