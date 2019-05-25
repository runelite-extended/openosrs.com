/* eslint-disable react/jsx-indent */

import React,  { Component } from 'react'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'
import WidgetBot from '@widgetbot/react-embed'
import Layout from '../layout'
import Feature from '../components/Feature'
import PostListing from '../components/PostListing'
import SEO from '../components/SEO'
import config from '../../data/SiteConfig'
import features from '../../data/features'

if (typeof window === 'undefined') {
  global.window = {}
}
export default class Index extends Component {

  render() {
    const { data } = this.props

    const latestPostEdges = data.latest.edges


    return (
      <Layout>
        <Helmet title={`${config.siteTitle} – Fork of RuneLite that provides more functionality.`} />
        <SEO />
        <div className="container">
          <section class="test">

            <div class="row justify-content-center">
              <div class="col-2 col-md-8 col-lg-6 text-center pb-md-2">

                <div class="lead">Fork of RuneLite that provides more functionality and less restrictions while staying open source.</div>
                <p class="mt-4"><a class="btn btn-primary" href="https://runelitepl.us/RuneLitePlus.jar">Download</a></p>
              </div>

            </div>

          </section>
        </div>
        <div className="container">
          <div class="ez"><h2>Our Features</h2> </div>
          <section class="fdb-block fp-active" data-block-type="features" data-id="5" draggable="true">
            <div class="row text-left">
              <div class="col-12 col-md-8 m-auto col-lg-4">
                <div class="fdb-box fdb-touch">
                  <h2>Plugin Support</h2>
                  <p>Load your own plugins with our external jar plugin support. Simple and easy! Code your own or use premade plugins!</p>
                  <p><a href="https://github.com/runelite-extended/runelite/wiki/Plugin-Support">Read More</a></p>
                </div>
              </div>
              <div class="col-12 col-md-8 m-auto col-lg-4 pt-5 pt-lg-0">
                <div class="fdb-box fdb-touch">
                  <h2>Open Source</h2>
                  <p>This is meant to directly compete with 3rd party clients that are trying to sell their code</p>
                  <p><a href="https://github.com/runelite-extended/runelite">View RL+ Source</a></p>
                </div>
              </div>
              <div class="col-12 col-md-8 m-auto col-lg-4 pt-5 pt-lg-0">
                <div class="fdb-box fdb-touch">
                  <h2>Many Features</h2>
                  <p>RuneLitePlus is jam packed full of features, check out our feature page for a full list of our features.</p>
                  <p><a href="https://runelitepl.us/features/">Read Features</a></p>
                </div>
              </div>
            </div>
          </section>
          <h2>
        Plugins{' '}
        <Link to="/features" style={{ fontSize: 18 }}>See all...</Link>
          </h2>
      <div class="roww2">
        {features
          .filter(feature => feature.home)
          .map(feature => (
            <Feature key={feature.title} {...feature} />
          ))}
      </div>
          <section className="section">
            <div class="">
              <h2>Latest Updates</h2>
            </div>
            <PostListing simple postEdges={latestPostEdges} />
          </section>
          <section className="section">
            <div class="">
              <h1>Discord</h1>
            </div>
        
             

            <WidgetBot
              server="373382904769675265"
              channel="568435580980035594"
              shard="https://disweb.deploys.io"
              width="990"
              height="500"
            />
            
          </section>
        </div>
      </Layout>
    )
  }
}


export const pageQuery = graphql`
  query IndexQuery {
    latest: allMarkdownRemark(
      limit: 6
      sort: { fields: [fields___date], order: DESC }
      filter: { frontmatter: { template: { eq: "post" } } }
    ) {
      edges {
        node {
          fields {
            slug
            date
          }
          excerpt
          timeToRead
          frontmatter {
            title
            tags
            categories
            thumbnail {
              childImageSharp {
                fixed(width: 150, height: 150) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
            date
            template
          }
        }
      }
    }
    popular: allMarkdownRemark(
      limit: 6
      sort: { fields: [fields___date], order: DESC }
      filter: { frontmatter: { categories: { eq: "Popular" } } }
    ) {
      edges {
        node {
          fields {
            slug
            date
          }
          excerpt
          timeToRead
          frontmatter {
            title
            tags
            categories
            thumbnail {
              childImageSharp {
                fixed(width: 150, height: 150) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
            date
            template
          }
        }
      }
    }
  }
`