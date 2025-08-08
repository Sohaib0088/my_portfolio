import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main(): Promise<void> {
  console.log('🌱 Starting database seed...');

  try {
    // Create admin user (upsert to avoid duplicates)
    // Note: Change these credentials before deploying
    const hashedPassword = await bcrypt.hash('your-secure-password-here', 10);
    const adminUser = await prisma.user.upsert({
      where: { email: 'your-email@gmail.com' },
      update: {}, // no update if exists
      create: {
        email: 'your-email@gmail.com',
        name: 'Admin User',
        password: hashedPassword,
        role: 'admin' // lowercase
              
      },
    });
    console.log('✅ Admin user created or found:', adminUser.email);
  } catch (error) {
    console.error('❌ Failed to create admin user:', error);
  }

  try {
    // Create sample projects
    const projects = await Promise.all([
      prisma.project.create({
        data: {
          title: 'E-Commerce Platform',
          description:
            'A full-stack e-commerce platform built with React, Node.js, and MongoDB. Features include user authentication, product management, shopping cart, and payment integration.',
          imageUrl: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1280&h=720&dpr=1',
          githubUrl: 'https://github.com/username/ecommerce-platform',
          liveUrl: 'https://ecommerce-platform.vercel.app',
          // Use Json type if schema allows; else keep JSON.stringify
          technologies: JSON.stringify([
            'React',
            'Node.js',
            'MongoDB',
            'Stripe',
            'Tailwind CSS',
          ]),
          featured: true,
          order: 1,
        },
      }),
      prisma.project.create({
        data: {
          title: 'Task Management App',
          description:
            'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.',
          imageUrl: 'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=1280&h=720&dpr=1',
          githubUrl: 'https://github.com/username/task-management',
          liveUrl: 'https://task-management-app.vercel.app',
          technologies: JSON.stringify([
            'React',
            'TypeScript',
            'Socket.io',
            'PostgreSQL',
            'Prisma',
          ]),
          featured: true,
          order: 2,
        },
      }),
      prisma.project.create({
        data: {
          title: 'Portfolio Website',
          description:
            'A modern, responsive portfolio website showcasing projects, skills, and experience with smooth animations and dark mode support.',
          imageUrl: 'https://images.pexels.com/photos/1181275/pexels-photo-1181275.jpeg?auto=compress&cs=tinysrgb&w=1280&h=720&dpr=1',
          githubUrl: 'https://github.com/username/portfolio',
          liveUrl: 'https://portfolio-website.vercel.app',
          technologies: JSON.stringify([
            'React',
            'TypeScript',
            'Tailwind CSS',
            'Framer Motion',
          ]),
          featured: false,
          order: 3,
        },
      }),
    ]);
    console.log(`✅ Sample projects created: ${projects.length}`);
  } catch (error) {
    console.error('❌ Failed to create projects:', error);
  }

  try {
    // Create sample skills
    const skillsData = [
      { name: 'React', category: 'FRONTEND', level: 5, icon: 'react', order: 1 },
      { name: 'TypeScript', category: 'LANGUAGES', level: 4, icon: 'typescript', order: 2 },
      { name: 'Node.js', category: 'BACKEND', level: 4, icon: 'nodejs', order: 3 },
      { name: 'PostgreSQL', category: 'DATABASE', level: 3, icon: 'postgresql', order: 4 },
      { name: 'Docker', category: 'DEVOPS', level: 3, icon: 'docker', order: 5 },
    ];
    
    const skills = await Promise.all(
      skillsData.map(skill =>
        prisma.skill.upsert({
          where: { name: skill.name },
          update: {}, // no update
          create: skill,
        })
      )
    );
    console.log(`✅ Sample skills created or updated: ${skills.length}`);
  } catch (error) {
    console.error('❌ Failed to create skills:', error);
  }

  try {
    // Create sample experiences
    const experiences = await Promise.all([
      prisma.experience.create({
        data: {
          title: 'Senior Frontend Developer',
          company: 'Tech Company Inc.',
          location: 'San Francisco, CA',
          startDate: new Date('2022-01-01'),
          endDate: null,
          current: true,
          description:
            'Leading frontend development for multiple web applications, mentoring junior developers, and implementing best practices for code quality and performance.',
          technologies: JSON.stringify([
            'React',
            'TypeScript',
            'Next.js',
            'Tailwind CSS',
          ]),
          order: 1,
        },
      }),
      prisma.experience.create({
        data: {
          title: 'Full Stack Developer',
          company: 'StartupXYZ',
          location: 'Remote',
          startDate: new Date('2020-06-01'),
          endDate: new Date('2021-12-31'),
          current: false,
          description:
            'Developed and maintained multiple web applications using modern technologies. Collaborated with cross-functional teams to deliver high-quality software solutions.',
          technologies: JSON.stringify([
            'React',
            'Node.js',
            'MongoDB',
            'Express',
          ]),
          order: 2,
        },
      }),
    ]);
    console.log(`✅ Sample experiences created: ${experiences.length}`);
  } catch (error) {
    console.error('❌ Failed to create experiences:', error);
  }

  try {
    // Create sample about content
    const about = await prisma.about.create({
      data: {
        title: 'About Me',
        content:
          'I am a passionate full-stack developer with over 5 years of experience building modern web applications. I specialize in React, TypeScript, and Node.js, and I love creating user-friendly, scalable solutions that solve real-world problems.',
        imageUrl: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=1280&h=720&dpr=1',
        order: 1,
      },
    });
    console.log('✅ Sample about content created');
  } catch (error) {
    console.error('❌ Failed to create about content:', error);
  }

  console.log('🎉 Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
