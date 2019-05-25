import React, { Component } from 'react'
import Helmet from 'react-helmet'
import urljoin from 'url-join'
import config from '../../data/SiteConfig'

export default class SEO extends Component {
  render() {
    const { postNode, postPath, postSEO } = this.props
    let title
    let description
    let image = ''
    let postURL

    if (postSEO) {
      const postMeta = postNode.frontmatter
      title = postMeta.title
      description = postMeta.description ? postMeta.description : postNode.excerpt
      if (postMeta.thumbnail) {
        image = postMeta.thumbnail.childImageSharp.fixed.src
      }
      postURL = urljoin(config.siteUrl, config.pathPrefix, postPath)
    } else {
      title = config.siteTitle
      description = config.siteDescription
      image = config.siteLogo
    }

    image = urljoin(config.siteUrl, image)
    const blogURL = urljoin(config.siteUrl, config.pathPrefix)
    const schemaOrgJSONLD = [
      {
        '@context': 'http://schema.org',
        '@type': 'WebSite',
        url: blogURL,
        name: title,
        alternateName: config.siteTitleAlt ? config.siteTitleAlt : '',
      },
    ]

    if (postSEO) {
      schemaOrgJSONLD.push(
        {
          '@context': 'http://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              item: {
                '@id': postURL,
                name: title,
                image,
              },
            },
          ],
        },
        {
          '@context': 'http://schema.org',
          '@type': 'BlogPosting',
          url: blogURL,
          name: title,
          alternateName: config.siteTitleAlt ? config.siteTitleAlt : '',
          headline: title,
          image: {
            '@type': 'ImageObject',
            url: image,
          },
          description,
        }
      )
    }
    return (
      <Helmet>
        <meta name="description" content={description} />
        {postSEO ? <meta property="image" content="" /> : <meta property="image" content={image} />}
        {postSEO ? <meta property="og:image" content="" /> : null}

        <script type="application/ld+json">{JSON.stringify(schemaOrgJSONLD)}</script>

        <meta property="og:url" content={postSEO ? postURL : blogURL} />
        {postSEO ? <meta property="og:type" content="article" /> : null}
        
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        {postSEO ? <meta property="og:image" content="" /> : <meta property="og:image" content={image} />}

  
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content={config.userTwitter} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        {postSEO ? <meta property="twitter:image" content="" /> : <meta property="twitter:image" content={image} />}
      </Helmet>
    )
  }
}
