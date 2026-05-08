import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '../utils/supabase'

export const useUserStore = defineStore('user', () => {
  const user = ref<any>(null)

  // 初始化监听
  const init = () => {
    supabase.auth.onAuthStateChange((_event, session) => {
      user.value = session?.user || null
    })
  }

  return { user, init }
})