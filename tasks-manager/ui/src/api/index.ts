import type { Task, ApiResult } from '../types';

const url = '/api/v1/tasks';

export const fetchAllTasks = async (): Promise<ApiResult<Task[]>> => {
    try {
        const response = await fetch(url);
        if (!response.ok) return { success: false, error: `Server error: ${response.status}` };
        const { data } = await response.json();
        return { success: true, data };
    } catch {
        return { success: false, error: 'Network error — could not reach the server' };
    }
};

export const addTask = async (name: string): Promise<ApiResult<Task>> => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify({ name }),
        });
        if (!response.ok) return { success: false, error: `Server error: ${response.status}` };
        const { data } = await response.json();
        return { success: true, data };
    } catch {
        return { success: false, error: 'Network error — could not reach the server' };
    }
};
