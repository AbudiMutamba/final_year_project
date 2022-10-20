// require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseKey = process.env.REACT_APP_SUPABASE_ROLE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

const handler = async ( req, res ) => {
    try {
        const { email, password, username } = req.body

        if ( !email ) {
            const response = { "Status":"Failure","Details": "Email address not provided"}
            return res.status(400).json(response)
        }

        if ( !password ) {
            const response = { "Status": "Failure", "Details": "Password not provided"}
            return res.status(400).json(response)
        }

        if ( !username || username.length < 1 ) {
            const response = { "Status": "Failure", "Username": "Information not provided"}
            return res.status(400).json(response)
        }

        const { data: user, error } = await supabase.auth.api.createUser({
            email,
            password,
            email_confirm: true
        })

        if ( error ) throw error

        const { id } = user

        const response = await supabase.from("profiles")
                  .update({
                    username,
                    roles:"member"
                  })
                  .eq("id", id)
        if (response?.error) {
          throw error
        }

        else{
           const response = { "Status": "Success", "Details": "The user has been created"}
           return res.status(400).json(response)
        }
        
    } catch ( error ){
        const response = {"Status":"Failure", "Details":error}
        return res.status(400).json(response)      
    }
}

export default handler;