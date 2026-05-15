export type Task = {
    id: string;
    name: string;
    completed: boolean;
    createdAt: string;
};

export type ApiResult<T> =
  | { success: true; data: T }
  | { success: false; error: string };
