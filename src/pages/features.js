import React, { Component } from 'react'
import Helmet from 'react-helmet'
import features from '../../data/features'
import Feature from '../components/Feature'
import Layout from '../layout'
import SEO from '../components/SEO'

export default class FeaturesPage extends Component {
    render() {
      const { slug } = this.props.pageContext
  
      return (
        <Layout>
          <Helmet title="RuneLite Plus - Better features than runelite!" />
          <SEO postPath={slug} featureSEO />
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
  