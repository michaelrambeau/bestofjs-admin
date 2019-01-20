# Best of JavaScript admin web application

This is the web application used to manage https://bestofjs.org content, intended for "admin" users only.

If you want to star the project, please check the main repository https://github.com/bestofjs/bestofjs-webui

This application is used to manually create:

- Projects
- Tags
- Hall of Fame members

Data is automatically updated every day by batches running from an other repository.

### Install

Built with [KeystoneJS](http://www.keystonejs.com/) (a node.js cms and web app framework), following these steps:

- install keystone from Github master branch (v0.4)
- create `.env` file to set credentials (`MONGO_URI`, `CLOUDINARY_URL` and `COOKIE_SECRET`)
- install `dotenv` module
- create `keystone.js` startup file
- add models:
  - Project
  - User
  - Tag
  - Snapshot
  - Link
  - Review
  - Hero
- Set npm start command in package.json: `node keystone`

Note: this application has been from built from scratch using KeystoneJS as a dependency, rather than recommended way, using the Yeoman generator.

On May 2015, I got an issue an error about the .favicon file, I was unable to start the server.
I had to create a `public` folder at the root level, with the missing `favicon.ico` file to solve the issue.

### Deploy

This application was deployed on Heroku, using the free plan, since the application does not have to be up and running 24 hours a day.

It can also be run on cloud environments like https://c9.io.
