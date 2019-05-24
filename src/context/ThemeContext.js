import React, { Component } from 'react'

const defaultState = {
  notFound: false,
}

const ThemeContext = React.createContext(defaultState)

class ThemeProvider extends Component {
  state = {
    notFound: false,
  }

  setNotFound = () => {
    this.setState({ notFound: true })
  }

  setFound = () => {
    this.setState({ notFound: false })
  }

  render() {
    const { children } = this.props
    const { notFound } = this.state

    return (
      <ThemeContext.Provider
        value={{
          notFound,
          setFound: this.setFound,
          setNotFound: this.setNotFound,
        }}
      >
        {children}
      </ThemeContext.Provider>
    )
  }
}

export default ThemeContext

export { ThemeProvider }
