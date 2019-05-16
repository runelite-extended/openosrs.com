const config = {
  siteTitle: 'RuneLitePlus',
  siteTitleShort: 'RuneLitePlus',
  siteTitleAlt: 'RuneLitePlus',
  siteLogo: '/logos/logo.png',
  siteUrl: 'https://runelitepl.us/',
  repo: 'https://github.com/taniarascia/taniarascia.com',
  pathPrefix: '',
  dateFromFormat: 'YYYY-MM-DD',
  dateFormat: 'MMMM Do, YYYY',
  siteDescription:
    'RuneLitePlus | Fork of RuneLite that provides more functionality and less restrictions while staying open source. We have lots of runelite plugins!',
  siteRss: '/rss.xml',
  googleAnalyticsID: 'UA-42068444-1',
  postDefaultCategoryID: 'Updates',
  menuLinks: [
    {
      name: 'Updates',
      link: '/blog/',
    },
    {
      name: 'Features',
      link: '/features/',
    },
  ],
  themeColor: '#3F80FF', // Used for setting manifest and progress theme colors.
  backgroundColor: '#ffffff',
}

// Make sure pathPrefix is empty if not needed
if (config.pathPrefix === '/') {
  config.pathPrefix = ''
} else {
  // Make sure pathPrefix only contains the first forward slash
  config.pathPrefix = `/${config.pathPrefix.replace(/^\/|\/$/g, '')}`
}

// Make sure siteUrl doesn't have an ending forward slash
if (config.siteUrl.substr(-1) === '/') config.siteUrl = config.siteUrl.slice(0, -1)

// Make sure siteRss has a starting forward slash
if (config.siteRss && config.siteRss[0] !== '/') config.siteRss = `/${config.siteRss}`

module.exports = config
