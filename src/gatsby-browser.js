const React = require(`react`);
const { create } = require('jss');
const { JssProvider, SheetsRegistry, ThemeProvider } = require(`react-jss`);
const configure = require('./.cache/jss.js');

const jss = configure(create());
const sheets = new SheetsRegistry();

// remove the JSS style tag generated on the server to avoid conflicts with the one added on the client
exports.onInitialClientRender = () => {
  const ssStyles = window.document.getElementById(`server-side-jss`);
  ssStyles && ssStyles.parentNode.removeChild(ssStyles)
};

// eslint-disable-next-line react/prop-types
exports.wrapRootElement = ({ element }, { theme={} }) => {
  return <JssProvider jss={jss} registry={sheets}>
    <ThemeProvider theme={theme}>{element}</ThemeProvider>
  </JssProvider>;
};
