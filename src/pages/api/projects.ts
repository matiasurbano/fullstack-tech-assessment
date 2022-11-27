import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';

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

const TAKE = 10;
const SKIP = 1;

let nextCursorId: number | undefined = undefined

async function getPaginatedProjects(cursorId: number | undefined) : Promise<PaginatedResponse<Project>> {
    const queryResults = await prisma.project.findMany({
        take: TAKE,
        skip: SKIP,
        ... (cursorId && {
            cursor: {
                id: cursorId,
            }
        }),
        orderBy: {
            name: 'asc',
        },
        include: {
            tasks: true,
        },
    })

    const lastProjectInResults = queryResults[TAKE - 1]
    nextCursorId = lastProjectInResults ? lastProjectInResults.id : undefined

    return {
        pageInfo: {
            size: TAKE,
            totalCount: queryResults.length,
            nextCursor: nextCursorId ? Buffer.from(String(nextCursorId)).toString('base64') : ''
        },
        items: queryResults,
    };
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
        let nextCursorId: number | undefined;
        const nextCursor = req.query.nextCursor
        if (nextCursor) {
            const decryptedCursor = Buffer.from(String(nextCursor), 'base64').toString('ascii')
            nextCursorId = Number(decryptedCursor);
        }

        const paginatedResponse = await getPaginatedProjects(nextCursorId)
        res.status(200).json(paginatedResponse);
    } catch (e) {
        console.error(e);
        res.status(500);
    }
}
