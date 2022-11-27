interface Task {
    id: number,
    title: string,
    done: boolean,
}

interface Project {
    id: number,
    name: string,
    tasks: Task[],
}

interface PaginatedResponse<T> {
    items: T[],
    totalCount: number,
}
