import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://eqazyhqeowwclnkkxswr.supabase.co';
const supabaseKey = 'sb_publishable_GVFChe2mRPX-QmNdWgbE6Q_mQWCFIfv';

export const supabase = createClient(supabaseUrl, supabaseKey);
