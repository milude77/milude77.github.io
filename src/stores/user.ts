import { defineStore } from "pinia";
import { ref, computed, watch } from "vue";
import { supabase } from "../utils/supabase";

export const useUserStore = defineStore("user", () => {
  const user = ref<any>(null);
  const checkInData = ref<any>(null);

  const isAreadyCheckIn = computed(() => {
    if (!checkInData.value?.last_date) return false;
    const today = new Date().toISOString().split("T")[0];
    return checkInData.value.last_date === today;
  });

  const getCheckInData = async (id: number | string) => {
    const { data, error } = await supabase
      .from("check_ins")
      .select("last_date, streak")
      .eq("user_id", id)
      .maybeSingle();
    if (!error) {
      checkInData.value = data;
    } else {
      console.log(error);
    }
  };

  watch(
    () => user.value?.id,
    (id) => {
      getCheckInData(id);
    },
  );

  // 初始化监听
  const init = () => {
    supabase.auth.onAuthStateChange((_event, session) => {
      user.value = session?.user || null;
    });
  };

  return { user, init, checkInData, isAreadyCheckIn };
});
