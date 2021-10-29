import axios from "axios";
// import jwt from "jsonwebtoken";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class FrienderApi {
  static token = "";

    /** bluerprint for making request 
     * accepts endpoint for request, data, method(default to get)
     * returns response wrapped in try/catch
    */
  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${FrienderApi.token}` };
    const params = (method === "get")
      ? data
      : {};

    console.log({ url, data, params, headers, method })
    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }


  /** Get the current user. */

  static async getCurrentUser(id) {
    let res = await this.request(`users/${id}`);
    return res.user;
  }

  /** Get token for login from username, password. */

  static async login(data) {
    let res = await this.request(`auth/token`, data, "post");
    return res.token;
  }

  static async getUsers() {
      const res = await this.request('users');
      console.log("res.users is ", res.users);
      return res.users;
  }








  // static async checkUserCredentials(username, password) {
  //   const credentials = {
  //     username,
  //     password
  //   };
  //   console.log({credentials})
  //   const res = await this.request('auth/token', credentials, 'post');
  //   console.log("res in check user credentials", res);
  //   return res.token;
  // }

  // /** Accepts token string and returns user data based on that token
  //  * accepts token
  //  * returns user data like: { username, firstName, lastName, email, isAdmin }
  //  * returns null if token payload is null (on initial render)
  //  * throws error if not successful
  //  * */
  // static async getUserByToken(token) {
  //   console.log("token in get user by token", token)
  //   const payload = jwt.decode(token);
  //   console.log("payload in getuserbytoken", payload)

  //   if (payload === null) {
  //     return null;
  //   } else {
  //     const res = await this.request(`users/${payload.username}`);
  //     return res.user;
  //   };
  // }

  /** Registers user into database
   * accepts userdata {username, password}
   * returns token string on successful registration
   * throws error if not successful
   * */
  static async registerUser(userData) {

    const res = await this.request(`auth/register`, userData, 'post');
    console.log("register res: ", res);
    return res.token;

  }
}

export default FrienderApi;