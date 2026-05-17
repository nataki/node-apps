import type { TTask } from '../types';
import { request, jsonInit } from './client';

const url = '/api/v1/tasks';

export const taskKeys = {
    all: ['tasks'] as const,
    detail: (id: string) => ['tasks', id] as const,
};

export const fetchAllTasks = (): Promise<TTask[]> =>
    request(url);

export const fetchTask = (id: string): Promise<TTask> =>
    request(`${url}/${id}`);

export const addTask = (name: string): Promise<TTask> =>
    request(url, jsonInit('POST', { name }));

export const updateTask = (id: string, payload: Partial<{ name: string; completed: boolean }>): Promise<TTask> =>
    request(`${url}/${id}`, jsonInit('PATCH', payload));

export const deleteTask = async (id: string): Promise<void> => {
    await request(`${url}/${id}`, { method: 'DELETE' });
};
