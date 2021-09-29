import React from "react";
//import { Component } from "react";
import {useForm} from "react-hook-form";

function RegistrationForm(){
    const { register, formState: {errors}, handleSubmit } = useForm();
    const onSubmit = (data) => {
        console.log(data);
    }
    return(
        <div className="panel panel-danger">
            <div className="panel-body">
            <p>All fields marked with * are required</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label>Name</label>
                    <div className="required">*</div>
                    <input type="text" {...register("name", {required: "Name is required", maxLength: {value: 5, message: "Name must have less than 50 characters"}})}/>
                    {errors.name && <p>{errors.name.message}</p>}
                </div>
                <div className="form-group">
                    <label>Phone Number</label>
                    <div className="required">*</div>
                    <input placeholder="Enter your phone number" type="number" {...register("phone", {required: "Phone Number is required"})}/>
                    {errors.phone && <p>{errors.phone.message}</p>}
                </div>
                <button onSubmit={handleSubmit(onSubmit)}>Submit</button>
            </form>
            </div>
        </div>
    );
}
export default RegistrationForm;