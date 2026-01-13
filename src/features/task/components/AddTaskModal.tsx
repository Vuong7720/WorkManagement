import React from 'react';
import { Modal, Form, Input, Select } from 'antd';
import type { ITask, Priority } from '../../../types';

interface AddTaskModalProps {
    open: boolean;
    onCancel: () => void;
    onSuccess: (values: any) => void;
}

export const AddTaskModal: React.FC<AddTaskModalProps> = ({ open, onCancel, onSuccess }) => {
    const [form] = Form.useForm();

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            onSuccess(values); // Truyền dữ liệu ngược lại cho Cha
            form.resetFields(); // Xóa trắng form sau khi xong
        } catch (info) {
            console.log('Validate Failed:', info);
        }
    };

    return (
        <Modal
            title="Thêm công việc mới"
            open={open}
            onOk={handleOk}
            onCancel={onCancel}
            okText="Lưu"
            cancelText="Hủy"
            destroyOnClose // Tự động xóa dữ liệu form khi đóng modal
        >
            <Form form={form} layout="vertical" initialValues={{ priority: 'Medium' }}>
                <Form.Item
                    name="title"
                    label="Tiêu đề"
                    rules={[{ required: true, message: 'Vui lòng nhập tiêu đề!' }]}
                >
                    <Input placeholder="Tên công việc..." />
                </Form.Item>

                <Form.Item name="description" label="Mô tả">
                    <Input.TextArea rows={3} placeholder="Mô tả chi tiết..." />
                </Form.Item>

                <Form.Item name="priority" label="Mức độ ưu tiên">
                    <Select options={[
                        { value: 'High', label: 'High' },
                        { value: 'Medium', label: 'Medium' },
                        { value: 'Low', label: 'Low' },
                    ]} />
                </Form.Item>
            </Form>
        </Modal>
    );
};