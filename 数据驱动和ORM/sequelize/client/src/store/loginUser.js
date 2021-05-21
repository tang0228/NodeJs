import * as loginServ from "../api/login";

export default {
    namespaced: true,
    state: {
        user: null,
        isLoading: false
    },
    mutations: {
        setUser(state, payload) {
            state.user = payload;
        },
        setLoading(state, payload) {
            state.isLoading = payload;
        }
    },
    actions: {
        async login({ commit }, { loginId, loginPwd }) {
            commit("setLoading", true);
            const result = await loginServ.login(loginId, loginPwd);
            commit("setUser", result.data);
            commit("setLoading", false);
            return result.data;
        },
        loginOut({ commit }) {
            commit("setUser", null);
            loginServ.loginOut();
        },
        async whoAmI({ commit }) {
            commit("setLoading", true);
            try {
                const result = await loginServ.whoAmI();
                commit("setUser", result);
            } catch {
                commit("setUser", null);
            }
            commit("setLoading", false);
        }
    }
}