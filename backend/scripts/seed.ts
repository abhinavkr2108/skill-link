const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
  try {
    await database.category.createMany({
      data: [
        { name: "Health & Fitness" },
        { name: "Web Development" },
        { name: "Mobile App Development" },
        { name: "Graphic Design" },
        { name: "Digital Marketing" },
        { name: "Content Writing" },
        { name: "Game Development" },
        { name: "Artificial Intelligence & Machine Learning" },
        { name: "Cybersecurity" },
        { name: "Blockchain Technology" },
        { name: "Project Management" },
        { name: "Leadership & Management" },
        { name: "Personal Development" },

        { name: "Music & Audio Production" },
        { name: "Language Learning" },
        { name: "Teaching & Academics" },
        { name: "Fashion & Beauty" },
        { name: "Cooking & Culinary Arts" },
        { name: "Sustainable Living & Green Technology" },
        { name: "Psychology & Mental Health" },
      ],
    });
  } catch (error) {
    console.error(error);
  } finally {
    await database.$disconnect();
  }
}

main();
