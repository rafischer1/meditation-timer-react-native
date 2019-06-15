const authid = "";
const name = "";

const setAuthId = id => (authid = id);
const setName = userName => (name = userName);
const getAuthId = () => authid;
const getName = () => name;

module.exports = {
  setAuthId,
  setName,
  getName,
  getAuthId
};
