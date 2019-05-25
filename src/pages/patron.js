import * as React from 'react'

import Product, { Item, Tip } from '../components/Product'
import { Root } from '../../styles'
import { navigateTo } from 'gatsby-link'

export const products = [
  {
    name: 'Free',
    id: 'free',
    processor: 'tutorial',
    button: 'Get started',
    price: 0,
    zIndex: 1,
    tip: 'Use all of WidgetBot\'s core features for free!',
    features: [
      'Read and send messages (optional)',
      'Multiple channels (optional)',
      'Unlimited widgets',
      'Easy to set up',
      'Fast support',
      'You\'re awesome'
    ]
  },
  {
    name: 'Patron',
    id: 'supporter',
    processor: 'patron',
    button: 'Subscribe',
    price: 2.50,
    zIndex: 3,
    tip: 'Set custom colors!',
    features: [
      'All Free features!',
      'Set custom colors in your widget to make it match your site! (optional)',
      'Patron role in Discord',
      'You\'re more awesome'
    ]
  },
  {
    name: 'Ultimate Patron',
    id: 'pro',
    processor: 'ultimate',
    button: 'Subscribe',
    highlight: true,
    price: 5,
    zIndex: 4,
    tip: 'Complete customization',
    features: [
      'All Free and Patron features',
      'Set custom CSS in your widget to customize it even more! (optional)',
      'Remove WidgetBot Branding (optional)',
      'Ultimate Patron role in Discord',
      'You\'re even more awesome'
    ]
  }/*,
  {
    name: 'Self-hosted',
    id: 'self-hosted',
    processor: 'stripe',
    button: 'Subscribe',
    price: 40,
    zIndex: 2,
    tip: 'Fast, packaged Node server',
    features: [
      'Unlimited requests',
      'Unlimited concurrent users',
      'Priority support',
      'Weekly server updates',
      'Link to your site on our homepage'
    ]
  }*/
]

const Patron = () => (
  <Root
    style={{
      maxWidth: 1140,
      margin: '0 auto'
    }}
  >
    {products.map(product => (
      <Product
        {...product}
        key={product.id}
        onClick={() =>
          product.processor === 'patron'
            ? window.open('https://www.patreon.com/join/widgetbot/checkout?rid=2875090')
            : product.processor === 'ultimate'
              ? window.open('https://www.patreon.com/join/widgetbot/checkout?rid=1826876')
              : window.location.href = 'https://docs.widgetbot.io/tutorial'
        }
      />
    ))}
  </Root>
)

export default Patron
