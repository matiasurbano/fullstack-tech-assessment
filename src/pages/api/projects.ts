import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'

//
// This API route can be called as GET /api/projects
// It returns the list of all projects in the app, along with each project's tasks
//
async function getProjects(includeTasks: boolean = false) {
    return await prisma.project.findMany({
        include: {
            tasks: includeTasks,
        },
    })
}


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ProjectsResponse>
) {
    try {
        if (req.method !== 'GET') {
            res.status(405).end();
            return;
        }

        const projects = await getProjects(true)

        res.status(200).json({
            totalCount: projects.length,
            items: projects,
        });
    } catch (e) {
        console.error(e);
        res.status(500);
    }
}
