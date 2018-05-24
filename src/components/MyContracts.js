import React from 'react'
import '../styles/myContracts.css'
import { Grid } from 'semantic-ui-react'
import { getContracts, getUser } from '../actions/actions'
import { connect } from 'react-redux'
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Contract from './Contract'
import NewContractForm from './NewContractForm'

class MyContracts extends React.Component{

  state = {
    currentContract: '',
  }

  componentDidMount(){
    if (!this.props.currentUser){
      this.props.history.push('/login')
    } else {
        this.props.getContracts()
        this.props.getUser()
      }
  }

  setCurrentContract = (contract) => {
    this.setState({
      currentContract: contract
    })
  }

  render(){

    // const allContracts = this.props.myContracts.map((contract, index) => {
    //   return <Contract contract={contract} index={index} key={index} setCurrentContract={this.setCurrentContract}/>
    // })

    const developerContracts = this.props.currentUser.developer_contracts ? this.props.currentUser.developer_contracts.map((contract, index) => {
      return <Contract contract={contract} index={index} key={index} setCurrentContract={this.setCurrentContract}/>
    }) : null

    const contractorContracts = this.props.currentUser.contractor_contracts ? this.props.currentUser.contractor_contracts.map((contract, index) => {
      return <Contract contract={contract} index={index} key={index} setCurrentContract={this.setCurrentContract}/>
    }) : null

    // console.log('line 40:', this.props.currentUser);
    // console.log('line 40:', this.props.currentUser.contractor_contracts);

    return(
    <div className='myContracts-container'>
      <div className='myContracts'>
        {this.state.currentContract === '' && this.props.currentUser ?
        <div>
          <Grid divided='vertically' id='myContracts-grid'>
            <h1 id='contracts-title'>Developer Contracts</h1>
            <Grid.Row columns={3}> {developerContracts} </Grid.Row>
          </Grid>
          <Grid divided='vertically'>
            <h1 id='contracts-title'>Contractor Contracts</h1>
            <Grid.Row columns={3}> {contractorContracts} </Grid.Row>
          </Grid>
        </div>
          : <Router>
              <Route path='/:id' render={(routerProps) => {
                console.log();
                return <NewContractForm {...routerProps} contract={this.state.currentContract} index={this.state.currentContract.id} key={this.state.currentContract.id}/>}} />
            </Router>}
      </div>
    </div>
    )
  }
}

function mapStateToProps(state){
  // console.log('line 56: state', state)
  return {
    myContracts: state.contracts,
    currentUser: state.currentUser,
  }
}

export default connect(mapStateToProps, {getContracts, getUser})(MyContracts)
