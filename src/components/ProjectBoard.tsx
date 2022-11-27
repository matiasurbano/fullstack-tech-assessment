import Link from 'next/link';
import { useRouter } from 'next/router';
import React, {useEffect, useState} from 'react';
import TaskList from "./TaskList";

const ProjectBoard = () => {
    const [response, setResponse] = useState<PaginatedResponse<Project> | null>(null);
    const { query } = useRouter();


    useEffect(() => {
        const apiEndpoint = `/api/projects`
        const nextCursorParam = query.nextCursor ? `/?nextCursor=${query.nextCursor}` : ''
        
        fetch(`${apiEndpoint}${nextCursorParam}`)
            .then(r => r.json())
            .then(setResponse)
            .catch(console.log);

    }, [query]);


    const nextCursorLink =  response && response.pageInfo.nextCursor ? (
        <Link href={`?nextCursor=${response.pageInfo.nextCursor}`}>Next Page</Link>
    ) : null;
    
    return <div>
        {nextCursorLink}
        <div>
            {response?.items.map(project => <div key={`project-${project.id}`}>
                <h2>{project.name}</h2>
                <TaskList tasks={project.tasks}/>
            </div>)}
        </div>
    </div>
}

export default ProjectBoard;
