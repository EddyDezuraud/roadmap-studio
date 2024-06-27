import type { Database } from '~/types/supabase';


export const useFetchRoadmap = () => {

  const supabase = useSupabaseClient<Database>();
  

  const updateStageDuration = async (id: number, value: number) => {
    const { data, error } = await supabase
      .from('task_stages')
      .update({ duration: value })
      .eq('id', id)
    
    if (error) throw error
    return data
  }

  return {
    updateStageDuration,
  }
}