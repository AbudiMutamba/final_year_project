import { ErrorMessage } from "formik"

export const InputField = ({ errors, defaultValue="", touched, reference, id, label, handleChange, handleBlur, ...props }) => (
    <div className='flex flex-col w-56'>
        <label htmlFor={id} className='text-sm'>{label}</label>  
        <input className='ring-1 ring-black rounded px-2 py-1 dark:bg-dark-bg-600' onChange={handleChange(reference)} defaultValue={defaultValue} onBlur={handleBlur(reference)} {...props}/>
        <ErrorMessage name={reference}>{msg => <div className="error text-xs text-red-500">{msg}</div>}</ErrorMessage>
    </div>
)