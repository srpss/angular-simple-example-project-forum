# angular-project-exam
 simple exam project
 It should include all dependancies. It was uploaded in Git with node_module. (but if something is missing should be installed)
 cd client > npm i > ng serve
 cd server > npm i > npm start
    
    Also you need to have MongoDB installed (very default settings). You would need internet access to use images.
## Architecture 
- Client - Angular
- Server - Express, taken online, had it's own very basic api authentication

## Client Architecture
- angular app
- everything related to the app is in "ang-client/src"
- consists of components, css, ts files, guards, error handler (but i think it can be only observed from Login and Register (if you send wrong auth credentials))

## Server Architecture
- it is api server, only returns JSON
- it is very basic, not for production use.

## What does react app do

- Overall, you can create threads and post comments. With images (images should be required as a whole)
- Authetnication - signin and signup
- Guests can view threads/search. They cannot see profile or create threads/comments
- forms have simple validation, some fields are required and need specific charater amount
- errors are throwned in the console or appear at bottom right corner (part of the error handler)
- you can search threads
- you can view your profile if you are authenticated
