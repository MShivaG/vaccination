import React, {Component} from 'react';
import "./components/styles.css";
import RegistrationForm from './components/showRegistrationFormV1';

export default class VaccineRegistration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vaccineregister: []
        }
        this.vaccinatePerson = this.vaccinatePerson.bind(this);
        this.addNewPerson = this.addNewPerson.bind(this);
        this.removePerson = this.removePerson.bind(this);
    }
    vaccinatePerson(index) {
        const newvaccineregister =this.state.vaccineregister;
        newvaccineregister[index].time = Date();
        console.log(newvaccineregister[index]);
        this.setState({vaccineregister:newvaccineregister});
    };
    addNewPerson(data){
        const newvaccineregister = [...this.state.vaccineregister, data];
        this.setState({vaccineregister:newvaccineregister});
    };
    removePerson(index) {
        const newvaccineregister = this.state.vaccineregister;
        newvaccineregister.splice(index, 1);
        this.setState({ vaccineregister:newvaccineregister });
    };
    display() {
        return(
            this.state.vaccineregister.map((log, index)=> (
                <Register key={index} index={index} log={log} vaccinatePerson={this.vaccinatePerson} removePerson={this.removePerson}/>
            )
            )
        );
    }
    render(){
        return(
            <div className="container-fluid">
                <div className="app">
                    <h1>Vaccine Registration App</h1>
                    <RegistrationForm addNewPerson={this.addNewPerson}/>
                    <div className="log-list">
                        {this.display()}
                    </div>
                </div>
            </div>
        )
    }
}

function Register({log, index, vaccinatePerson, removePerson}) {
    return (
        <div className="register">
            {log.name} 
            {log.time? ` Vaccinated on: ${log.time}`: ""}
            Phone:{log.phone}
            <div>
                {log.time ? "" :
                <button className="btn btn-primary" onClick={()=>vaccinatePerson(index)}>
                    Vaccinate
                </button>}
                <button className="btn btn-danger" onClick={()=>removePerson(index)}>
                    x
                </button>
            </div>
        </div>
    );
}