import { createClient } from '@supabase/supabase-js'
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// --- Socket.IO Main Process Setup --


const configPath = path.join(__dirname, '..', '..', 'config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));


const supabase = createClient(config.SUPABASE_URL, config.SUPABASE_ANON_KEY)

// 1. 登录
async function login() {
    await supabase.auth.signInWithOAuth({ provider: 'github' })
}

async function addTask(text) {
    const { data, error } = await supabase
        .from('todos')
        .insert([{ task: text }])
}

async function getMyTasks() {
    const { data } = await supabase.from('todos').select('*')
    return data
}

async function updataTasks(params) {
    const { data, error } = await supabase
        .from('todos')
        .update({ task: params.text })
}

