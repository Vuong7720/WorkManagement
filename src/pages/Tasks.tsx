import React, { useState } from 'react';
import {
    Table,
    Tag,
    Space,
    Button,
    Input,
    Card,
    Typography
} from 'antd';
import {
    PlusOutlined,
    SearchOutlined,
    EditOutlined,
    DeleteOutlined
} from '@ant-design/icons';
import { useTaskStore } from '../store/useTaskStore';
import type { ITask } from '../types';

const { Title } = Typography;

export const Tasks: React.FC = () => {
    // 1. Lấy dữ liệu và hành động từ Zustand Store
    const { tasks } = useTaskStore();
    const [searchText, setSearchText] = useState('');

    // 2. Định nghĩa các cột cho Table (Cấu hình của Ant Design)
    const columns = [
        {
            title: 'Tiêu đề',
            dataIndex: 'title',
            key: 'title',
            render: (text: string) => <a>{text}</a>,
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => {
                let color = status === 'DONE' ? 'green' : status === 'IN_PROGRESS' ? 'blue' : 'volcano';
                return <Tag color={color}>{status.replace('_', ' ')}</Tag>;
            },
        },
        {
            title: 'Mức độ',
            dataIndex: 'priority',
            key: 'priority',
            render: (priority: string) => {
                const color = priority === 'High' ? 'red' : priority === 'Medium' ? 'orange' : 'blue';
                return <Tag color={color} variant="outlined">{priority}</Tag>;
            },
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (_: any, record: ITask) => (
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