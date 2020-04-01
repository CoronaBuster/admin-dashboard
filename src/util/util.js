export const isDesktop = () => {
    return window.innerWidth > 1024;
};

export function isLoggedin() {
    return localStorage.isLoggedIn === "true"
}

export const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
};


export const obj2QueryParamSerialize = (obj) => Object.keys(obj).map(x => `${x}=${encodeURIComponent(obj[x])}`).join("&");


export const delayResponse = (response, timeout) => new Promise((resolve, reject) => setTimeout(() => resolve(response), timeout))