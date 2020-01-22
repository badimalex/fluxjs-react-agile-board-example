import { Layout } from 'antd';

const { Header, Content, Footer, Sider } = Layout;

function BasicLayout(props) {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ margin: '24px 16px 0' }}>
        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>{props.children}</div>
      </Content>
    </Layout>
  );
}

export default BasicLayout;
