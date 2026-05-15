export type TTask = {
    id: string;
    name: string;
    completed: boolean;
    createdAt: string;
};

export type TApiResult<T> =
  | { success: true; data: T }
  | { success: false; error: string };
