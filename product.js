export default class Product {
    constructor(code, name, amount, cost) {
        this._code = code;
        this._name = name;
        this._amount = amount;
        this._cost = cost; 
    }

    getCode() {
        return this._code;
    }

    getName() {
        return this._name.toUpperCase();
    }

    getAmount() {
        return this._amount;
    }

    getCost() {
        return this._cost;
    }

    getTotal() {
        return this.getAmount() * this.getCost();
    }   

    dataHtml() {
        return `<div>
                    <p>Código: ${this.getCode()}</p>
                    <p>Nombre: ${this.getName()}</p>
                    <p>Cantidad: ${this.getAmount()}</p>
                    <p>Costo Individual: $${this.getCost()}</p>
                    <p>Costo Total: $${this.getTotal()}</p>
                </div>`;
    }

    static readForm() {
        let inpCode = document.querySelector('#txtCode');
        let inpName = document.querySelector('#txtName');
        let inpAmount = document.querySelector('#txtAmount');
        let inpCost = document.querySelector('#txtCost');

        let code = inpCode.value;
        let name = inpName.value;
        let amount = Number(inpAmount.value);
        let cost = Number(inpCost.value);
       
        if(code && name && amount && cost) {
            inpCode.value = '';
            inpName.value = '';
            inpAmount.value = '';
            inpCost.value = '';

            return new Product(code, name, amount, cost);
        }

        return false;

    }
}