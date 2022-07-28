import { Button, TextField } from '@mui/material';
import { Formik } from 'formik';
import React from 'react';
import Swal from 'sweetalert2';

const UpdateUser = ({ updateFormData ,setShowUpdateForm,refreshData}) => {
  const userSubmit = async (formdata) => {
   const response=await fetch("http://localhost:5000/user/update/"+formdata._id,{
     method: 'PUT',
     body: JSON.stringify(formdata), //covert js to json
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
        console.log("success");
        Swal.fire({
            icon: 'success',
            title: 'Updated',
            text:'User details updated'
        })
      refreshData();
      setShowUpdateForm(false);
    } else {
      console.log(response.status);
        console.log("something went wrong");
  
    }
  };
  return (
    <div> <Formik
    initialValues={updateFormData}
      onSubmit={userSubmit}
      >
          { ( { values, handleChange, handleSubmit } ) => (
              <form onSubmit={handleSubmit}>
                  <TextField className='mt-4' fullWidth label="Username" id="username" onChange={handleChange} value={values.username} /> 
                  
                  <TextField className='mt-4' fullWidth label="Email Address" id="email" onChange={handleChange} value={values.email} />  
                  
                  <TextField className='mt-4' fullWidth type="password" label="Password" id="password" onChange={handleChange} value={values.password} />    

                  <Button variant ="contained" type='submit' className='mt-5'>Submit</Button>
                  <Button onClick={e=>setShowUpdateForm(false)} variant="contained" color='error' className='mt-5'>Cancel</Button>
              </form>
          ) }
      </Formik></div>
  )
}

export default UpdateUser