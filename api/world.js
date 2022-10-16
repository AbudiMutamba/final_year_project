import async from './hello';

require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_ROLE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)


export default async function (req, res)  {
  // res.statusCode = 200;
  // res.json({ message: 'It works' });
  try {
        const { email, password } = req.body

        if ( !email ) {
            const response = { "Status":"Failure","Details": "Email address not provided"}
            return res.status(400).json(response)
        }

        if ( !password ) {
            const response = { "Status": "Failure", "Details": "Password not provided"}
            return res.status(400).json(response)
        }

        const { data: user, error } = await supabase.auth.api.createUser({
            email,
            password,
            password_confirm: true
        })

        if ( error ) throw error
        if ( user ) {
           const response = { "Status": "Success", "Details": "The user has been created"}
           return res.status(400).json(response)
        }
        
    } catch ( error ){
        const response = {"Status":"Failure", "Details":error}
        return res.status(400).json(response)      
    }

}