import React from 'react'
import {Formik, Field, Form, ErrorMessage} from 'formik'
import * as Yup from "yup";
import { GoogleLogin } from '@react-oauth/google';

const loginSchema = Yup.object({
    userName: Yup.string()
      .required('Please enter the user name'), // Validation for username
    password: Yup.string()
      .required('Please enter the password')  // Required validation
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        'Password must contain at least 8 characters, one uppercase, one lowercase, one number, and one special character'
      ), // Regex validation
  });

export default function LoginPage() {
    

    return (
        <div>
            <div>
                <div>
                    <h3>
                        Login
                    </h3>
                </div>
        <Formik
            initialValues={{
                username:"",
                password:""
            }}
            validationSchema={loginSchema}
            onSubmit={(values)=> {
                console.log(values,"Form submitted");
            }}
        >
            {({error, touched}) => (
                    <Form>
                    <div>
                        <label>User name</label>
                        <div>
                            <Field name="username" />
                            <ErrorMessage name="username" component="span" />
                            {error || touched ? 'error params': null}
                        </div>
                    </div>
                    <div>
                        <label>
                            Password
                        </label>
                        <div>
                        <Field name="password" />
                        <ErrorMessage name="password" component="span" />
                        </div>
                        <button type="submit">Submit</button>

                    </div>
                    </Form>


            )}
        </Formik>
        <GoogleLogin onSuccess={() => Navigate('/dashboard')} onError={() => console.log('error login fail')}></GoogleLogin>
                    
                  


            </div>
        </div>
    )
}
