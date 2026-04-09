export interface PostMeta {
  auth: string;
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  url: string;
}

const articlesConfig: PostMeta[] = [
  {
    auth: "一只迷路的77",
    slug: "algorithm-twoPointers-receiveRainWater",
    title: "接雨水",
    date: "2026-04-06",
    excerpt: "经典的双指针类型题目，不规则容器容量问题",
    url: "/blog/posts/algorithm/twoPointers/receiveRainWater",
  },
  {
    auth: "一只迷路的77",
    slug: "algorithm-twoPointers-removeDuplicates",
    title: "删除重复元素",
    date: "2026-04-06",
    excerpt: "经典的双指针类型题目，不规则容器容量问题",
    url: "/blog/posts/algorithm/twoPointers/removeDuplicates",
  },
];

export async function getPosts(): Promise<PostMeta[]> {
  return articlesConfig;
}

export async function getPostBySlug(slug: string): Promise<PostMeta | null> {
  return articlesConfig.find((post) => post.slug === slug) || null;
}
