import fs from "fs";
import path from "path";
import matter, { stringify } from "gray-matter";

const postsDirectory = path.join(process.cwd(), "/pages/posts");

export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, "");

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      ...matterResult.data,
    };
  });
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export const getJsonData = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/comments");
  return res.json();
};

export const getSSRDatas = async () => {
  const datas = await fetch("https://jsonplaceholder.typicode.com/posts");
  return datas.json();
};

export const getSSRDataIds = async () => {
  const datas = await getSSRDatas();
  const postsData = [...datas].map((data) => ({
    params: {
      id: String(data.id),
    },
  }));
  return postsData;
};

export const getSSRDataById = async (id) => {
  const datas = await getSSRDatas();
  const res = datas.find((item) => String(item.id) === id);
  return res;
};
