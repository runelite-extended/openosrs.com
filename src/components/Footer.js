import React, { Component } from 'react'

export default class Footer extends Component {
  render() {
    return (
      <footer class="footer container" data-block-type="footers" data-id="1">

        <a href="https://twitter.com/runeliteplus" target="_blank" rel="noopener noreferrer">
          Twitter -
        </a>
        <a href="http://gatsbyjs.org/" target="_blank" rel="noopener noreferrer">
          Developed with GatsbyJS -
        </a>
        <a href="https://www.netlify.com" target="_blank" rel="noopener noreferrer">
          Hosted by Netlify
        </a>
        <a href="https://runelitepl.us/" target="_blank" rel="noopener noreferrer">
          <div class="footermarright">RuneLite Plus is not affiliated with jagex or runelite in any way.</div>
        </a>
      </footer>
    )
  }
}
