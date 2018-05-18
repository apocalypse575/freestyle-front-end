const URL = 'http://localhost:3000/api/v1'
const headers = { "Content-Type": "application/json"}

export function getContracts(){
  return (dispatch) => {
    return fetch(URL + "/contracts")
    .then(res => res.json())
    .then(contracts => {
      dispatch({type: "GET_CONTRACTS", payload: contracts})
    })
  }
}

export function getUsers(){
  return (dispatch) => {
    return fetch(URL + "/users")
    .then(res => res.json())
    .then(users => {
      dispatch({type: "GET_USERS", payload: users})
    })
  }
}

export function postContract(newContract) {
  return (dispatch) => {
    return fetch(URL + "/contracts", {
      headers: headers,
      method: "POST",
      body: JSON.stringify({
        title: newContract.title,
        summary: newContract.summary,
        details: newContract.details,
        milestones: newContract.milestones,
        legal: newContract.legal,
        copyright: newContract.copyright,
        compensation: newContract.compensation,
        developer_id: newContract.developer_id,
        contractor_id: newContract.contractor_id,
      })
    })
    .then(res => res.json())
    .then(console.log)
  }
}

export function changeContract(contract, id) {
  return (dispatch) => {
    return fetch(URL + `/contracts/${id}`, {
      headers: headers,
      method: "PATCH",
      body: JSON.stringify({
        title: contract.title,
        summary: contract.summary,
        details: contract.details,
        milestones: contract.milestones,
        legal: contract.legal,
        copyright: contract.copyright,
        compensation: contract.compensation,
        developer_id: contract.developer_id,
        contractor_id: contract.contractor_id,
      })
    })
    .then(res => res.json())
    .then(console.log)
  }
}
