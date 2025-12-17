import {createContext, FC, ReactNode, useContext, useState} from 'react';
export type Product = {
  id: number;
  title: string;
  description: string;
  category: string;
  poster: string;
  price: {
    mrp: number;
    sale: number;
  };
  images: string[];
  bulletPoints: string[];
};

interface IFavContext {
  items: Product[];
  updateFavorite(product: Product): void;
  isFav(product: Product): boolean;
}

const FavoriteContext = createContext<IFavContext | null>(null);

interface Props {
  children: ReactNode;
}

const FavProductProvider: FC<Props> = ({children}) => {
  const [items, setItems] = useState<Product[]>([]);

  const updateFavorite = (product: Product) => {
    const index = items.findIndex(({id}) => id === product.id);

    if (index === -1) {
      // there is no product inside the items (or the product is fresh)
      // so we can add this to the fav list
      setItems([...items, product]);
    } else {
      // this product is already in the fav list
      // we want to remove it from the list
      setItems(old => old.filter(({id}) => id !== product.id));
    }
  };

  const isFav = (product: Product) => {
    const foundItem = items.find(item => item.id === product.id);
    return foundItem ? true : false;
  };

  return (
    <FavoriteContext.Provider
      value={{
        items,
        updateFavorite,
        isFav,
      }}>
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavorite = () => useContext(FavoriteContext);
export default FavProductProvider;
