import "./App.css";
import {Layout} from "antd";
import NavHeader from "./components/NavHeader";
import HomeRouter from "./router/HomerRouter";
import {useState, useEffect} from "react";
import LoginFrom from "./components/LoginFrom";
import {whoAmI} from "./api/loign";
import {useDispatch} from "react-redux";
import {initUserInfo,} from "./redux/userSlice";
import {useNavigate} from "react-router-dom";
import {logout} from "./untils/common"

const {Header, Footer, Content} = Layout;

function App() {
    const [isOpenModal, setOpenModal] = useState(false);

    const history = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        whoAmI().then((result) => {
            if (result.code === 200) {
                dispatch(initUserInfo({urser: result.message.token}));
                setOpenModal(false);
            } else {
                logout()
            }
        });
    }, [dispatch, history]);

    return (
        <div>
            <div id="login-modal">
            </div>
            <div className="App">
                <Layout id="layout">
                    <Header className="header">
                        <NavHeader></NavHeader>
                    </Header>
                    <Content className="content">
                        <HomeRouter></HomeRouter>
                    </Content>
                    {/*<Footer className="footer">Footer</Footer>*/}
                </Layout>
            </div>
        </div>

    );
}

export default App;
