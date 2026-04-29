import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  Checkbox,
  Form,
  Input,
  Layout,
  message,
  Space,
  Typography,
} from "antd";
import { useAuthStore } from "../../store/auth";
import "./LoginPage.css";

function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const login = useAuthStore((state) => state.login);
  const token = useAuthStore((state) => state.token);
  const navigate = useNavigate();

  if (token) {
    navigate("/dashboard", { replace: true });
  }

  const onFinish = async (values: {
    username: string;
    password: string;
    remember?: boolean;
  }) => {
    try {
      setLoading(true);
      await login(values.username, values.password, Boolean(values.remember));
      message.success("登录成功");
      navigate("/dashboard", { replace: true });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "登录失败";
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout className="auth-layout">
      <div className="auth-bg" />
      <div className="auth-shell">
        <Card className="auth-card" bordered={false}>
          <Space direction="vertical" size={24} className="auth-brand">
            <div className="brand-badge">Demo Login</div>
            <div>
              <Typography.Title level={2} style={{ margin: 0 }}>
                欢迎登录11
              </Typography.Title>
              <Typography.Paragraph className="auth-subtitle">
                输入账号密码后，将跳转到登录后的页面。
              </Typography.Paragraph>
            </div>
          </Space>

          <Form
            form={form}
            layout="vertical"
            size="large"
            initialValues={{ remember: true, username: "demo" }}
            onFinish={onFinish}
          >
            <Form.Item
              label="账号"
              name="username"
              rules={[{ required: true, message: "请输入账号" }]}
            >
              <Input placeholder="请输入账号，例如 demo" />
            </Form.Item>

            <Form.Item
              label="密码"
              name="password"
              rules={[{ required: true, message: "请输入密码" }]}
            >
              <Input.Password placeholder="请输入密码" />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked">
              <Checkbox>记住我</Checkbox>
            </Form.Item>

            <Button type="primary" htmlType="submit" block loading={loading}>
              模拟登录并跳转
            </Button>
          </Form>
        </Card>
      </div>
    </Layout>
  );
}

export default LoginPage;
