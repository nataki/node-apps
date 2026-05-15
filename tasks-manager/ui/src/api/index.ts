import type { TTask, TApiResult } from '../types';

const url = '/api/v1/tasks';

export const fetchAllTasks = async (): Promise<TApiResult<TTask[]>> => {
    try {
        const response = await fetch(url);
        if (!response.ok) return { success: false, error: `Server error: ${response.status}` };
        const { data } = await response.json();
        return { success: true, data };
    } catch {
        return { success: false, error: 'Network error — could not reach the server' };
    }
};

export const fetchTask = async (id: string): Promise<TApiResult<TTask>> => {
    try {
        const response = await fetch(`${url}/${id}`);
        if (!response.ok) return { success: false, error: `Server error: ${response.status}` };
        const { data } = await response.json();
        return { success: true, data };
    } catch {
        return { success: false, error: 'Network error — could not reach the server' };
    }
};

export const updateTask = async (id: string, payload: { name: string; completed: boolean }): Promise<TApiResult<TTask>> => {
    try {
        const response = await fetch(`${url}/${id}`, {
            method: 'PATCH',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });
        if (!response.ok) return { success: false, error: `Server error: ${response.status}` };
        const { data } = await response.json();
        return { success: true, data };
    } catch (e) {
        return { success: false, error: 'Network error — could not reach the server' };
    }
};

export const deleteTask = async (id: string): Promise<TApiResult<Record<string, never>>> => {
    try {
        const response = await fetch(`${url}/${id}`, { method: 'DELETE' });
        if (!response.ok) return { success: false, error: `Server error: ${response.status}` };
        return { success: true, data: {} };
    } catch {
        return { success: false, error: 'Network error — could not reach the server' };
    }
};

export const addTask = async (name: string): Promise<TApiResult<TTask>> => {
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
