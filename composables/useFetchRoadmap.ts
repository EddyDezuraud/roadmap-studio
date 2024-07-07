import type { Database } from '~/types/supabase';


export const useFetchRoadmap = () => {

  const supabase = useSupabaseClient<Database>();


  //TASKS
  const getTask = async (id: number) => {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  }

  const updateTask = async (task: Database['public']['Tables']['tasks']['Row']) => {
    const { data, error } = await supabase
      .from('tasks')
      .update(task)
      .eq('id', task.id)
    
    if (error) throw error
    return data
  };

  const deleteTask = async (id: number) => {
    const taskStages = await getTaskStages(id);

    await supabase
      .from('task_stages')
      .delete()
      .eq('task_id', id)

    await supabase
      .from('task_stage_jobs')
      .delete()
      .eq('task_stage_id', taskStages.map(stage => stage.id))

    await supabase
      .from('tasks')
      .delete()
      .eq('id', id)

    return true
  }

  //STAGE
  const getTaskStages = async (taskId: number) => {
    const { data, error } = await supabase
      .from('task_stages')
      .select(`*, task_stage_jobs(*)`)
      .eq('task_id', taskId)
    
    if (error) throw error
    return data
  }

  const deleteTaskStage = async (id: number) => {
    const { data, error } = await supabase
      .from('task_stages')
      .delete()
      .eq('id', id)
    
    if (error) throw error
    return data
  }

  const deleteTaskStagesFromTask = async (taskId: number) => {
    const taskStages = await getTaskStages(taskId);

    await supabase
      .from('task_stages')
      .delete()
      .eq('task_id', taskId)

    await supabase
      .from('task_stage_jobs')
      .delete()
      .eq('task_stage_id', taskStages.map(stage => stage.id))

    return true
  }

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

  const getTaskStageJobs = async (taskStageId: number) => {
    const { data, error } = await supabase
      .from('task_stage_jobs')
      .select('*')
      .eq('task_stage_id', taskStageId)
    
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
    getTask,
    updateStageDuration,
    createTask,
    createTaskStages,
    createTaskStageJobs,
    getTaskStages,
    deleteTask,
    updateTask,
    deleteTaskStage,
    deleteTaskStagesFromTask
  }
}