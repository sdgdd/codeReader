import "./App.css";
import { Layout } from "antd";
import NavHeader from "./components/NavHeader";
import HomeRouter from "./router/HomerRouter";
import { useState } from "react";
import LoginFrom from "./components/LoginFrom";

const { Header, Footer, Content } = Layout;

function App() {
  const [isOpenModal, setOpenModal] = useState(false);
  return (
    <div className="App">
      <Layout id="layout">
        <Header className="header">
          <NavHeader setOpenModal={setOpenModal}></NavHeader>
        </Header>
        <Content className="content">
          <HomeRouter></HomeRouter>
        </Content>
        <Footer className="footer">Footer</Footer>
      </Layout>
      <LoginFrom
        setOpenModal={setOpenModal}
        isOpenModal={isOpenModal}
      ></LoginFrom>
    </div>
  );
}

export default App;
