/* eslint-disable no-plusplus */
/* eslint-disable no-loop-func */
/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable react/jsx-indent */

import React,  { Component } from 'react'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Layout from '../layout'
import FeatureHome from '../components/FeatureHome'
import PostListing from '../components/PostListing'
import SEO from '../components/SEO'
import config from '../../data/SiteConfig'
import features from '../../data/features'


export default class Index extends Component {

  render() {
    const { data } = this.props
    
    const latestPostEdges = data.latest.edges

    return (
      <Layout>
        <Helmet title={`${config.siteTitle} – RuneLite Plus provides more functionality than runelite!`} />
        <SEO />
        <div className="container">
          <section class="test">

            <div class="row justify-content-center">
              <div class="col-2 col-md-8 col-lg-6 text-center pb-md-2">

                <div class="lead">Fork of RuneLite that provides more functionality and less restrictions while staying open source.</div>
                <p class="mt-4"><a class="btn btn-primary" href="https://github.com/runelite-extended/launcher/releases/download/binaries/RuneLitePlusSetup.Windows.exe">Download</a></p>
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
                  <p>RuneLite Plus is jam packed full of features, check out our feature page for a full list of our features.</p>
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
            <FeatureHome key={feature.title} {...feature} />
          ))}
      </div>
          <section className="section">
            <div class="">
              <h2>Latest Updates</h2>
            </div>
            <PostListing simple postEdges={latestPostEdges} />
          </section>
        </div>
        <section class="fdb-block fdb-viewport bg-dark">
  <div class="container align-items-center justify-content-center d-flex">
    <div class="row align-items-center text-left">
      <div class="col-12 col-sm-10 col-md-8 col-lg-8">
        <h1>RuneLitePlus is free and we support open source!</h1>
        <p class="lead2">RuneLitePlus is a fork of RuneLite that provides more functionality and less restrictions while staying open source. This is meant to directly compete with 3rd party RL clients that are trying to sell their code.</p>
	<p class="mt-5">
          <a href="https://github.com/runelite-extended/runelite" class="btn btn-light">Github</a>
        </p>
	  <div class="img-container">
          <img src="https://yourkit.com/images/yklogo.png" />
        </div>	  
	<p class="lead2">YourKit supports Open Source projects with innovative and intelligent tools for monitoring and profiling java and .net applications. yourKit is the creator of <a href="https://www.yourkit.com/java/profiler/">YourKit Java Profiler</a>, <a href="https://www.yourkit.com/.NET/profiler/">YourKit .NET Profiler</a> and <a href="https://www.yourkit.com/youmonitor/">YourKit YouMonitor</a>.</p>
      </div>
    </div>
  </div>
</section>
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
            date
            template
          }
        }
      }
    }
  }
`
