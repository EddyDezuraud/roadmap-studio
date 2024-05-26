interface Tag {
    // Ajoutez les propriétés de l'objet Tag ici
  }
  
  interface Task {
    id: number;
    name: string;
    size: number;
    tags: Tag[];
    start: number;
    subtitle: string;
    segment_id: number;
    line_id: number;
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
    segments: Segment[];
    roadmap_id: number;
  }
  
  interface Column {
    id: number;
    name: string;
    show: boolean;
    size: number;
    start: number;
    roadmap_id: number;
  }
  
  interface Roadmap {
    id: number;
    title: string;
    col_size: number;
    organization_id: number;
    columns: Column[];
    products: Product[];
  }

    export type { Roadmap, Column, Product, Segment, Line, Task, Tag };