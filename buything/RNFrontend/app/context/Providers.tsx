import {FC, ReactNode} from 'react';
import AuthProvider from './AuthProvider';
import CartProvider from './CartProvider';
import FavProductProvider from './FavoriteProvider';

interface Props {
  children: ReactNode;
}

const Providers: FC<Props> = ({children}) => {
  return (
    <AuthProvider>
      <FavProductProvider>
        <CartProvider>{children}</CartProvider>
      </FavProductProvider>
    </AuthProvider>
  );
};

export default Providers;
