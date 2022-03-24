# Hi, Welcome to MusiLink

## Introduction

MusiLink is a freelance site built for the musically inclined not only to help exchange services between one another, but to help those wanting to break into the music scene and are looking for work.

## Motivations

MusiLink was made for my Capstone Project at NSS. It is part of the conclusion of the front-end portion of the course where we display our understanding of programming in Javascript, HTML, CSS, and React as well as our ability to think algorithmicly, to problem solve, and to communicate with other developers in the process of building. Before starting this project I thought it would be cool to have a "freelancing" site catered to music instead of general services, so, I thought to myself, why don't I try!

Since reaching MVP I have created a new view for Members so that they can view requests that have been made of them, as well as being able to accept, deny, abandon, or complete requests at their choosing. You can find the code for my *MVP* [here](https://github.com/Juulo/musilink/commit/0b24cc2afb63ff34b6686480f2269b0343fb6de6). You can also view my *ERD* [here](https://dbdiagram.io/d/622131e154f9ad109a56e62b) and my *Figma WireFrame* [here](https://www.figma.com/file/yZoXHEkVQJC0nrk6llldFd/Untitled).

## The Development Process

I developed this app over the course of about a few weeks with the help of peers and other knowledgable developers. After meeting MVP in about 3-4 days, working on necessary CRUD features. I began implementing stretch goals that I had established for myself. This app is meant to mirror other popular freelance sites that both offers services and contractual work for those in the music industry. So a part of that process is creating a two portal system, where an user can decide what side of the application they want to experience. The hardest part of developing this application was creating that second portal for our "Members". I had to go back to the drawing board to even restructure my ERD to make sure I had the most optimal solution to the problem. Now the app is fully fledged with the ability to create an account or login as a member or a user, which gives whoever is using the app certain features that the other doesn't have.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## How to install and run this project

If you would like to play around with this project you can use the live site (mwhich may or may not be active). You can also follow these instructions to download it and test it out on your local machine.

Note The api key will not work for any referrer other than my live site on digitalocean. If you would like to use the google maps functionality, you will need to generate a google maps api key for yourself and replace it in /src/repositories/Setting.js. Google Maps Javascript API Docs.

- Clone this repo
- Find my "musilink-api" repo to access the database directory used for this project and clone that repository
- In the database directory run json-server database.json -p 8088 -w
- Navigate to the musilink directory in you terminal
- In the project directory run npm start
- In a browser, open localhost:3000 and you should see the app running.

## How to use this app

After you've gone through the process of cloning both the App repo and the API repo open the app and you'll be presented with a landing page. Simply click the button to login/register. Having access to the sample data, you can choose a member or user to login to, or you can create a new account using an email and your first and last name. If you've logged in as an existing user you'll be presented with a Requests page for that specific user. If the user you've logged in as has made a request then it will display on the DOM. If they haven't then you can simply create a new request by visiting the Members page through the Find a Member link. Once you find a member with the occupation and genre tag that you like simply click the button to make a request on that user. This will take you to the request form asking for simple details, like a description and a deadline. Submit your request and you will be taken back to the Your Requests page. If you wish to make more requests you must visit the Members page again to find another member (or the same member) and make another request. This process is mirrored for new users. In the case of registering as a user you will be taken to your request view on registry. After which, you can then begin making your own requests. If you login as an existing member the experience will similarily reflect that of non members however members have the added functionality of being able to accept, deny, or complete requests. To test, login as a member that has a request and click the button to accept the pending request. You'll notice the state of data changes and that the request that was pending is now displayed in the accepted column.

