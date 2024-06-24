interface TagPosition {
    start: number;
    end: number;
}

interface Tag {
    name: string;
    type: string;
    position: TagPosition;
}

interface Tags {
    timeline: boolean;
    list: Tag[];
}

interface TaskPosition {
    start: number;
    end: number;
}

interface Task {
    name: string;
    subtitle: string;
    position: TaskPosition;
    tags: Tags;
}

interface Line {
    tasks: Task[];
}

interface Segment {
    name: string;
    lines: Line[];
}

interface Product {
    name: string;
    color: string;
    segments: Segment[];
}

interface Column {
    name: string;
    size: number;
}

interface MetaData {
    title: string;
    colSize: number;
    tagsType: string[];
}

interface DataModel {
    columns: Column[];
    metaData: MetaData;
    products: Product[];
}

export type { DataModel, Column, MetaData, Product, Segment, Line, Task, Tags, Tag, TagPosition, TaskPosition };