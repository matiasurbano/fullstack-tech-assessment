import { faker } from '@faker-js/faker';
import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

export const Projects: Prisma.ProjectCreateInput[] = [];

export function createRandomProject(): Prisma.ProjectCreateInput {
  return {
    name: `Project: ${faker.company.catchPhraseDescriptor()}`,
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
async function main() {
    const seedSize = process.env.BULK_SEED_SIZE ? parseInt(process.env.BULK_SEED_SIZE) : 50;
    console.log(`Start seeding a ${seedSize} records dataset...`)
    
    Array.from({ length: seedSize }).forEach(async () => {
        try {
            const project = await prisma.project.create({
                data: createRandomProject(),
            })
            console.log(`Created user with id: ${project.id}`)            
        } catch (error) {
            console.log('Failed to create a user')      
        }
    });
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
