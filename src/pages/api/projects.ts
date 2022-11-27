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

const TAKE = 3;
const SKIP = 1;
let CURSOR_ID: number | undefined = undefined
let PAGE_NUMBER = 1;

async function getPaginatedProjects(cursorId: number | undefined) {
    const queryResults = await prisma.project.findMany({
        take: TAKE,
        skip: SKIP,
        ... (cursorId && {
            cursor: {
                id: cursorId,
            }
        }),
        orderBy: {
            id: 'asc',
        },
        include: {
            tasks: true,
        },
    })

    const lastPostInResults = queryResults[TAKE-1] // Remember: zero-based index! :)
    PAGE_NUMBER++;
    CURSOR_ID = lastPostInResults.id 

    return queryResults;
}





export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<PaginatedResponse<Project>>
) {
    try {
        if (req.method !== 'GET') {
            res.status(405).end();
            return;
        }
        const projects = await getPaginatedProjects(CURSOR_ID)

        console.log(`PAGE: ${PAGE_NUMBER}`)
        res.status(200).json({
            totalCount: projects.length,
            items: projects,
        });
    } catch (e) {
        console.error(e);
        res.status(500);
    }
}
