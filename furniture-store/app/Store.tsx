import { create } from "Zustand";

type FavoriteStore = {
  favorited: boolean;
  toggleTrue: ()=> void
  toggleFalse: ()=> void
};

export const useFavoritedStore = create<FavoriteStore>((set) => ({
    favorited: false,
  toggleTrue: () => {
    set({favorited: true})
  },
  toggleFalse: () => {
    set({favorited: false})
  },

}));
