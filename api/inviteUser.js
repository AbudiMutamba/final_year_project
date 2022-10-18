// import { supabase } from "../../utils/supabaseClient";

require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseKey = process.env.REACT_APP_SUPABASE_ROLE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)
const handler = async (req, res) => {
  const obj = await supabase.auth.api.inviteUserByEmail(req.body.email);
  console.log(obj)
  res.status(200).json(obj)
};

export default handler;