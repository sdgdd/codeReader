import "./App.css";
import { Layout } from "antd";
import NavHeader from "./components/NavHeader";
import HomeRouter from "./router/HomerRouter";
import { useState, useEffect } from "react";
import LoginFrom from "./components/LoginFrom";
import { whoAmI } from "./api/loign";
import { useDispatch } from "react-redux";
import { initUserInfo } from "./redux/userSlice";
import { useNavigate } from "react-router-dom";
const { Header, Footer, Content } = Layout;

function App() {
  const [isOpenModal, setOpenModal] = useState(false);

  const history = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    whoAmI().then((result) => {
      if (result.code === 200) {
        dispatch(initUserInfo({ urser: result.message.token }));
        setOpenModal(false);
      }
    });
  }, [dispatch, history]);

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
      {
        isOpenModal && <LoginFrom
          setOpenModal={setOpenModal}
          isOpenModal={isOpenModal}
        />
      }
    </div>
  );
}

export default App;
