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



interface PageInfo {
    size: number;
    totalCount: number;
    nextCursor?: string,
}
interface PaginatedResponse<T> {
    pageInfo: PageInfo,
    items: T[],
}
