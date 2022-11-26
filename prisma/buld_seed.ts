import { PrismaClient, Prisma } from '@prisma/client'
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient()

export const Projects: Prisma.ProjectCreateInput[] = [];

export function createRandomProject(): Prisma.ProjectCreateInput {
  return {
    name: faker.company.catchPhraseDescriptor(),
    tasks: {
        create: [
            { title: faker.git.commitMessage(), done: Math.random() > .5 },
            { title: faker.git.commitMessage(), done: Math.random() > .5 },
            { title: faker.git.commitMessage(), done: Math.random() > .5 },
            { title: faker.git.commitMessage(), done: Math.random() > .5 },
            { title: faker.git.commitMessage(), done: Math.random() > .5 },
        ]
    }
  };
}

Array.from({ length: 50 }).forEach(() => {
    Projects.push(createRandomProject());
});

async function main() {
    console.log(`Start seeding ...`)
    for (const u of Projects) {
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
