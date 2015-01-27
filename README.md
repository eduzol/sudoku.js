# sudoku.js
For a running demo please visit [here](https://dl.dropboxusercontent.com/u/46968747/app.html).
Feel free to visit my [linkedin profile](https://www.linkedin.com/in/eduardozola) 

# Technology stack
The following technologies were used for this application:
* Grunt. Task manager for configuring development workflows in javascript
* JSLint . Utility tool for validating javascript code quality and best practices
* QUnit. Develop Javascript Tests
* Sass. Modular CSS
* Mustache. Template engine
* JQuery. DOM manipulation  
Additionally the application uses [module pattern](http://addyosmani.com/resources/essentialjsdesignpatterns/book/#modulepatternjavascript) extensively to encourage separation of concerns and modularity.

# API
The API contains the following methods:


        SUDOKU.init ({
            successfulMove : onSuccessCallback ,
            failureMove : onFailureCallback , 
            completed : onCompletionCallback, 
        });
  
        SUDOKU.setMove( section , row  , column, value );


# Project Structure
* The project contains sudoku.js which encapsulates the business logic and can be reused as a library.
* sudoku-view.js access the DOM and consumes sudoku.js API.* 


# Running for the first time
install node , then go to root folder
* npm install -g grunt-cli
* npm install grunt --save-dev
* npm install grunt-contrib-uglify
* npm install grunt-contrib-qunit --save-dev
* npm install grunt-contrib-sass --save-dev
* npm install grunt-contrib-jshint --save-dev
* grunt


