import React, { Component } from 'react'
import Helmet from 'react-helmet'
import ThemeContext from '../context/ThemeContext'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import config from '../../data/SiteConfig'
import favicon from '../images/favicon.png'
import '../styles/main.scss'
import '../styles/card.scss'
import '../styles/flexboxgrid.min.css'
import '../styles/froala_style.min.css'
import '../styles/froala_blocks.min.css'




export default class MainLayout extends Component {
  static contextType = ThemeContext

  render() {
    const { notFound } = this.context
    const { children } = this.props
    let themeClass = ''

    if (notFound) {
      themeClass = 'not-found'
    }

    return (
      <>

        <Helmet
          bodyAttributes={{
            class: `theme ${themeClass}`,
          }}
        >

          <meta name="description" content={config.siteDescription} />
          <meta name="keywords" content={config.metaKeywords} />
          <link rel="shortcut icon" type="image/png" href={favicon} />
          <link rel="preconnect" href="https://www.google-analytics.com" />
          
        </Helmet>
        <Navigation menuLinks={config.menuLinks} />
        <main id="main-content">{children}</main>
        <Footer />
      </>
    )
  }
}
