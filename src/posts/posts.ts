export interface PostMeta {
  auth: string;
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  url: string;
}

// 从 docs/posts 目录的文章配置
const articlesConfig: PostMeta[] = [
  {
    auth: "迷路的77",
    slug: "binary-search",
    title: "二分算法详解",
    date: "2026-04-06",
    excerpt:
      "深入理解二分算法的原理、实现和应用场景，包含完整的 Python 代码示例和复杂度分析。",
    url: "/blog/posts/binary-search.html",
  },
];

export async function getPosts(): Promise<PostMeta[]> {
  return articlesConfig;
}

export async function getPostBySlug(slug: string): Promise<PostMeta | null> {
  return articlesConfig.find((post) => post.slug === slug) || null;
}
