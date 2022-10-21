import axios from "axios";
import jwtDecode from "jwt-decode";

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

  await axios.post("http://localhost:3000/api/auth", user);
};
