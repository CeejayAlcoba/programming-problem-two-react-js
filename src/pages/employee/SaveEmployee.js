import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React from 'react';
import { AddEmployee, GetAllEmployee } from '../../services/EmployeeService';
import { GetAllPosition } from '../../services/PositionService';
export class SaveEmployee extends React.Component {
    state = {
        data: {
            credential:{

            },
        },
       
        show: false
    }
    handleAddEmployee=async()=>{
        console.log(this.state.data)
        await AddEmployee(this.state.data).then(()=>{
            this.setState({...this.state,data:{ credential:{}}})
        })
    }
    handleChange = (event) => {
        this.setState({ ...this.state, data: { ...this.state.data, positionId: event.target.value } });
    }
    handleClose = () => {
        this.setState({ ...this.state, show: false })
    }
    handleData(field, value,isCredential) {
        if(isCredential)
        this.setState({ ...this.state, data: { ...this.state.data, credential:{...this.state.data.credential,[field]: value}}})
        else
        this.setState({ ...this.state, data: { ...this.state.data, [field]: value } })
        console.log(this.state.data)
    }
    handleShow = () => {
        this.setState({ ...this.state, show: true })
    }
    render() {
        return (
            <>
                <button className='btn btn-outline-success rounded-pill' onClick={() => { this.handleShow(); this.handlePosition() }}>
                    Create
                </button>
                <Modal show={this.state.show} onHide={() => this.handleClose()} backdrop="static">
                    <Modal.Header closeButton>
                        <Modal.Title >New Employee</Modal.Title>
                    </Modal.Header>
                    <div className='text-center p-4 m-5 bg-light'>
                        <div className="form-outline mb-4">
                            <input type="text" className="form-control" value={this.state.data.firstname} onChange={(e) => this.handleData("firstname", e.target.value,false)} />
                            <label className="form-label">Firstname</label>
                        </div>
                        <div className="form-outline mb-4">
                            <input type="text" className="form-control" value={this.state.data.lastname} onChange={(e) => this.handleData("lastname", e.target.value,false)} />
                            <label className="form-label">Lastname</label>
                        </div>
                        <div className="form-outline mb-4">
                            <input type="text" className="form-control" value={this.state.data.gender} onChange={(e) => this.handleData("gender", e.target.value,false)} />
                            <label className="form-label">Gender</label>
                        </div>
                        <div className="form-outline mb-4">
                            <input type="date" className="form-control" value={this.state.data.birthday} onChange={(e) => this.handleData("birthday", e.target.value,false)} />
                            <label className="form-label">Birthday</label>
                        </div>
                        <select className="form-select"onChange={(e) => this.handleChange(e)} id="colours"value={this.state.data.positionId}>
                           <option >Select an employee position</option>
                            <option value={2}>Manager</option>
                            <option value={3}>Supervisor</option>
                            <option value={4}>Staff</option>
                        </select>
                        <label className="form-label">Position</label>
                        <div className="form-outline mb-4">
                            <input type="text" className="form-control" value={this.state.data.credential.username} onChange={(e) => this.handleData("username", e.target.value,true)} />
                            <label className="form-label">Username</label>
                        </div>

                        <div className="form-outline mb-4">
                            <input type="password" className="form-control" value={this.state.data.credential.password} onChange={(e) => this.handleData("password", e.target.value,true)} />
                            <label className="form-label">Password</label>
                        </div>
                    </div>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => {this.handleClose(); this.handleAddEmployee();}}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={() => this.handleClose()}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}