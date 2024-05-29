import "./App.css";
import { Layout } from "antd";
import NavHeader from "./components/NavHeader";
import HomeRouter from "./router/HomerRouter";

const { Header, Footer, Content } = Layout;

function App() {
  return (
    <div className="App">
      <Layout id="layout">
        <Header hashPriority="hight" className="header">
          <NavHeader></NavHeader>
        </Header>
        <Content className="content">
          <HomeRouter></HomeRouter>
        </Content>
        <Footer className="footer">Footer</Footer>
      </Layout>
    </div>
  );
}

export default App;
