// Định nghĩa các mức độ ưu tiên
export type Priority = 'High' | 'Medium' | 'Low';

// Định nghĩa một Task
export interface ITask {
    id: string;
    title: string;
    description: string;
    status: 'TODO' | 'IN_PROGRESS' | 'DONE';
    priority: Priority;
    assignees: IUser[];
}

export interface IUser {
    id: string;
    name: string;
    avatar: string;
}