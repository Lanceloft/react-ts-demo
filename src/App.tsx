import * as React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch, NavLink } from 'react-router-dom';
import { IStoreState, IGlobalStoreState } from './reducers/types'
import * as actions from './actions/index';
import Test from './pages/Test/Index';
import New from './pages/New/Index'

export interface IHomePageState {
  number: number;
}

export interface IHomePageProps {
  global: IGlobalStoreState;
  addNumber: () => void;
  reduceNumber: () => void;
  setNumber: (number: Number) => void;
}

class HomeComponent extends React.Component<IHomePageProps, IHomePageState> {
  constructor(props: IHomePageProps) {
    super(props);
    this.state = {
      number: 0,
    };
  }

  public numberOnChange = (e:any) => {
    this.setState({
      number: e.target.value
    })
  }

  public render(){
    const { global } = this.props;
    const { number } = this.state;
    return (
      <div>
         <div>{name}{ global.amount }</div>
         <button onClick={this.props.addNumber}>add number</button>
         <button onClick={this.props.reduceNumber}>reduce number</button>
         <button onClick={() => this.props.setNumber(number)}>set number</button>
         <input value={this.state.number} onChange={this.numberOnChange} />
         <Router>
           <NavLink exact to="/">TO TEST</NavLink>
           <NavLink exact to="/new">TO NEW</NavLink>
           <Switch>
             <Route path="/" exact component={ Test } />
             <Route path="/new" exact component={ New } />
           </Switch>
         </Router>
      </div>
    )
  }
}


const mapStateToProps = (state: IStoreState) => {
  const { global } = state;
  return {
    global,
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    addNumber: () => dispatch(actions.addNumber()),
    reduceNumber: () => dispatch(actions.reduceNumber()),
    setNumber: (number: Number) => dispatch(actions.setNumber(number))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent);
