# Meditation Timer ⏳ React Native Application

> A user logs in through google oAuth where a personal and configurable profile loads with views related to the meditation session timer, session tracking calendar, profile. ⏲

```haskell
react-native
react-navigation
expo
Google 0Auth2

({Secondary Packages})
react-native-numeric-input

```

---

## Resources

[Trello Board](https://trello.com/b/mEUYefim/med-timer-native-app)

[Redux](https://redux.js.org/basics/usage-with-react)

[Jest R/N Testing 🤹‍](https://jestjs.io/docs/en/tutorial-react-native)

Google Auth object:

```js
  user: {
    email: string,
    id: string,
    givenName: string,
    familyName: string,
    photo: string, // url
    name: string // full name
  }
```

---

### TODO

[] Login route always passing props to the profile route - signedIn toggling faulty

[] Timer saving total time elapsed in state and sending to the database - automatically updates profile

[] Styling for all components (esp Profile signedIn)

![Basic Timer Dev Layout](./assets/images/wireframBasic.png 'Basic Timer Dev Layout')

---
