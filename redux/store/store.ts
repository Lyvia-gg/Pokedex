import { configureStore } from '@reduxjs/toolkit';
import reducer from '@/redux/reducers/pokemonReducer';
// import { composeWithDevTools } from 'redux-devtools-extension'

// export const store: Store<PokemonState, PokemonAction> & {
//   dispatch: DispatchType;
// } = createStore(reducer, applyMiddleware(thunk));

export const store = configureStore({
  reducer: reducer,
  // DevTools sont activés par défaut en dev
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false, // 👈 désactive le check d’immutabilité
      serializableCheck: false, // (optionnel) si tu as aussi des erreurs de serializabilité
    }),
});
