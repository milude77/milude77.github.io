export interface PostMeta {
  auth: string;
  slug: string;
  title: string;
  date: string;
  url: string;
  tag: string[];
  type:string;
  imgUrl?: string;
}

import theContainerWithTheMostWaterCapacity from "@/assets/theContainerWithTheMostWaterCapacity.jpg"
import rainwatertrap from "@/assets/rainwatertrap.jpg"

const articlesConfig: PostMeta[] = [
  {
    auth: "一只迷路的77",
    slug: "algorithm-twoPointers-receiveRainWater",
    title: "接雨水",
    date: "2026-04-06",
    url: "/blog/posts/algorithm/twoPointers/receiveRainWater.html",
    type:'算法',
    imgUrl: rainwatertrap,
    tag: ["双指针"],
  },
  {
    auth: "一只迷路的77",
    slug: "algorithm-twoPointers-removeDuplicates",
    title: "删除重复元素",
    date: "2026-04-06",
    tag: ["双指针"],
    type:'算法',
    url: "/blog/posts/algorithm/twoPointers/removeDuplicates.html",
    
  },
  {
    auth: "一只迷路的77",
    slug: "algorithm-twoPointers-reverseLinkedList",
    title: "盛水最多的容器",
    date: "2026-04-06",
    tag: ["双指针", "贪心"],
    type:'算法',
    url: "/blog/posts/algorithm/greedy/theContainerWithTheMostWaterCapacity.html",
    imgUrl: theContainerWithTheMostWaterCapacity
  },
  {
    auth: "一只迷路的77",
    slug: "logger-2026072301",
    title: "解决vue项目打包后发布到github pages白屏的问题",
    date: "2026-04-06",
    tag: ["项目问题"],
    type:'日志',
    url: "/blog/posts/logger/2026072301.html",
  }
];

export async function getPosts(): Promise<PostMeta[]> {
  return articlesConfig;
}

export async function getPostBySlug(slug: string): Promise<PostMeta | null> {
  return articlesConfig.find((post) => post.slug === slug) || null;
}
