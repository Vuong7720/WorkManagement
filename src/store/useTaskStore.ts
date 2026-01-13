import { create } from 'zustand';
import type { ITask } from '../types';

interface TaskState {
    tasks: ITask[];
    // Action để thêm task
    addTask: (task: ITask) => void;
    // Action để cập nhật trạng thái task (kéo thả Kanban sau này)
    updateTaskStatus: (taskId: string, status: ITask['status']) => void;
}

export const useTaskStore = create<TaskState>((set) => ({
    tasks: [
        { id: '1', title: 'Học React + TS', description: 'Làm dự án quản lý công việc', status: 'IN_PROGRESS', priority: 'High', assignees: [] },
        { id: '2', title: 'Thiết kế Database', description: 'Sử dụng SQL Server', status: 'TODO', priority: 'Medium', assignees: [] },
    ],
    addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
    updateTaskStatus: (taskId, status) => set((state) => ({
        tasks: state.tasks.map(t => t.id === taskId ? { ...t, status } : t)
    })),
}));