import React from 'react'
import { Form, Formik, Field, ErrorMessage } from 'formik'
import { useMutation, gql } from '@apollo/client';
import * as Yup from 'yup'

const regFormSchema = Yup.object({
    name: Yup.string().required('name required'),

    email: Yup.string()
        .required('Email is required') // Error when field is blank
        .email('Please enter a valid email address'), // Error when an invalid email is entered
    phone: Yup.string()
        .required('Phone number is required') // Error when field is blank
        .matches(/^\d{10}$/, 'Please enter a valid 10-digit phone number'), // Error when phone number is not valid
    password: Yup.string()
        .required('Please enter the password')  // Required validation
        .matches(
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            'Password must contain at least 8 characters, one uppercase, one lowercase, one number, and one special character'
        ), // Regex validation
})

const ADD_USER = gql`
mutation AddUser($name: String!, $email: String!) {
  addUser(name: $name, email: $email) {
    id
    name
    email
  }
}
`;

export default function RegisterPage() {
 const [addUser, { data, loading, error }] = useMutation(ADD_USER);
 if (loading) return <p>Submitting...</p>;
 if (error) return <p>Error: {error.message}</p>;
 const handleSubmit = (value) => {
    addUser({ variables: { ...value } });
 }
 
    return (
        <div>
            <div>
                <h3>Register</h3>
            </div>
            <div>
                <Formik
                    initialValues={{
                        name:'',
                        email: '',
                        phone: '',
                        password: ''
                    }

                    }
                    validationSchema={regFormSchema}
                    onSubmit={(value) => handleSubmit(value)}
                >
                    {() => (
                        <Form>
                            <div className="form-group">
                                <label>Full Name:</label>
                                <Field type="text" name="name" />
                                <ErrorMessage name="name" component="div" />
                            </div>
                            <div className="form-group">
                                <label>Email:</label>
                                <Field type="email" name="email" />
                                <ErrorMessage name="email" component="div" />
                            </div>
                            <div className="form-group">
                                <label>Phone Number:</label>
                                <Field type="text" name="phone" />
                                <ErrorMessage name="phone" component="div" />
                            </div>
                            <div className="form-group">
                                <label>Password:</label>
                                <Field type="password" name="password" />
                                <ErrorMessage name="password" component="div" />
                            </div>
                            <button type="submit">Submit</button>

                        </Form>
                    )}

                </Formik>
            </div>
        </div>
    )
}
