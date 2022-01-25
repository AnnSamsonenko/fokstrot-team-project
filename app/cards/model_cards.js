export class ModelCards {
  BASE_URL =
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vTQJDUGSW4phsIvwWdxlMTUcqhoO0hRHJ8w0AirbHLcPtMRpFEx8JWykKtykGkxTQ6u5eWgYxKjt7cT/pub?output=tsv';
  STORAGE_KEY = 'cart';
  constructor() {
    this.data = [];
    this.intermediateData = [];
    this.activePageData = [];
  }

  async fetchData() {
    try {
      const response = await fetch(this.BASE_URL);
      const parsedData = await response.text();
      const formattedData = this.formatData(parsedData);
      return formattedData;
    } catch (error) {
      console.log(error.message);
    }
  }

  formatData(parsedData) {
    const d = parsedData.split('\r\n').map(line => line.split('\t'));
    const keys = d.shift();
    const data = d.map(arr =>
      arr.reduce((obj, prop, i) => {
        obj[keys[i]] = prop;
        obj['isInCart'] = 0;
        return obj;
      }, {}),
    );
    this.data = data;
    this.intermediateData = data;

    return this.data;
  }

  getSortData(sortType) {
    const sortVac = { 'sort-up': 1, 'sort-down': -1 };
    const sortedData = [...this.activePageData].sort(
      (a, b) => (a.price - b.price) * sortVac[sortType],
    );
    return sortedData;
  }

  getFilterData(filter, filterOption) {
    if (filterOption === 'all') {
      this.intermediateData = this.data;
      return this.intermediateData;
    }
    this.intermediateData = this.data.filter(item => item[filter] === filterOption);
    return this.intermediateData;
  }

  getObjForModalById(id) {
    const objectForModal = this.data.find(obj => obj.id === id);
    return objectForModal;
  }

  updateDataForCart({ id }, num) {
    let updatedProduct = null;
    const updatedData = this.data.map(product => {
      if (product.id === id) {
        updatedProduct = { ...product, isInCart: num };
        return updatedProduct;
      } else {
        return product;
      }
    });
    this.data = updatedData;
    return updatedProduct;
  }
  getSearchDaraByTitle = title => {
    const rez = this.intermediateData.filter(item => item.title.includes(title));
    console.log(rez);
    return rez;
  };

  updateDataByStorage() {
    const parsedDataFromLS = JSON.parse(localStorage.getItem(this.STORAGE_KEY));
    let updatedData = [];
    if (parsedDataFromLS) {
      updatedData = this.data.reduce((acc, dataItem) => {
        const match = parsedDataFromLS.find(storageItem => dataItem.id === storageItem.id);
        if (match) {
          acc.push(match);
        } else {
          acc.push(dataItem);
        }
        return acc;
      }, []);
      this.data = updatedData;
    }

    return this.data;
  }

  getIntermediateData() {
    return this.intermediateData;
  }

  setActivePageData(data) {
    this.activePageData = data;
  }
}
