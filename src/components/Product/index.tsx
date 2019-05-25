import * as React from 'react'

import {
  Button,
  Contract,
  Details,
  Price,
  Root,
  Title,
  Tip,
  Item
} from './elements'

export { Item, Tip } from './elements'

interface Props {
  name: string
  price: number
  zIndex: number
  button: string
  tip: string
  features: string[]

  onClick?: Function
  highlight?: boolean
}

class Product extends React.PureComponent<Props> {
  render() {
    const {
      name,
      price,
      tip,
      features,
      zIndex,
      button,
      onClick,
      highlight
    } = this.props

    return (
      <Root position={zIndex} highlight={highlight}>
        <Title>{name}</Title>
        <Price>
          {`$${price}`}
          <Contract>{`/mo`}</Contract>
        </Price>
        <Details>
          <Tip>{tip}</Tip>
          {features.map((feature, i) => <Item key={i}>{feature}</Item>)}
        </Details>
        {onClick && <Button onClick={() => onClick()}>{button}</Button>}
      </Root>
    )
  }
}

export default Product
