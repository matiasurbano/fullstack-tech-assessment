import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()
const userData: Prisma.ProjectCreateInput[] = [
    {
        name: 'Project Salsa',
        tasks: {
            create: [
                { title: 'Check out Prisma with Next.js', done: true },
                { title: 'Write unit tests', done: false },
                { title: 'Choose a name', done: false },
                { title: 'Review copy', done: true },
                { title: 'Deploy to staging', done: false },
                { title: 'Deploy to production', done: false },
            ],
        }
    },
    {
        name: 'Project Tango',
        tasks: {
            create: [
                { title: 'Smoke testing', done: false },
                { title: 'Talk to marketing', done: false },
                { title: 'Load testing', done: false },
            ],
        }
    },
]

async function main() {
    console.log(`Start seeding ...`)
    for (const u of userData) {
        const project = await prisma.project.create({
            data: u,
        })
        console.log(`Created user with id: ${project.id}`)
    }
    console.log(`Seeding finished.`)
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
