import React from 'react';
import {useForm} from 'react-hook-form';
import {Select} from './components';

export default function RegistrationForm(props) {
    const {register, handleSubmit, setError, formState: {errors}} = useForm();
    const vaccineregister = props.vaccineregister;
    const onSubmit = data => {
        if(isNaN(data.date.getFullYear()))
        {
            setError("date", {
                type: "date",
                message: "Invalid Date"
            })
        }
        else{
            var options = { year: 'numeric', month: 'long', day: 'numeric' };
            data.date = data.date.toLocaleString([], options);
            props.addNewPerson(data);
        }
    }

    return (
        <>
        <p>All the fields marked with * is required</p>
        <form onSubmit={handleSubmit(onSubmit)}>
            <label className="label" htmlFor="fname">First Name *</label>
            <input type="text" placeholder="Enter your First Name" {...register(
                    "fname", 
                    {
                        required: "Name is required", 
                        maxLength: {
                            value:50, 
                            message: 'Your name must have less than 50 characters'
                        },
                        minLength: {
                            value: 3,
                            message: "Your name must have atleast 3 characters"
                        },
                        pattern: {
                            value: /^[a-zA-Z]{3,50}$/,
                            message: "Your name must contain only alphabets"
                        },
                        validate: value => (/([a-zA-Z])\1\1/.test(value)===false) || "A character may not repeat for more than two times"
                    }
                )}
            />
            {errors.fname && <p>{errors.fname.message}</p>}
            <label htmlFor="phone" className="label">Phone *</label>
            <input type="text" placeholder="Enter your phone number" {...register(
                "phone",
                {
                    required: "Phone Number is required",
                    minLength: {
                        value: 10,
                        message: "Phone Number must contain 10 numbers"
                    },
                    maxLength: {
                        value: 10,
                        message: "Phone Number must contain only 10 numbers"
                    },
                    pattern: {
                        value: /^[6789]\d{10}/,
                        message: "Phone Number must contain only numbers"
                    },
                    pattern: {
                        value: /^[6789]/,
                        message: "Phone Number must start with 6 or 7 or 8 or 9"
                    },
                    validate: value => checkPhone(value, vaccineregister) || "This phone number is already registered"
                }
            )}
            />
            {errors.phone && <p>{errors.phone.message}</p>}
            <label htmlFor="gender" className="label">Gender *</label>
            <Select register={register} name="gender" options={["Male", "Female", "Other"]}/>
            <label className="label" htmlFor="aadhar">Aadhar Number</label>
            <input type="text" placeholder="Enter your Aadhar Number" {...register(
                "aadhar",
                {
                    required: "Aadhar Number is required",
                    minLength: {
                        value: 12,
                        message: "Aadhar Number must contain 12 digits"
                    },
                    maxLength: {
                        value: 12,
                        message: "Aadhar Number must not contain more than 12 digits"
                    },
                    pattern: {
                        value: /\d{12}/,
                        message: "Aadhar number must contain only numbers"
                    },
                    validate: value => (/^0/.test(value)===false) || "Aadhar Number cannot start with 0",
                    validate: value => checkAadhar(value, vaccineregister) || "This Aadhar number is already registered"
                }
            )}
            />
            {errors.aadhar && <p>{errors.aadhar.message}</p>}
            <label className="label" htmlFor="date">Date of Bith</label>
            <input type="date" {...register(
                "date",
                {
                    required: "Date of Birth is required",
                    valueAsDate: true,
                    validate: value => ageValidation(value) || "You are not eligible to vaccinate"
                }
            )}
            />
            {errors.date && <p>{errors.date.message}</p>}
            <input type="submit" value="Submit"/>
        </form>
        </>
    )
}
function ageValidation(value) {
    const now = new Date();
    if(value.getFullYear() > now.getFullYear()-18)
    return false;
    return true;
}
function checkPhone(value, register) {
    let flag = true;
    register.map((log)=>{
        if(log.phone === value){flag = false;}
    })
    return flag;
}
function checkAadhar(value, register) {
    let flag = true;
    register.map((log)=>{
        if(log.aadhar===value){flag=false}
    })
    return flag;
}