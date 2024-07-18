# [afterlifepro.neocities.org](https://afterlifepro.neocities.org)
## [Licensed under GPL 3.0](COPYING)

***This project is coded in React and SCSS***, which means you can't directly insert majority of this code into an existing HTML, CSS, or JS file.  
As SCSS is a CSS preprocessor you can convert it into plain css easily, either via running `npm run sass` after downloading the project, downloading the file and running sass yourself, or by using an online converter.

Unfortunately, React isn't simply a JS/HTML preprocessor and as such cant be compiled in such a simple manner. Some areas of the code can be used in an HTML file or JS file separately, although you have to be careful.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## React Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

#### Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Other Scripts

#### `npm run sass`
Compile the .scss file to a .css file. This allows you to freely copy paste any code into an existing project.  
Note that comments aren't copied into the compiled .css file.

#### `npm run serve`
After building the project, run this command to see the build running locally (via the serve package)