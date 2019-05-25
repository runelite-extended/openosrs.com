import styled from 'react-emotion'

interface Props {
  position: number
  highlight: boolean
}

export const Root = styled<Props, 'div'>('div')`
  display: flex;
  flex-direction: column;
  height: 500px;
  max-height: 100%;
  width: 250px;
  background: white;
  margin: 0 auto;
  border-radius: 4px;
  z-index: ${({ position }) => position};

  background-color: rgba(
    161,
    177,
    232,
    ${({ position }) => 0.5 + position * 0.07}
  );
  box-shadow: rgba(114, 137, 218, ${({ position }) => 0.2 + position * 0.1}) 0px
    0px 70px
    ${({ highlight }) => (highlight ? ', #687DC5 0px 0px 0px 4px' : '')};
`

export const Title = styled('h1')`
  font-weight: 400;
  font-size: 1.3rem;
  text-align: center;
  padding: 10px 0;
  margin: 0;
  text-transform: uppercase;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.1);
  text-shadow: rgba(255, 255, 255, 0.7) 0px 0px 50px;
`

export const Price = styled('h2')`
  font-weight: 400;
  font-size: 3.3rem;
  text-align: center;
  padding: 10px 0;
  margin: 0;
`

export const Contract = styled('span')`
  font-size: 1.2rem;
  opacity: 0.3;
`

export const Details = styled('ul')`
  margin: 0;
  flex-grow: 1;
  padding: 20px;
  list-style: none;
  overflow: auto;

  & > li:last-child {
    border-bottom: none;
  }

  ::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.3);
    border: 4px solid #8793bf;
  }
`

export const Item = styled('li')`
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding: 7px 0;
  font-size: 0.9rem;

  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg fill='%23b1ffd7' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3e%3cpath d='M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10 10 10 0 0 0 10-9h-2a8 8 0 0 1-8 7 8 8 0 0 1-8-8 8 8 0 0 1 12-7l1.4-1.5A11 11 0 0 0 12 2zm8.5 2.9l-9.3 8.9L7.5 10l-1.4 1.4 5 5 .8-.6 10-9.6z'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right;
  background-size: 17px;
  padding-right: 20px;
`

export const Tip = styled('span')`
  opacity: 0.5;
  font-weight: 200;
  font-size: 0.8rem;
  text-transform: uppercase;
  margin-bottom: 7px;
  display: inline-block;
`

export const Button = styled('button')`
  cursor: pointer;
  margin: 19px 25px;
  height: 45px;
  display: block;
  border-radius: 5px;
  border: 2px solid #fff;
  background: none;
  flex-shrink: 0;
  font-size: 1.07rem;
  outline: none;
`
