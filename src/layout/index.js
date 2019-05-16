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



export default class MainLayout extends Component {
  static contextType = ThemeContext

  render() {
    const { dark, notFound } = this.context
    const { children } = this.props
    let themeClass = ''
    
    if (dark && !notFound) {
      themeClass = 'dark'
    } else if (notFound) {
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
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i"/>
        </Helmet>
        <Navigation menuLinks={config.menuLinks} />
        <main id="main-content">{children}</main>
        <Footer />
      </>
    )
  }
}
