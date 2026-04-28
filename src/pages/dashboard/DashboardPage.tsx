import { Button, Layout, Space, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/auth'
import './DashboardPage.scss'

function DashboardPage() {
  const { userName, logout } = useAuthStore()
  const navigate = useNavigate()

  return (
    <Layout className="dashboard-layout">
      <div className="dashboard-card">
        <Typography.Title level={2}>登录后的页面</Typography.Title>
        <Typography.Paragraph>
          当前用户：<strong>{userName ?? '未命名用户'}</strong>
        </Typography.Paragraph>
        <Typography.Paragraph>
          这里是一个独立的登录后页面示例，你可以在这里继续扩展首页、菜单、权限和接口逻辑。
        </Typography.Paragraph>
        <Space>
          <Button
            type="primary"
            onClick={() => {
              logout()
              navigate('/', { replace: true })
            }}
          >
            退出登录
          </Button>
          <Button onClick={() => navigate('/', { replace: true })}>返回登录页</Button>
        </Space>
      </div>
    </Layout>
  )
}

export default DashboardPage
