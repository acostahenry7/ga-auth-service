let table = "users";

module.exports = (injectedStore) => {
  let store;
  console.log(injectedStore);
  if (!injectedStore) {
    store = dummy;
  } else {
    store = injectedStore;
  }

  async function findAll() {
    if (store.origin?.type == "external") {
      switch (store.origin.source) {
        case "sapSL":
          table = "Users";
          break;

        default:
          "users";
          break;
      }

      try {
        let data = await store.findAll("Users");
        console.log("data", data);
        return data;
      } catch (error) {
        //console.log("error", error);
        throw error;
      }
    } else {
      await store.findAll("users");
    }
  }

  async function login(data) {
    try {
      const session = await store.login(data);
      console.log(store.cookies);

      return session;
    } catch (error) {
      throw error;
    }
  }

  async function logout() {
    try {
      await store.logout();
    } catch (error) {
      throw error;
    }
  }

  return {
    findAll,
    login,
    logout,
  };
};
