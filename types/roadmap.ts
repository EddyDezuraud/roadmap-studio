interface TaskStageJob {
  id: number;
  task_stage_id: number;
  job_id: number;
  index: number;
}

interface TaskStage {
    id: number;
    duration: number;
    index: number;
    task_id: number;
    infinite: boolean;
    stage_id: number;
    task_stage_jobs: TaskStageJob[];
  }

  interface Stage {
    id: number;
    name: string;
    color: string;
  }

  interface Job {
    id: number;
    name: string;
    index: number;
  }
  
  interface Task {
    id: number;
    name: string;
    size: number;
    task_stages: TaskStage[];
    start: number;
    subtitle: string;
    segment_id: number;
    line_id: number;
    start_date: string;
    info: string;
    logo: string;
  }

  interface Line {
    id: number;
    index: number;
    segment_id: number;
    tasks: Task[];
  }
  
  interface Segment {
    id: number;
    name: string;
    index: number;
    lines: Line[];
    product_id: number;
  }
  
  interface Product {
    id: number;
    name: string;
    color: string;
    product_segments: Segment[];
    roadmap_id: number;
  }

  interface Markers {
    id: number;
    name: string;
    color: string;
    date: string;
    full_month: boolean;
    show: boolean;
  }
  
  interface Column {
    date: string;
    show: boolean;
    size: number;
    markers: Markers[]
  }
  
  interface Roadmap {
    id: number;
    title: string;
    col_size: number;
    day_size: number;
    start_date: string;
    organization_id: number;
    date: Column[];
    products: Product[];
  }

  interface Week {
    start: string;
    end: string;
    index: number;
    xPosition: number;
    width: number;
  }

  export type { Roadmap, Column, Product, Segment, Line, Task, TaskStage, Stage, Markers, Job, TaskStageJob, Week};