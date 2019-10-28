# tetraka
Codebase for tetraka.com

## Collaborators  
Chris Choy (contact@chrischoy.net)  
Cole Koester (cole.koester@tufts.edu)  
Cameron Diperna ()  
Mollie Wild ()  

# Running the Code

After cloning the project or checking out a branch, *always* run the `setup.sh` script. This 
will ensure your environment is primed to run the app out of the box.

**Note**: We have two package.json files. One is for testing, building, and running just our 
React UI. The other is for running the entire server which will use the currently built version 
of the React UI. See [File Structure](#File-Structure) for help in understanding this.

### Dependency management

`npm install package-name --save` - install new modules. writes to package & package-lock.json.  
`npm ci` - install module dependencies determined by package & package-lock.json  

### Testing React-UI
This is for when you want to just test that the UI components are working properly. These 
commands *must* be run from within the `tetraka/tetraka/react-ui` directory to reference 
the correct package.json stored there.  

`npm start` - compiles and runs app on localhost (this uses the raw files, not the build ones)  
`npm run test` - runs unit and integration tests  
`npm run build` - builds the optimized application artifact for production deployment.  

### Testing the Server
If you want to test the entire server as it would be seen in production, using the compiled build/ 
files for the UI and simulating actual client-server communications, you'll want to run the entire 
server. These commands must be run from the `tetraka/tetraka/` directory.  

`npm start` - runs the entire server on localhost  
`npm run build` - recompile the server and react-ui. Must be run for changes to be shown in localhost.  
`npm run tsc` - compiles the server ts files to js   
`npm run clean` - remove all js files from server/models   

# Design

Tetraka utilizes Typescript running on Node.js to fulfill its server and backend code 
requirements. ReactJS is used to fulfill the user interface requirements. The entire 
application must be built following HTML5 standards without the aid of Flash (deprecated 
as of 2020) or other browser plugins.

### Frontend
Under the hood, Tetraka is a single page browser application. That is, all content is 
accessed and updated on the index.html page. We simulate a multi-page application by 
using the React-Router package. In addition to the UI, Tetraka also answers API and PING 
calls through the /api and /ping pages.

### Backend
The logic for Tetraka games is handled server side so as to eliminate cheating. The game 
states can only be updated by the server and clients can only emit movement keys. This 
approach reflects the philosophy that we shouldn't blindly trust packets received from 
the client.

To reduce communication overhead within the sockets, the server only broadcasts as simple 
2D integer array to represent the game state. All rendering logic is done client-side. 

### Abbreviations & Definitions

`js` - JavaScript     
`ts` - TypeScript  
`npm` - Node Package Manager  
`tsc` - TypeScript Compiler  
`.tsx` - Typescript + XML file for React

### File Structure

```$xslt
tetraka  
| react-ui/
	| node_modules/ - node dependency modules. managed by npm.  
	| public/ - files accessible on client side.  
	    | imgs/    
	    | index.html
	    | manifest.json - specifies installation metadata  
	    | robots.txt - specifies robot access preferences
	| src/ - business logic and react files.  
	    | components/ - React components/containers  
	    | css/
	    | media/
	    | test/ - testing scripts  
	    | App.jsx - root for the entire react application
	    | index.jsx - bridges App and index.html
	    | serviceWorker.js - allows for offline app access. we don't use it
	| package.json - npm config.  
	| package-lock.json - tracks precise dependency versions for reinstalls. 
	| tsconfig.json - tsc config for typescript transpiler.
| server/
	| models/ - business logic files for nodejs server. DO NOT put .js files in here.
	| index.js - server root file
| app.json - specifies Heroku config
| package.json - npm config.  
| package-lock.json - tracks precise dependency versions for reinstalls. 
| tsconfig.json - tsc config
| deploy.sh - script for deploying to production
| setup.sh - script for setting up dev environment
```

### Tetrimino Names

Per the "original" NES instruction booklet, our tetriminoes are otherwise known as:

- L block : Orange Ricky  
- J block : Blue Ricky
- Z block : Cleveland Z
- S block : Rhode Island Z
- I block : Hero
- T block : Teewee
- O block : Smashboy