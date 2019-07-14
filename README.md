# Meditation Timer ⏳ React Native Application

> A user logs in through google oAuth where a personal profile loads with views related to the meditation session timer, session tracking, and chat board for updates and itneraction. ⏲

```haskell
react-native
react-navigation
react-native-elements
expo
Google 0Auth2
react-redux
stream-chat

({Secondary Packages})
react-native-numeric-input
react-native-google-signin
react-native-sound

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

[x] Login route always passing props to the profile route - Redux

[x] Timer saving total time elapsed in state and sending to the database - automatically updates profile

[x] Styling for all components (esp Profile signedIn)

![Basic Timer Dev Layout](./assets/images/wireframBasic.png 'Basic Timer Dev Layout')

![Basic Session Dev Layout](./assets/images/wireframeSessions.png 'Basic Sessions Dev Layout')

---
