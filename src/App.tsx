import * as React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { IStoreState, IGlobalStoreState } from './reducers/types'
// import { addNumber } from './actions'
import * as actions from './actions/index';

export interface IHomePageState {
  number: number;
}

export interface IHomePageProps {
  global: IGlobalStoreState;
  addNumber: () => void;
  reduceNumber: () => void;
  setNumber: () => void;
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
    return (
      <div>
         <div>{name}{ global.amount }</div>
         <button onClick={this.props.addNumber}>add number</button>
         <button onClick={this.props.reduceNumber}>reduce number</button>
         <button onClick={this.props.setNumber}>set number</button>
         <input value={this.state.number} onChange={this.numberOnChange} />
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
    setNumber: () => dispatch(actions.setNumber())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent);
