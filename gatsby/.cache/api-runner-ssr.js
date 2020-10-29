var plugins = [{
      plugin: require('/Users/rickymed/Desktop/Projects/Pizzeria/gatsby/node_modules/gatsby-plugin-styled-components/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('/Users/rickymed/Desktop/Projects/Pizzeria/gatsby/node_modules/gatsby-plugin-react-helmet/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('/Users/rickymed/Desktop/Projects/Pizzeria/gatsby/node_modules/gatsby-source-sanity/gatsby-ssr'),
      options: {"plugins":[],"projectId":"v93oiic7","dataset":"production","watchMode":true,"token":"skXV2CaNPGPXo12fz6alhr8bIfE31DaFBSkvpe1sHec536U5abSHn5VZpATzFwapIuPfZAH4cgRtag5v01xAbUj3qwTA4tUIIx5Sw0kWMaaFWLOBJGJ8gnXOyjhvTsnPxXwxPXuhaNqOAV8v1McDphZIU08LyYiZxi6v1IMQxBkcKNBStjZ7"},
    },{
      plugin: require('/Users/rickymed/Desktop/Projects/Pizzeria/gatsby/gatsby-ssr'),
      options: {"plugins":[]},
    }]
// During bootstrap, we write requires at top of this file which looks like:
// var plugins = [
//   {
//     plugin: require("/path/to/plugin1/gatsby-ssr.js"),
//     options: { ... },
//   },
//   {
//     plugin: require("/path/to/plugin2/gatsby-ssr.js"),
//     options: { ... },
//   },
// ]

const apis = require(`./api-ssr-docs`)

// Run the specified API in any plugins that have implemented it
module.exports = (api, args, defaultReturn, argTransform) => {
  if (!apis[api]) {
    console.log(`This API doesn't exist`, api)
  }

  // Run each plugin in series.
  // eslint-disable-next-line no-undef
  let results = plugins.map(plugin => {
    if (!plugin.plugin[api]) {
      return undefined
    }
    const result = plugin.plugin[api](args, plugin.options)
    if (result && argTransform) {
      args = argTransform({ args, result })
    }
    return result
  })

  // Filter out undefined results.
  results = results.filter(result => typeof result !== `undefined`)

  if (results.length > 0) {
    return results
  } else {
    return [defaultReturn]
  }
}
