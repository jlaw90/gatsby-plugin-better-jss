import React from "react"
import { create } from "jss"
import { JssProvider, SheetsRegistry, ThemeProvider } from "react-jss"
import configure from './.cache/jss.js'

/**
 * Keep track of SheetRegistry for each page
 */
const sheetsRegistryManager = new Map();

// eslint-disable-next-line react/prop-types,react/display-name
export const wrapRootElement = ({ element, pathname }, { theme = {} }) => {
  const sheets = new SheetsRegistry();
  sheetsRegistryManager.set(pathname, sheets);

  const jss = configure(create());

  return (
    <JssProvider registry={sheets} jss={jss}>
      <ThemeProvider theme={theme}>{element}</ThemeProvider>
    </JssProvider>
  )
};

export const onRenderBody = ({ setHeadComponents, pathname }) => {
  const sheets = sheetsRegistryManager.get(pathname);
  if (sheets) {
    setHeadComponents([
      <style
        type="text/css"
        id="server-side-jss"
        key="server-side-jss"
        dangerouslySetInnerHTML={{ __html: sheets.toString() }}
      />,
    ]);
    sheetsRegistryManager.delete(pathname)
  }
};