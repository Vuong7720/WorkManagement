import React, { useState } from 'react';
import {
    Table,
    Tag,
    Space,
    Button,
    Input,
    Card,
    Typography,
    Select
} from 'antd';
import {
    PlusOutlined,
    SearchOutlined,
    EditOutlined,
    DeleteOutlined
} from '@ant-design/icons';
import { useTaskStore } from '../store/useTaskStore';
import type { ITask } from '../types';
import type { ColumnsType } from 'antd/es/table';
import { AddTaskModal } from '../features/task/components/AddTaskModal';
import { v4 as uuidv4 } from 'uuid';

const { Title } = Typography;

export const Tasks: React.FC = () => {
    // 1. Lấy dữ liệu và hành động từ Zustand Store
    const { tasks, addTask } = useTaskStore();
    const [searchText, setSearchText] = useState('');

    const { updateTaskStatus } = useTaskStore();

    const [isModalOpen, setIsModalOpen] = useState(false);


    const handleCreateTask = (values: any) => {
        const newTask: ITask = {
            id: uuidv4(), // Tạo ID ngẫu nhiên
            ...values,
            status: 'TODO', // Mặc định khi tạo mới
            assignees: []
        };

        addTask(newTask); // Lưu vào Store
        setIsModalOpen(false); // Đóng Modal
    };

    // 2. Định nghĩa các cột cho Table (Cấu hình của Ant Design)
    const columns: ColumnsType<ITask> = [
        {
            title: 'Tiêu đề',
            dataIndex: 'title',
            key: 'title',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status, record) => (
                <Select
                    value={status}
                    style={{ width: 120 }}
                    onChange={(newStatus) => updateTaskStatus(record.id, newStatus)} // Giao tiếp component qua Action
                    options={[
                        { value: 'TODO', label: 'To Do' },
                        { value: 'IN_PROGRESS', label: 'In Progress' },
                        { value: 'DONE', label: 'Done' },
                    ]}
                />
            ),
        },
        {
            title: 'Mức độ',
            dataIndex: 'priority',
            key: 'priority',
            render: (priority) => {
                const color = priority === 'High' ? 'red' : priority === 'Medium' ? 'orange' : 'blue';
                return <Tag color={color} variant="outlined">{priority}</Tag>;
            },
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button type="text" icon={<EditOutlined />} onClick={() => console.log('Edit', record.id)} />
                    <Button type="text" danger icon={<DeleteOutlined />} />
                </Space>
            ),
        },
    ];

    // 3. Logic tìm kiếm đơn giản
    const filteredTasks = tasks.filter(task =>
        task.title.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <Title level={3}>Danh sách công việc</Title>
                <Button type="primary" icon={<PlusOutlined />}>
                    Thêm công việc
                </Button>
            </div>

            <Card>
                <div style={{ marginBottom: 16 }}>
                    <Input
                        placeholder="Tìm kiếm công việc..."
                        prefix={<SearchOutlined />}
                        style={{ width: 300 }}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                </div>

                <Table
                    columns={columns}
                    dataSource={filteredTasks}
                    rowKey="id"
                    pagination={{ pageSize: 5 }}
                />
            </Card>
        </div>
    );
};