# Articles App

## How to run
To start up the application, run
```shell
npm install
npm start
```
from the project directory. N.B this runs in development mode. `node` and `npm` is required for this project.

Open [http://localhost:3000](http://localhost:3000) to view it in the browser if it is not automatically opened.

## Decision and design process
#### For more information on the design process I undertook, please refer to the commit messages of this repository. Available at https://github.com/jwblangley/articles-app.
1. Following a talk from Robbie McCorkel annd Pedro Martin from Red Badger that I attended, I decided to write this application in React.

   I therefore began from the template,  [Create React App](https://github.com/facebook/create-react-app).

2. To show a list of articles, I chose to treat the process as a manipulation of data: in this case mapping the data to instances of an `Article` class that I wrote.
