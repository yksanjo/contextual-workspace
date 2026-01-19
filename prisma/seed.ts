import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Clear existing data
  await prisma.task.deleteMany()
  await prisma.project.deleteMany()
  await prisma.workspace.deleteMany()
  await prisma.user.deleteMany()

  // Create test user
  const hashedPassword = await hash('password123', 12)
  
  const user = await prisma.user.create({
    data: {
      email: 'test@example.com',
      name: 'Test User',
      emailVerified: new Date(),
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=test',
    },
  })

  console.log(`✅ Created user: ${user.email}`)

  // Create workspace
  const workspace = await prisma.workspace.create({
    data: {
      name: 'Development Team',
      description: 'Main workspace for development projects',
      slug: 'development-team',
      ownerId: user.id,
    },
  })

  console.log(`✅ Created workspace: ${workspace.name}`)

  // Create projects
  const projects = await Promise.all([
    prisma.project.create({
      data: {
        name: 'Website Redesign',
        description: 'Redesign company website with modern UI/UX',
        workspaceId: workspace.id,
      },
    }),
    prisma.project.create({
      data: {
        name: 'Mobile App',
        description: 'Develop cross-platform mobile application',
        workspaceId: workspace.id,
      },
    }),
    prisma.project.create({
      data: {
        name: 'API Development',
        description: 'Build RESTful API for internal services',
        workspaceId: workspace.id,
      },
    }),
  ])

  console.log(`✅ Created ${projects.length} projects`)

  // Create tasks
  const tasks = await Promise.all([
    // Website Redesign tasks
    prisma.task.create({
      data: {
        title: 'Design Homepage',
        description: 'Create wireframes and mockups for homepage',
        status: 'IN_PROGRESS',
        priority: 'HIGH',
        projectId: projects[0].id,
        assignedTo: user.id,
      },
    }),
    prisma.task.create({
      data: {
        title: 'Implement Responsive Design',
        description: 'Make website responsive for mobile devices',
        status: 'TODO',
        priority: 'MEDIUM',
        projectId: projects[0].id,
      },
    }),
    prisma.task.create({
      data: {
        title: 'Optimize Performance',
        description: 'Improve page load times and Core Web Vitals',
        status: 'TODO',
        priority: 'MEDIUM',
        projectId: projects[0].id,
      },
    }),

    // Mobile App tasks
    prisma.task.create({
      data: {
        title: 'Set Up React Native',
        description: 'Initialize React Native project with TypeScript',
        status: 'DONE',
        priority: 'HIGH',
        projectId: projects[1].id,
        assignedTo: user.id,
      },
    }),
    prisma.task.create({
      data: {
        title: 'Design App Screens',
        description: 'Create UI designs for main app screens',
        status: 'IN_PROGRESS',
        priority: 'HIGH',
        projectId: projects[1].id,
      },
    }),

    // API Development tasks
    prisma.task.create({
      data: {
        title: 'Define API Schema',
        description: 'Design GraphQL schema or REST endpoints',
        status: 'TODO',
        priority: 'MEDIUM',
        projectId: projects[2].id,
      },
    }),
    prisma.task.create({
      data: {
        title: 'Implement Authentication',
        description: 'Add JWT-based authentication to API',
        status: 'TODO',
        priority: 'HIGH',
        projectId: projects[2].id,
      },
    }),
  ])

  console.log(`✅ Created ${tasks.length} tasks`)

  // Create subscription (mock)
  const subscription = await prisma.subscription.create({
    data: {
      userId: user.id,
      stripeCustomerId: 'cus_mock_' + Date.now(),
      stripeSubscriptionId: 'sub_mock_' + Date.now(),
      stripePriceId: 'price_mock_' + Date.now(),
      status: 'active',
      currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    },
  })

  console.log(`✅ Created subscription for user`)

  console.log('🎉 Database seed completed successfully!')
  console.log('')
  console.log('📊 Seed Summary:')
  console.log(`   Users: 1`)
  console.log(`   Workspaces: 1`)
  console.log(`   Projects: ${projects.length}`)
  console.log(`   Tasks: ${tasks.length}`)
  console.log(`   Subscriptions: 1`)
  console.log('')
  console.log('🔑 Test Credentials:')
  console.log(`   Email: test@example.com`)
  console.log(`   Password: password123`)
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })