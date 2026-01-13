import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
    Layout,
    Menu,
    Button,
    theme,
    Avatar,
    Space,
    Typography
} from 'antd';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    ProjectOutlined,
    CheckSquareOutlined,
    UserOutlined,
    DashboardOutlined,
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <Layout style={{ minHeight: '100vh' }}>
            {/* 1. Sidebar bên trái */}
            <Sider trigger={null} collapsible collapsed={collapsed} theme="light" shadow-sm>
                <div style={{ height: 32, margin: 16, background: 'rgba(0, 0, 0, 0.05)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <b style={{ color: '#1677ff' }}>{!collapsed ? 'WORK MGMT' : 'W'}</b>
                </div>
                <Menu
                    theme="light"
                    mode="inline"
                    selectedKeys={[location.pathname]} // Tự động active menu theo URL
                    items={[
                        { key: '/', icon: <DashboardOutlined />, label: <Link to="/">Dashboard</Link> },
                        { key: '/projects', icon: <ProjectOutlined />, label: <Link to="/projects">Dự án</Link> },
                        { key: '/tasks', icon: <CheckSquareOutlined />, label: <Link to="/tasks">Công việc</Link> },
                    ]}
                />
            </Sider>

            <Layout>
                {/* 2. Header bên trên */}
                <Header style={{ padding: 0, background: colorBgContainer, display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingRight: 24 }}>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{ fontSize: '16px', width: 64, height: 64 }}
                    />
                    <Space size="middle">
                        <Typography.Text strong>Admin User</Typography.Text>
                        <Avatar icon={<UserOutlined />} />
                    </Space>
                </Header>

                {/* 3. Vùng nội dung thay đổi (Children) */}
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                        overflow: 'initial'
                    }}
                >
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
};

export default MainLayout;