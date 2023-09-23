import axios from "axios";
//用于传输混合文件
export function upload(path, userForm) {
  const params = new FormData();
  for (const key in userForm) {
    if (Object.hasOwnProperty.call(userForm, key)) {
      params.append(key, userForm[key]);
    }
  }
 return axios
    .post(path, params, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => res.data);
}
