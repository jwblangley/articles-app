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

3. To help a user take in the articles, I decided to add a way to filter the articles. This can be done easily as the data contains a "section" field. To keep the app from being too strongly coupled to the data, the filters for the section are generated by the data itself and articles are then filtered based on the selection as part of the functional manipulation of the data to `Article`s.

4. Thinking about how a user might want to further explore the data, I concluded that multiple filters should be able to be active at once. Therefore I chose to extend the `Selector` class to include this functionality.
  1. After doing this, I realised that a quick way to enable/disable all filters would be easy and followed to implement this.

5. For a user to further explore the data, I felt it would useful to be able to sort the data. I therefore created another instance of the already defined `Selector` class to do this.
