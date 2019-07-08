// const faker = require('faker');

// var user = {
//   id: 0,
//   name: faker.name.firstName(),
//   photoUrl: faker.image.cats()
// };

// const setUser = updatedUser => {
//   console.log('update user called:', updatedUser);
//   return (user = {
//     id: updatedUser.id,
//     name: updatedUser.name,
//     photoUrl: updatedUser.photoUrl
//   });
// };

// const getUser = () => {
//   console.log('USER TO SCREEN:', user);
//   return user;
// };

// module.exports = { setUser, getUser };

import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk';

export default createStore(rootReducer, compose(applyMiddleware(thunk)));
