# tetrisgod
Codebase for TetrisGod.com

## Collaborators  
Chris Choy (contact@chrischoy.net)  
Cole Koester ()  
Cameron Diperna ()  
Mollie Wild ()  
Michael Goldsmith ()  

# Design

TetrisGod utilizes Typescript running on Node.js to fulfill its server and backend code requirements. Angular is used to fulfill the user interface requirements. The entire application must be built following HTML5 standards without the aid of Flash (deprecated as of 2020) or other browser plugins.

### Abbreviations & Definitions

js - JavaScript     
ts - TypeScript
npm - Node Package Manager  
tsc - TypeScript Compiler

## File Structure

Run the commmand '$ npm run tsc' within the tetrisgod/tetrisgod/ directory to compile the .ts files into their Javascript forms within the build/ directory.

tetrisgod  
    build
        // contains compiled .ts -> .js files. Managed by tsc.     
    client
        // client (user) accessible files   
        img
        ts
    node_modules    
        // contains node package files. Managed by npm.
    server  
        // server files not accessible by user  
    app.ts  
        // entrypoint for out application.  
    package.json    
        // node dependencies. Managed by npm.   
    tsconfig.json   
        // config file for tsc.    


### Tetrimino Names

Per the "original" NES instruction booklet, our tetriminoes are otherwise known as:

- L block : Orange Ricky  
- J block : Blue Ricky
- Z block : Cleveland Z
- S block : Rhode Island Z
- I block : Hero
- T block : Teewee
- O block : Smashboy
