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
        const errorElement = document.getElementById("validate-string");
        if(/^[a-zA-Z]*$/.test(string) === false)
        {
            errorElement.innerHTML = `<div class="alert alert-danger" role="alert">
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
                errorElement.innerHTML = "";
                this.setState({showSubmitFlag: false});
                return true;
            }
        }
    }
    validatePhone(string){
        const errorElement = document.getElementById("validate-number");
        if(/^[0-9]*$/.test(string) === false)
        {
            errorElement.innerHTML = `<div class="alert alert-danger" role="alert">
            Phone Number must contain only numbers!
          </div>`
          this.setState({showSubmitFlag: true});
        }
        else{
            const arr = [...string];
            if(/^[8,9,7]*$/.test(arr[0]) === false)
            {
                errorElement.innerHTML = `<div class="alert alert-danger" role="alert">
                Phone Number must start with 7 or 8 or 9!
                </div>`
                this.setState({showSubmitFlag: true});
            }
            else{                
                if(arr.length !== 10)
                {
                    errorElement.innerHTML = `<div class="alert alert-danger" role="alert">
                    Phone Number must contain 10 numbers only!
                    </div>`
                    this.setState({showSubmitFlag: true});
                }
                else
                {
                    errorElement.innerHTML = "";
                    this.setState({showSubmitFlag: false});
                }
            }
        }
        
    }

    showForm() {
        if (this.state.showFormFlag) {
            const today = new Date();
            const max_date = `${today.getFullYear()-18}/${today.getMonth()}/${today.getDate()}`;
            const min_date = `${today.getFullYear()-100}/${today.getMonth()}/${today.getDate()}`;
            console.log(max_date);
            console.log(min_date);
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
                    <div className="form-group">
                        <label htmlFor="dateofbirth">Phone</label>
                        <div className="required">*</div>
                        <input required max={max_date} min={min_date} type="date" className="form-control" id="dateofbirth" placeholder="Enter your Phone Number"/>
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