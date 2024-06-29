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

  const createTask = async (task: Database['public']['Tables']['tasks']['Row']) => {
    const { data, error } = await supabase
      .from('tasks')
      .insert(task)
      .select('id')
    
    if (error) throw error
    return data
  }

  const createTaskStages = async (taskStages: Database['public']['Tables']['task_stages']['Row'][]) => {
    const { data, error } = await supabase
      .from('task_stages')
      .insert(taskStages)
    
    if (error) throw error
    return data
  }

  const createTaskStageJobs = async (taskStageJobs: Database['public']['Tables']['task_stage_jobs']['Row'][]) => {
    const { data, error } = await supabase
      .from('task_stage_jobs')
      .insert(taskStageJobs)
      .select('id')
    
    if (error) throw error
    return data
  }

  return {
    updateStageDuration,
    createTask,
    createTaskStages,
    createTaskStageJobs
  }
}