export default class ModelCards{
    URL_SHEET = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTQJDUGSW4phsIvwWdxlMTUcqhoO0hRHJ8w0AirbHLcPtMRpFEx8JWykKtykGkxTQ6u5eWgYxKjt7cT/pub?output=tsv'
    
    getData(){
        return fetch(this.URL_SHEET)
            .then(r => r.text())
            .then(d => this.parseSheet(d));
    }

    parseSheet(tsv){
        const d = tsv.split('\r\n').map(line => line.split('\t'));
        const keys = d.shift();
        const data = d.map(arr => arr.reduce((obj, prop, i) => {
            obj[keys[i]] = prop;
            return obj;
        }, {}));
        
        return data;
    }
}