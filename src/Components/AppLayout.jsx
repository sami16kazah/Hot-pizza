import { Outlet, useNavigation } from 'react-router-dom';

import Header from './Header';
import CartOverView from '../features/cart/CartOverView';
import Loader from './Loader';

function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';

  return (
    <div className="grid h-screen  grid-rows-[auto_1fr_auto] ">
      {isLoading && <Loader></Loader>}

      <Header></Header>
      <div className=" overflow-scroll">
        <main className="mx-auto max-w-3xl  ">
          <Outlet></Outlet>
        </main>
      </div>

      <CartOverView></CartOverView>
    </div>
  );
}

export default AppLayout;
