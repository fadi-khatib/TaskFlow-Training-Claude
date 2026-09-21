interface HasCreatedAt {
  created_at: string;
}

export function sortTasksByCreatedDate<T extends HasCreatedAt>(tasks: T[]): T[] {
  return [...tasks].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  );
}
