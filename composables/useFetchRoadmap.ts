import type { Database } from '~/types/supabase';


export const useFetchRoadmap = () => {

  const supabase = useSupabaseClient<Database>();

  const updateRoadmapName = async (id: number, title: string) => {
    await supabase
      .from('roadmap')
      .update({ title })
      .eq('id', id)
  }

  // PRODUCTS

  const addProduct = async (product: Database['public']['Tables']['products']['Row']) => {
    const { data: newProduct, error } = await supabase
      .from('products')
      .insert(product)

    
    if (error) throw error

    if(newProduct && newProduct.length > 0) {
      const newSegment = await addNewSegment('Priorité 1', newProduct[0].id, 0);
    
      if (error) throw error
      return newProduct
    }

    return null

  }


  //SEGMENTS
  const updateSegmentName = async (id: number, name: string) => {
    await supabase
      .from('product_segments')
      .update({ name })
      .eq('id', id)
  }

  const addNewSegment = async (name: string, product_id: number, index: number) => {

    const { data: segments, error } = await supabase
      .from('product_segments')
      .select('*')
      .eq('product_id', product_id)
      .gte('index', index)

    if (error) throw error

    if (segments && segments.length > 0) {
      await Promise.all(segments.map((segment: Database['public']['Tables']['product_segments']['Row']) => 
        supabase
          .from('product_segments')
          .update({ index: segment.index + 1 })
          .eq('id', segment.id)
      ));
    }

    const {data: newSegment} = await supabase
      .from('product_segments')
      .insert({ name, product_id, index })
      .select('id')
      .single() as { data: {id: number} };
    

    if(!newSegment.id) return null;

    const {data: newLine} = await supabase
      .from('lines')
      .insert({ segment_id: newSegment.id, index: 0})
      .select('id')
      .single() as { data: {id: number} };

      return {
        id: newSegment.id,
        name,
        index,
        product_id,
        lines: [
          {
            id: newLine.id, index: 0, segment_id: newSegment.id, tasks: []
          }
        ]
      }

  }

  const deleteSegment = async (id: number) => {
    const { data: lines, error } = await supabase
      .from('lines')
      .select('*')
      .eq('segment_id', id)
    
    if (error) throw error

    if (lines && lines.length > 0) {
      await Promise.all(lines.map((line: Database['public']['Tables']['lines']['Row']) => 
        supabase
          .from('lines')
          .delete()
          .eq('id', line.id)
      ));
    }

    await supabase
      .from('product_segments')
      .delete()
      .eq('id', id)
  }


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

    if (taskStages && taskStages.length > 0) {
      await Promise.all(taskStages.map((stage: Database['public']['Tables']['task_stages']['Row']) => 
        supabase
          .from('task_stage_jobs')
          .delete()
          .eq('task_stage_id', stage.id)
      ));
    }
    
    await supabase
      .from('task_stages')
      .delete()
      .eq('task_id', id)

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
    updateRoadmapName,
    updateSegmentName,
    addNewSegment,
    getTask,
    updateStageDuration,
    createTask,
    createTaskStages,
    createTaskStageJobs,
    getTaskStages,
    deleteTask,
    updateTask,
    deleteTaskStage,
    deleteTaskStagesFromTask,
    deleteSegment,
    addProduct
  }
}