import axios from "axios";

// 请求时，如果有token，在请求时携带在请求头
// 响应时，如果有token，浏览器保存在localstorage中
// 响应时，如果响应消息码是403，（token失效），删除本地token
export default function () {
    // 请求时，如果有token，在请求时携带在请求头
    const token = localStorage.getItem("token");
    let ins = axios;
    if (token) {
        ins = axios.create({
            headers: {
                authorization: "bearer " + token,
            }
        })
    }

    ins.interceptors.response.use(resp => {
        // 响应时，如果有token，浏览器保存在localstorage中
        if (resp.headers.authorization) {
            localStorage.setItem("token", resp.headers.authorization)
        }
        return resp;
    }, err => {
        // 响应时，如果响应消息码是403，（token失效），删除本地token
        if (err.response.status === 403) {
            localStorage.removeItem("token");
        }
        return Promise.reject(err)
    });
    return ins;
}