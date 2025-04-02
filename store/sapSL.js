const axios = require("axios");
const config = require("../config");
const {
  externalSources: { sapServer },
} = config;

const origin = {
  source: "sapSL",
  type: "external",
};

let headers = {
  Cookie: "",
};

async function findAll(entity) {
  try {
    let response = await axios.get(`${sapServer}/${entity}?$top=10`, {
      headers,
    });

    console.log(response.data);
    return response.data;
  } catch (error) {
    //console.log(error);
    throw error.message;
  }
}

async function login(data) {
  console.log(data.username);

  try {
    if (
      data.username == undefined ||
      data.password == undefined ||
      data.companyDB == undefined
    ) {
      throw new Error("Empty fields, check headers");
    }

    const loginData = {
      CompanyDB: data.companyDB,
      Password: data.password,
      UserName: data.username,
    };

    let response = await axios.post(
      `${sapServer}/Login`,
      JSON.stringify(loginData)
    );

    headers.Cookie = `B1SESSION=${response.data["SessionId"]}`;

    let userData = await axios.get(
      `${sapServer}/Users?$select=UserCode,UserName,eMail,LastLoginTime&$filter=UserCode%20eq%20'${data.username}'`,
      {
        headers,
      }
    );

    return {
      ...response.data,
      Cookie: headers.Cookie,
      userData: {
        ...userData.data.value[0],
        companyDB: data.companyDB,
      },
    };
    //return response.data;
  } catch (error) {
    console.log(error);

    console.log(error.response.data.error);

    if (error.response.data.error.message.value) {
      throw error.response.data.error.message.value;
    } else {
      throw error.message;
    }
  }
}

async function logout() {
  try {
    axios
      .post(`${sapServer}/Logout`, {
        headers,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    headers.Cookie = "";
  } catch (error) {
    throw error.response.data;
  }
}

module.exports = {
  origin,
  findAll,
  login,
  logout,
  cookies: headers.Cookie,
};
