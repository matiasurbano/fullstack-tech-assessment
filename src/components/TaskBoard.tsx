import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styles from './TaskBoard.module.css';
import Task from "./Task";
import TaskList from "./TaskList";
import { useDebounce } from 'usehooks-ts'


const TaskBoard = () => {
    const [response, setResponse] = useState<PaginatedResponse<Task> | null>(null);
    const [error, setError] = useState<any>(null);
    const [filter, setFilter] = useState('');
    const debouncedFilter = useDebounce<string>(filter, 300)

    useEffect(() => {
        const controller = new AbortController()
        const signal = controller.signal
        let aborted = false;

        fetch(`/api/tasks?filter=${encodeURIComponent(debouncedFilter)}`, { signal })
            .then(r => r.json())
            .then(r => {
                if (!aborted)
                    setResponse(r);
            })
            .catch(e => {
                if (!aborted)
                    setError(e);
            })

        return () => {
            controller.abort()
            aborted = true
        }
    }, [debouncedFilter]);

    return (
        <div>
            {error && (<div>Error: {error.message}</div>)}
            <div>
                <input type="text" placeholder="Filter" value={filter} className={styles.filter}
                    onChange={e => setFilter(e.target.value)} />
            </div>
            {response && <TaskList tasks={response?.items} />}
        </div>
    )
}

export default TaskBoard;
