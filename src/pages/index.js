import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'
import GitHubButton from 'react-github-btn'
import Layout from '../layout'
import PostListing from '../components/PostListing'
import SEO from '../components/SEO'
import config from '../../data/SiteConfig'
import react from '../../content/thumbnails/react.png'
import vue from '../../content/thumbnails/vue.png'
import js from '../../content/thumbnails/js.png'

export default class Index extends Component {
  render() {
    const { data } = this.props

    const latestPostEdges = data.latest.edges
    //const popularPostEdges = data.popular.edges

    return (
      <Layout>
        <Helmet title={`${config.siteTitle} – Fork of RuneLite that provides more functionality.`} />
        <SEO />
        <div className="container">
          <div className="lead">
          <div class="row justify-content-center">
          <div class="col-2 col-md-8 col-lg-6 text-center pb-md-2"><h1>RuneLitePlus</h1><p class="lead">Fork of RuneLite that provides more functionality and less restrictions while staying open source.&nbsp;</p><p class="mt-4"><a class="btn btn-primary" href="https://runelitepl.us/RuneLitePlus.jar">Download</a></p></div>
          </div>
          </div>
          </div>
        <div className="container">
          <section className="section">
            <h2>Latest Updates</h2>
            <PostListing simple postEdges={latestPostEdges} />
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
