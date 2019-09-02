# tetrisgod
Codebase for TetrisGod.com

## Collaborators  
Chris Choy (contact@chrischoy.net)  
Cole Koester (cole.koester@tufts.edu)  
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

    src
        // contains uncompiled .ts files    
        client
            // client (user) accessible files   
            img     
            ts  
        server      
            // server files not accessible by user  
        ServerMain.ts.ts  
            // entrypoint for out application.   
        Modules.ts
            // wrapper for accessing all modules

    .env
        // Environment variables for heroku server     
    exec  
        // contains shortcuts for shell scripts
    node_modules    
        // contains node package files. Managed by npm.
    Procfile    
        // heroku deployment scripts
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
