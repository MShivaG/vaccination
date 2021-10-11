import React, {Component} from 'react';
import "./components/stylesV1.css";
import RegistrationForm from './components/showRegistrationFormV2';

class VaccineRegistration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vaccineregister: [],
            showForm: true,
            count: 0
        }
        this.addNewPerson = this.addNewPerson.bind(this);
        this.removePerson = this.removePerson.bind(this);
    }
    addNewPerson(data){
        if(window.confirm("Do you want to continue?")){
        const newvaccineregister = [...this.state.vaccineregister, data];
        this.setState({vaccineregister:newvaccineregister, showForm:false});}
    };
    removePerson(index) {
        const newvaccineregister = this.state.vaccineregister;
        newvaccineregister.splice(index, 1);
        this.setState({ vaccineregister:newvaccineregister });
    };
    display() {
        return(
            <>
            <button type="button" onClick={()=>this.setState({showForm:true})}>Register</button> 
                <table id="register">
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Gender</th>
                        <th>Aadhar Number</th>
                        <th>DOB</th>
                        <th>Action</th>
                        </tr>
                    </thead>
                    {this.state.vaccineregister.map((log, index)=> (
                        <Register key={index} index={index} log={log} vaccinatePerson={this.vaccinatePerson} removePerson={this.removePerson}/>
                    )
                    )}
                </table>
            </>
        );
    }
    render(){
        return(
            <div className="container-fluid">
                <div className="app">
                    <h1 style={{textAlign: 'center', fontWeight: 'bolder'}}>Vaccine Registration App</h1><hr/>
                    {this.state.showForm ? <RegistrationForm vaccineregister={this.state.vaccineregister} addNewPerson={this.addNewPerson}/> : ''}
                    <div className="log-list">
                        {this.state.showForm ? '' : this.display()}
                    </div>
                </div>
            </div>
        )
    }
}

function Register({log, index, removePerson}) {
    return (
        <tbody>
            <tr>
            <td>{index+1}</td>
            <td>{log.fname}</td>
            <td>{log.phone}</td>
            <td>{log.gender}</td>
            <td>{log.aadhar}</td>
            <td>{log.date}</td>
            <td><button onClick={removePerson} type="button">Remove</button></td>
            </tr>
        </tbody>
    );
}
export default VaccineRegistration;