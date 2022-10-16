import async from './hello';

require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_ROLE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)


export default async function (req, res)  {
  res.statusCode = 200;
  res.json({ message: 'It works' });
 
}