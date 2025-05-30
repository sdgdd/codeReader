import "./App.css";
import {Layout} from "antd";
import NavHeader from "./components/NavHeader";
import HomeRouter from "./router/HomerRouter";
import {useEffect} from "react";
import {whoAmI} from "./api/loign";
import {useDispatch} from "react-redux";
import {initUserInfo,} from "./redux/userSlice";
import {useNavigate} from "react-router-dom";
import {logout} from "./untils/common"


const {Header, Content} = Layout;

function App() {

    const history = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        whoAmI().then((result) => {
            if (result.code === 200) {
                dispatch(initUserInfo({urser: result.message.token}));
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
                    <NavHeader></NavHeader>
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
