import marks from '../img/portal.png';
import '../css/App.css';
import ReactRouterDom, { BrowserRouter, Switch, Route, Link} from "react-router-dom";
import Main from '../view/Content'

const Portal = () =>{
    return (
        <>
        <div className="Portal">
            <BrowserRouter>
                <div><img src={marks}/></div>
                <Link to={"/login"}>로그인</Link>
                <Link to={"/main"}>메인</Link>
                <Switch>
                <Route path="/login"   element={<Main/>}/>
                <Route path="/main"    element={<Main/>}/>
                </Switch>
            </BrowserRouter>
        </div>
        </>
    )
}

export default Portal;