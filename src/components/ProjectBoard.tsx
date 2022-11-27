import React, {useEffect, useState} from 'react';
import TaskList from "./TaskList";

const ProjectBoard = () => {
    const [response, setResponse] = useState<PaginatedResponse<Project> | null>(null);

    useEffect(() => {
        fetch(`/api/projects`)
            .then(r => r.json())
            .then(setResponse)
            .catch(console.log);

    }, []);

    
    return <div>
        <div>
            {response?.items.map(project => <div key={`project-${project.id}`}>
                <h2>{project.name}</h2>
                <TaskList tasks={project.tasks}/>
            </div>)}
        </div>
    </div>
}

export default ProjectBoard;
