import React, { Component } from 'react'

export default class Footer extends Component {
  render() {
    return (
        <footer class="footer container" data-block-type="footers" data-id="1">
          
        <a href="https://twitter.com/runeliteplus" target="_blank" rel="noopener noreferrer">
          Twitter
        </a>
        <a href="https://github.com/runelite-extended" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        <a
          href="https://github.com/runelite-extended/runelitepl.us"
          target="_blank"
          rel="noopener noreferrer"
        >
          View source
        </a>
        <a href="http://gatsbyjs.org/"  class="footer22" target="_blank" rel="noopener noreferrer">
        Developed with GatsbyJS<img src="/img/gjs.svg"  class="footer23" alt="RuneLitePlus"></img>
        </a>
        <a href="https://runelitepl.us/"  target="_blank" rel="noopener noreferrer">
        <div class="footer24">RuneLitePlus is not affiliated with Jagex or RuneLite in any way.</div>
        </a>
      </footer>
    )
  }
}
