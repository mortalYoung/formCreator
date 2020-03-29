/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  siteMetadata: {
    preCoder: `import React from 'react';preImport;export default ({ props }) => {return (<>preCoder</>)}`,
    codeFlag: 'preCoder',
    importFlag: 'preImport'
  },
  plugins: [
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: 'src/utils/typography'
      }
    },
    {
      resolve: `gatsby-plugin-import`,
      options: {
        libraryName: "antd",
        style: 'css',
      }
    },
    'gatsby-plugin-typescript',
    'gatsby-plugin-antd',
    'gatsby-plugin-sass'
  ]
}
