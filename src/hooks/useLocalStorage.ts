export function LocalStorage(key: string, value?: any, type = "get") {
    if (type === 'get') {
        const item: any = localStorage.getItem(key);
        if (key === "token" || key === "authorization")
            return item;
        return JSON.parse(item);
    }


    else {
        JSON.stringify(localStorage.setItem(key, value));
    }

}
export function useRemoveLocalStorage(key: string) {
    localStorage.removeItem(key);
}