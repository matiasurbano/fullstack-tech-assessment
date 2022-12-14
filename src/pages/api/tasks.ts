import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';

//
// This API route can be called as GET /api/tasks
// It returns the list of all tasks in the app
// It takes an optional query param 'filter', which can be used to filter
// out tasks based on their title
//
async function getTasks(filter: string | string[] | undefined) {
    const filterCondition = filter ? {
        where: {
            title: {
                contains: Array.isArray(filter) ? filter[0] : filter
            },
        }
    } : undefined
    return await prisma.task.findMany(filterCondition)
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<PaginatedResponse<Task>>
) {
    try {
        if (req.method !== 'GET') {
            res.status(405).end();
            return;
        }
        const filter = req.query?.filter
        const tasks = await getTasks(filter)

        res.status(200).json({
            items: tasks,
            pageInfo: {
                size:  tasks.length,
                totalCount: tasks.length,
            }
        });
    } catch (e) {
        console.error(e);
        res.status(500);
    }
}
