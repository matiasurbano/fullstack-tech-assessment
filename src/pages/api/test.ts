import type {NextApiRequest, NextApiResponse} from 'next'
import prisma from  '../../lib/prisma'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    handleGetProjects(res)
}

async function handleGetProjects(res: NextApiResponse) {
    const projects = await prisma.project.findMany({
        include: {
            tasks: true, // Return all fields
          },
    })
    res.json(projects)
}
  