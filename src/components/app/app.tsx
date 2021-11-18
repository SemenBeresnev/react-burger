import {useEffect} from 'react';
import {Switch, Route, useLocation, useHistory, } from 'react-router-dom';
import AppHeader from '../app-header/app-header';
import IngredientDetails from "../ingredient-details/ingredient-details";
import {Home, Login, Register, ForgotPassword, ResetPassword, Profile, NotFound} from "../../pages";
import {ProtectedRoute} from "../../hocs/protected-route";
import { TLocationState } from '../../utils/types';
import { useDispatch } from '../../services/types/types';
import {getIngredients} from "../../services/actions/burger-ingredients";
import {FeedDetails} from "../feed-details/feed-details";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { Feed } from '../../pages/feed/feed';


function App() {
  const history = useHistory();
  const location = useLocation<TLocationState>();
  let background = history.action === 'PUSH' && location.state && location.state.background;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <>
      <AppHeader />
      <main>
        <Switch location={background || location}>
          <Route path="/" exact={true}>
            <Home/>
          </Route>
          <Route path="/login" exact={true}>
            <Login/>
          </Route>
            <Route path={"/register"} exact={true}>
          <Register/>
            </Route>
          <Route path={"/forgot-password"} exact={true}>
            <ForgotPassword/>
          </Route>
            <Route path={"/reset-password"} exact={true}>
          <ResetPassword/>
            </Route>
          <Route path={"/ingredients/:id"} exact={true}>
            <IngredientDetails />
          </Route>
          <ProtectedRoute path={"/profile"} exact={true}>
            <Profile/>
          </ProtectedRoute>
          <ProtectedRoute path={"/profile/orders/:id"} exact={true}>
            <FeedDetails/>
          </ProtectedRoute>
          <ProtectedRoute path={"/profile"}>
            <Profile/>
          </ProtectedRoute>
          <Route path="/feed" exact={true}>
            <Feed/>
          </Route>
          <Route path={`/feed/:id`} exact={true}>
            <FeedDetails/>
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
        {background &&
        (<>
          <Route path={'/ingredients/:id'}
                 children={<Modal onClose={() => history.goBack()}><IngredientDetails/></Modal>}/>
          <Route path={'/sendOrder'}
                 children={<Modal onClose={() => history.goBack()}><OrderDetails/></Modal>}/>
          <Route path={'/feed/:id'}
                 children={<Modal onClose={() => history.goBack()}><FeedDetails/></Modal>} />
          <Route path={'/profile/orders/:id'}
                 children={<Modal onClose={() => history.goBack()}><FeedDetails/></Modal>} />
        </>)
        }



      </main>  
    </>
  );
}

export default App;