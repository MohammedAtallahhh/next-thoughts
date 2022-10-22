import axios from "axios";
import jwtDecode from "jwt-decode";

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

type DecodedUser = {
  name: string;
  picture: string;
  sub: string;
};

export const createOrGetUser = async (response: any, addUser: any) => {
  const decoded: DecodedUser = jwtDecode(response.credential);

  const { sub: _id, picture: image, name: userName } = decoded;

  const user = {
    _id,
    _type: "user",
    image,
    userName,
  };

  addUser(user);

  await axios.post(`${BASE_URL}/api/auth`, user);
};
