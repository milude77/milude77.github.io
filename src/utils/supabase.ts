import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Todo {
  id: number;
  task: string;
  target_date: string;
  is_completed: boolean;
  user_id: string;
  created_at: string;
  isEditing?: boolean;
}

export async function login(): Promise<void> {
  await supabase.auth.signInWithOAuth({
    provider: "github",
  });
}

export async function addTask(text: string, dateStr: string) {
  const { data, error } = await supabase
    .from("todos")
    .insert([
      {
        task: text,
        target_date: dateStr, // 保存当前选中的日期
        user_id: (await supabase.auth.getUser()).data.user?.id,
      },
    ])
    .select();
  return { data, error };
}

export async function logout() {
  await supabase.auth.signOut();
}

export async function getMyTasks(dateString: string) {
  let query = supabase.from("todos").select("*");

  if (dateString) {
    query = query.eq("target_date", dateString);
  }

  const { data, error } = await query.order("created_at", { ascending: false });
  return { data, error };
}
export async function updateTask(id: number | string, newText: string) {
  const { data, error } = await supabase
    .from("todos")
    .update({ task: newText })
    .eq("id", id);
  return { data, error };
}

export async function completeTask(id: number | string) {
  const { data, error } = await supabase
    .from("todos")
    .update({ is_completed: true })
    .eq("id", id);
  return { data, error };
}

export async function deleteTask(id: number | string) {
  const { data, error } = await supabase.from("todos").delete().eq("id", id);
  return { data, error };
}
