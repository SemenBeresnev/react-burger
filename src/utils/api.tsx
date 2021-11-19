import { getCookie, setCookie } from "./funcs";
import { apiURL } from "./constants";
import { TForm } from "./types";

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

export const checkResponse = (res: Response) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const fetchWithRefresh = async (url: string, options: RequestInit = {}) => {
    try {
        const res = await fetch(url, options);
        return await checkResponse(res);
    } catch (err: any) {
        if (err.message === "jwt expired") {
            const refreshData = await refreshToken();
            localStorage.setItem("refreshToken", refreshData.refreshToken);
            setCookie("token", refreshData.accessToken);
            (options.headers as { [key: string]: string }).authorization = refreshData.accessToken;
            const res = await fetch(url, options);
            return await checkResponse(res);
        } else {
            return Promise.reject(err);
        }
    }
};

export const patchUser = async (form: TForm) => {
    const token = getCookie('token')
    if (!token) {
        return { user: null };
    }
    return await fetchWithRefresh(`${apiURL}/auth/user`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            'authorization': token
        },
        body: JSON.stringify(form)
    })
}

export const getUser = async () => {
    const token = getCookie('token')
    if (!token) {
        return { user: null };
    }

    return await fetchWithRefresh(`${apiURL}/auth/user`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'authorization': token
        }
    })
}

export const postOrderUser = async (ids: Array<string>) => {
    const token = getCookie('token')
    if (!token) {
        return { user: null };
    }

    return await fetchWithRefresh(`${apiURL}/orders`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'authorization': token
        },
        body: JSON.stringify({ ingredients: ids })
    })
}
