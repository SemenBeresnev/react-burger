import {getCookie, setCookie} from "./funcs";
import {apiURL} from "./constants";

export const sendData = async (options) => {
    return await fetch(options.url, {
        method: options.method,
        headers: options.headers,
        body: JSON.stringify(options.body)
    })
}

export const getData = async (url) => {
    return await fetch(url)
}

export const refreshToken = () => {
    return fetch(`${apiURL}/auth/token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            token: localStorage.getItem("refreshToken"),
        }),
    }).then(checkResponse);
};

export const checkResponse = (res) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const fetchWithRefresh = async (url, options) => {
    try {
        const res = await fetch(url, options);
        return await checkResponse(res);
    } catch (err) {
        if (err.message === "jwt expired") {
            const refreshData = await refreshToken(); //обновляем токен
            localStorage.setItem("refreshToken", refreshData.refreshToken);
            setCookie("token", refreshData.accessToken);
            options.headers.authorization = refreshData.accessToken;
            const res = await fetch(url, options); //повторяем запрос
            return await checkResponse(res);
        } else {
            return Promise.reject(err);
        }
    }
};

export const patchUser = async (form) => {
    return await fetchWithRefresh(`${apiURL}/auth/user`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            'authorization': getCookie('token')
        },
        body: JSON.stringify(form)
    })
}

export const getUser = async () => {
    return await fetchWithRefresh(`${apiURL}/auth/user`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'authorization': getCookie('token')
        }
    })
}
