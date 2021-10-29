import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * 
 */

class FrienderApi {
  static token = "";

    /** bluerprint for making requests
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

  /** Get all users as [{users}, ...] */
  static async getUsers() {
      const res = await this.request('users');
      console.log("res.users is ", res.users);
      return res.users;
  }

  /** Registers user returns token string on successful registration
   * throws error if not successful
   * 
   * userData is { username, firstName, lastName, email, photo, hobbies, interests, password}
   * */
  static async registerUser(userData) {

    const res = await this.request(`auth/register`, userData, 'post');
    console.log("register res: ", res);
    return res.token;
  }
}

export default FrienderApi;