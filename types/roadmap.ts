interface TaskStageJob {
  id: number;
  task_stage_id: number;
  job_id: number;
  index: number;
}

interface View {
  id: number;
  name: string;
  roadmap_id: number;
  date_start: string;
  date_end: string;
  day_width: number;
  default: boolean;
  archived: boolean;
  task_size: string;
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
    task_stages: TaskStage[];
    subtitle: string;
    segment_id: number;
    line_id: number;
    start_date: string;
    info: string;
    logo: string | null;
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
    index: number;
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
    date_end: string | null;
    date_start: string | null;
    day_size: number | null;
    organization_id: number | null;
    subtitle: string | null;
    col_size: number;
    start_date: string;
    date: Column[];
    columns: Column[];
    products: Product[];
    markers?: Markers[];
  }

  interface Week {
    start: string;
    end: string;
    index: number;
    xPosition: number;
    width: number;
  }

  export type { Roadmap, Column, Product, Segment, Line, Task, TaskStage, Stage, Markers, Job, TaskStageJob, Week, View};