import * as React from 'react'
import {Component} from 'react'
import {render} from 'react-dom'

import image from './bonobo.png'
import './index.css'

type CardProps = {
  title: string;
  paragraph?: string;
}
type CardState = {
  open: boolean;
  paragraph?: string;
}

class Card extends Component<CardProps, CardState> {
  constructor(props: CardProps){
    super(props)
    this.state = {
      open: false,
      paragraph: props.paragraph
    }
  }

  toggle = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    this.setState({
      ...this.state,
      open: !this.state.open
    })
  }

  add = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, msg: string)=> {
    e.preventDefault();
    e.stopPropagation();
    console.log(e);

    this.setState({
      ...this.state,
      paragraph: this.state.paragraph ? this.state.paragraph + msg : msg
    })
  }

  render(){
    const {title, children} = this.props;
    return (
      <aside className="card col-md-3">
        <div className="card-header" onClick={e => this.toggle(e)}>
          <h2>{ title }</h2>
        </div>
        { this.state.open ? (
          <div className="card-body" onClick={e => this.add(e, "adding more stuff...")}>
          <p> { this.state.paragraph ? this.state.paragraph : "Nothing has been written about " + title + "..." } </p>
          { children }
        </div>
        ): <></>}
      </aside>
    )
  }
}

class App extends Component {
  render(){
    return (
      <div className="app">
        <h1>Hello world!</h1>
        <Card title="Bonobos" paragraph="Bonobos are some of the most important and curious creature on the Galapagos!" >
          <Card title="Notes" paragraph="Conservation efforts are underway, improving the life and well-being of bonobos around the world!">
            <div>
              <img src={image} width="100"></img>
            </div>
          </Card>
        </Card>
        <Card title="Giraffes"/>
        <Card title="Bonobos" paragraph="Bonobos are some of the most important and curious creature on the Galapagos!" >
          <Card title="Notes" paragraph="Conservation efforts are underway, improving the life and well-being of bonobos around the world!">
            <div>
              <img src={image} width="100"></img>
            </div>
          </Card>
        </Card>
        <Card title="Giraffes"/>
      </div>
    )
  }
}

render(<App/>, document.getElementById('root'));