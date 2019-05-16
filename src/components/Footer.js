import React, { Component } from 'react'

export default class Footer extends Component {
  render() {
    return (
      <footer className="footer container">
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
      </footer>
    )
  }
}
