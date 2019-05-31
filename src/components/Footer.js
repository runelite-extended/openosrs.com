import React, { Component } from 'react'

export default class Footer extends Component {
  render() {
    return (
      <footer class="footer container" data-block-type="footers" data-id="1">

        <a href="https://twitter.com/runeliteplus"  class="footermar" target="_blank" rel="noopener noreferrer">
          Twitter<img src="/img/twitter.png" class="footericon" alt="RuneLitePlus"></img>
        </a>
        <a href="http://gatsbyjs.org/" class="footermar" target="_blank" rel="noopener noreferrer">
          Developed with GatsbyJS<img src="/img/gjs.svg" class="footericon" alt="RuneLitePlus"></img>
        </a>
        <a href="https://www.netlify.com" class="footermar" target="_blank" rel="noopener noreferrer">
          Hosted by Netlify<img src="/img/net32.png" class="footericon" alt="netlify"></img>
        </a>
        <a href="https://runelitepl.us/"  target="_blank" rel="noopener noreferrer">
          RuneLite Plus is not affiliated with jagex or runelite in any way.
        </a>
      </footer>
    )
  }
}
