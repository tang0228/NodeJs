import ins from "./request";
export async function login(loginId, loginPwd) {
    const resp =  await ins().post("/api/admin/login", {
        loginId,
        loginPwd
    });
    return resp.data;
};

export async function loginOut() {
    localStorage.removeItem("token");
};

export async function whoAmI() {
    const resp = await ins().get("/api/admin/whoami");
    return resp.data;
}

