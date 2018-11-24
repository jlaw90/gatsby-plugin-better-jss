## Better JSS Plugin

#### Why?
The JSS plugin provided by gatsby doesn't support any configuration and hot module reloading is broken.  This plugin aims to fix both of these issues until changes can be merged upstream.

#### Usage
Install with npm:

```bash
npm install gatsby-plugin-better-jss
```

Add to the plugin option in your gatsby config (```gatsby-config.js``` - create it if it doesn't exist):

```javascript
module.exports = {
  plugins: ['gatsby-plugin-better-jss'],
};
```

And that's it!

####Advanced Usage

By default we use ```react-jss-preset-default```, but you can completely customise the JSS module setup.

To do so, we need to create a configuration module file somehwere in the project which exports a function that takes JSS as a parameter and returns the JSS instance we want to use.

Here's an example using ```src/utils/jss.js``` as the configuration module path.


```javascript
// src/utils/jss.js
const preset = require('jss-preset-default').default;

module.exports = function(jss) {
  return jss.setup(preset());
}
```

With this file created, all we need to do is modify the gatsby configuration file:

```javascript
module.exports = {
  plugins: [{
    resolve: 'gatsby-plugin-better-jss',
    options: {
      pathToConfigModule: 'src/utils/jss.js'
    }
  }],
};
```

### Troubleshooting
If you have any issues, raise an issue in the bug tracker!  Alternatively, feel free to fix and create a PR ;)