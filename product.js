export default class Product {
    constructor(code, name, amount, cost, insert) {
        this._code = code;
        this._name = name;
        this._amount = amount;
        this._cost = cost;
        this._insert = insert;
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

    getInsert() {
        return this._insert;
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
        let inpInsert = document.querySelector('#txtInsert');

        let code = inpCode.value;
        let name = inpName.value;
        let amount = Number(inpAmount.value);
        let cost = Number(inpCost.value);
        let insert = inpInsert.value;

        if(code && name && amount && cost) {
            inpCode.value = '';
            inpName.value = '';
            inpAmount.value = '';
            inpCost.value = '';
            inpInsert.value = '';

            return new Product(code, name, amount, cost, insert);
        }

        return false;

    }
}