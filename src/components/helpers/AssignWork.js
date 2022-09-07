import React from 'react'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'

export default function AssignWork() {
    // const initial_values = {
    //     name: "",
    //     password:"",
    //     phone_number:""
    // }

    const inital_values = {
        title_of_work: "",
        who_will_do_the_work: "",
        description_of_work: "",
        deadline_day: "",
        on_what_project: ""
    }

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("!required").min(3),

    }
        
    )

  return (
    <div>
        <h1>Assign work</h1>
        <Formik
            initialValues={inital_values}
            validationSchema={validationSchema}
            onSubmit={async (values, {resetForm}) => {
                 alert(JSON.stringify(values, null, 4))
                console.log(values)

            }}
        > 
            {({
                handleChange,
                handleBlur,
                values,
                touched,
                errors
            }
                
            ) => 
                 
                <Form className='border-2'>
                    <div>
                        <label>Title of the work</label>
                        <Field
                            name="title_of_work"
                            placeholder="title"
                            type="text"
                        />
                        {/* {
                            touched?.name && errors?.name && <div>{errors.name}</div>
                        } */}
                    </div>
                    <div>
                        <label>Who will do the work?</label>
                        <Field
                            as="select"
                            name="who_will_do_the_work"
                            placeholder="select"
                        >
                            <option value="red">Abudi</option>

                            <option value="green">David</option>

                            <option value="blue">Charles</option>
                        </Field>
                    </div>
                    
                    <div>
                        <label>Description of work?</label>
                        <Field
                            as="textarea"
                            name="description_of_work"
                            placeholder="description"
                        />
                    </div>
                    <div>
                        <label>Deadline day</label>
                        <Field
                            as="select"
                            name="Deadline_day"
                            placeholder="select"
                        >
                            <option value="red">Abudi</option>

                            <option value="green">David</option>

                            <option value="blue">Charles</option>
                        </Field>
                    </div>
                    <button
                        type='submit'
                    >
                        submit

                    </button>
                    
                </Form>
            }

        </Formik>
    </div>
  )
}
