import React, { Component } from 'react'
import Helmet from 'react-helmet'
import features from '../../data/features'
import Feature from '../components/Feature'
import Layout from '../layout'
import config from '../../data/SiteConfig'
import SEO from '../components/SEO'

export default class FeaturesPage extends Component {
    render() {
  
      return (
        <Layout>
          <Helmet title={`Features – ${config.siteTitle}`} />
          <SEO featureSEO />
          <div className="container2">
            <hr />
            <div class="row">
              {features.map(feature => (
                <Feature key={feature.title} {...feature} />
              ))}
            </div>
          </div>
        </Layout>
      )
    }
  }
  