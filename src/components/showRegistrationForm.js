import React, { Component } from 'react';

class RegistrationForm extends Component {
    constructor(props) {
        super(props);
        this.state = {  showFormFlag: false, showSubmitFlag:true  };
        this.nameRef =React.createRef();
        this.phoneRef = React.createRef();
    }
    dummy(){
    }
    handleSubmit() {
        if(this.validateString(this.nameRef.current.value) && this.validatePhone(this.phoneRef.current.value))
         {   const data = {name: this.nameRef.current.value }
            this.props.addNewPerson(data);
            this.nameRef.current.value = "";
            this.setState({showSubmitFlag: true});
    }
    }
    validateString(string) {
        if(/^[a-zA-Z]*$/.test(string) === false)
        {
            const element = document.getElementById("validate-string");
            element.innerHTML = `<div class="alert alert-danger" role="alert">
            Name must contain only alphabets!
          </div>`
          this.setState({showSubmitFlag: true});
          return false;
        }
        else{
            if(/^[ ]*$/.test(string) === true)
            {
                this.setState({showSubmitFlag: true});
            }
            else
            {
                const element = document.getElementById("validate-string");
                element.innerHTML = "";
                this.setState({showSubmitFlag: false});
                return true;
            }
        }
    }
    validatePhone(string){
        const element = document.getElementById("validate-number");
        if(/^[0-9]*$/.test(string) === false)
        {
            element.innerHTML = `<div class="alert alert-danger" role="alert">
            Phone Number must contain only numbers!
          </div>`
          this.setState({showSubmitFlag: true});
        }
        else{
            const arr = [...string];
            if(/^[8,9,7]*$/.test(arr[0]) === false)
            {
                element.innerHTML = `<div class="alert alert-danger" role="alert">
                Phone Number must start with 7 or 8 or 9!
                </div>`
                this.setState({showSubmitFlag: true});
            }
            else{                
                if(arr.length !== 10)
                {
                    element.innerHTML = `<div class="alert alert-danger" role="alert">
                    Phone Number must contain 10 numbers!
                    </div>`
                    this.setState({showSubmitFlag: true});
                }
                else
                {
                    element.innerHTML = "";
                    this.setState({showSubmitFlag: false});
                }
            }
        }
        
    }

    showForm() {
        if (this.state.showFormFlag) {
            return (
                <div className="panel panel-danger">
                    <div className="panel-body">
                        <p>All fields marked with * are required</p>
                    <form>
                    <div className="form-group" id="nameInput">
                        <label htmlFor="name">Name</label><div className="required">*</div>
                        <input required onChange={e => this.validateString(e.target.value)} ref={this.nameRef} type="text" className="form-control" id="name" placeholder="Enter your First Name"/>
                        <div id="validate-string"></div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Phone</label>
                        <div className="required">*</div>
                        <input required ref={this.phoneRef} onChange={e => this.validatePhone(e.target.value)} type="text" className="form-control" id="phone" placeholder="Enter your Phone Number"/>
                        <div id="validate-number"></div>
                    </div>
                    <button onSubmit={this.handleSubmit.bind(this)} className="btn btn-primary">Submit</button>
                    </form>                    
                    
                    </div>
                </div>
            );
        }
    }

    render() {
        return (
            <div className="center">
                <button className="btn btn-primary" 
                        onClick={()=>{this.setState({showFormFlag:!this.state.showFormFlag})}}>
                        {this.state.showFormFlag?'Hide':'Register'}
                </button>
                <div className="col-md-6 col-lg-6">
                    <hr/>
                    {this.showForm()}
                </div>
            </div>
        );
    }
}

export default RegistrationForm;