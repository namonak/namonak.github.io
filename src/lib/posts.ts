export interface PostEntry {
  id: string;
  data: {
    publishedAt: Date;
    category: string;
    tags: readonly string[];
    draft?: boolean;
  };
}

export function getPublishedPosts<T extends PostEntry>(entries: readonly T[]): T[] {
  return entries
    .filter((entry) => entry.data.draft !== true)
    .toSorted(
      (left, right) =>
        right.data.publishedAt.getTime() - left.data.publishedAt.getTime(),
    );
}

export function getPostsByCategory<T extends PostEntry>(
  entries: readonly T[],
  category: string,
): T[] {
  return getPublishedPosts(entries).filter(
    (entry) => entry.data.category === category,
  );
}

export function getPostsByTag<T extends PostEntry>(
  entries: readonly T[],
  tag: string,
): T[] {
  return getPublishedPosts(entries).filter((entry) =>
    entry.data.tags.includes(tag),
  );
}

export function getAdjacentPosts<T extends PostEntry>(
  posts: readonly T[],
  id: string,
): { previous: T | null; next: T | null } {
  const index = posts.findIndex((post) => post.id === id);

  return {
    previous: index > 0 ? posts[index - 1] : null,
    next: index >= 0 && index < posts.length - 1 ? posts[index + 1] : null,
  };
}
