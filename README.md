# tetrisgod
Codebase for TetrisGod.com

## Collaborators  
Chris Choy (contact@chrischoy.net)  
Cole Koester (cole.koester@tufts.edu)  
Cameron Diperna ()  
Mollie Wild ()  

# Running the Code

`npm install package-name --save` - install new modules. writes to package & package-lock.json.  
`npm ci` - install module dependencies determined by package & package-lock.json  
`npm start` - compiles and runs app on localhost  
`npm run test` - runs unit and integration tests  
`npm run build` - builds the optimized application artifact for production deployment.  

# Design

TetrisGod utilizes Typescript running on Node.js to fulfill its server and backend code 
requirements. ReactJS is used to fulfill the user interface requirements. The entire 
application must be built following HTML5 standards without the aid of Flash (deprecated 
as of 2020) or other browser plugins.

Under the hood, TetrisGod is a single page browser application. That is, all content is 
accessed and updated on the index.html page. We simulate a multi-page application by 
changing the location state in the main App component and rendering different components 
onto the page accordingly.

### Abbreviations & Definitions

`js` - JavaScript     
`ts` - TypeScript  
`npm` - Node Package Manager  
`tsc` - TypeScript Compiler  
`.tsx` - Typescript + XML file for React

### File Structure

```$xslt
tetrisgod  
| node_modules/ - node dependency modules. managed by npm.  
| public/ - files accessible on client side.  
	| imgs/    
	| index.html
	| manifest.json - specifies installation metadata  
	| robots.txt - specifies robot access preferences
| src/ - business logic and react files.  
	| components/ - React components/containers  
	| css/
	| imgs/
	| models/ - business logic files
	| test/ - testing scripts  
| package.json - npm config.  
| package-lock.json - tracks precise dependency versions for reinstalls. 
| tsconfig.json - tsc config for typescript transpiler.
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