export class ModelButton {
    STORAGE_KEY = "cart";

    addObjToLocalStorage(obj) {
        const hasDataInStorage = localStorage.getItem(this.STORAGE_KEY);
        if (!hasDataInStorage) {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify([obj]));
        } else {
            const dataFromStorage = localStorage.getItem(this.STORAGE_KEY);
            const parsedDataFromStorage = JSON.parse(dataFromStorage);
            const updatedData = [...parsedDataFromStorage, obj];
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedData));
        }
    }

    removeObjFromLocalStorage({ id }) {
        const dataFromStorage = localStorage.getItem(this.STORAGE_KEY);
        const parsedDataFromStorage = JSON.parse(dataFromStorage);
        if (parsedDataFromStorage.length > 1) {
            const updatedData = parsedDataFromStorage.filter(
                (product) => product.id !== id
            );
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedData));
        } else {
            localStorage.removeItem(this.STORAGE_KEY);
        }
    }
}
