export default class Inventory {
    constructor() {
        this._products = new Array();   
    }   

    add(product) {
        let pos = this._findProducts(product);        
        if(pos) {
            document.querySelector('#details').innerHTML += 
            '<h4>Este producto ya está registrado.</h4>';
            return false;         
        }         
        this._products.push(product);   
        document.querySelector('#details').innerHTML += 
        `<h4>Se agregó el producto ${product.getCode()}.</h4>`;
        return true;    
    }    

    delete(code) {
        let verify = this._verifyCode(code);

        if(verify === false) {    
            return false;     
        } else { 
            this._products = this._erasedProduct(code);              
            return true;
        }       
    }

    search(product) {
        let verify = this._verifyCode(product);

        if(verify === false) {            
            return null;
        } else {
            document.querySelector('#details').innerHTML += 
            `<h4>Se ha buscado el producto ${product}.</h4>`; 
            document.querySelector('#details').innerHTML += 
            '<div class="card"><h4>Producto encontrado</h4>' + 
            this._products[verify].dataHtml() + '<div>'; 
            return true;
        }
    }

    list() {
        if(this._getLength() <= 0) {
            this._update(); 
            return false
        } else {
            this._update();
            this._showTable();
            return true;
        }   
    }

    reverseList() {
        if(this._reverseArray().length <= 0) { 
            this._update();  
            return false;          
        } else {
            this._update();            
            this._showReverse();
            return true;      
        }    
    }

    insert(position) {
        for(let i = 0; i < this._getLength(); i++) {
            if(this._products[i].getCode() === position) {
                

            }
        }

    }

    //Inicio de: Métodos privados "Reverse"//
    _reverseArray() { 
        let nArray = new Array();
        for(let i = this._getLength() - 1; i >= 0; i--) {
            nArray.push(this._products[i]);
        }
        return nArray;  
    }

    _showReverse() {
        let table = document.querySelector('#table');
        let products = this._reverseArray();

        for(let i = 0; i < products.length; i++) {
            let rowProducts = table.insertRow(-1);
            let colCode = rowProducts.insertCell(0);
            let colName = rowProducts.insertCell(1);
            let colCost = rowProducts.insertCell(2);
            colCode.innerHTML = products[i].getCode();
            colName.innerHTML = products[i].getName();
            colCost.innerHTML = products[i].getCost();  
        }      
    }  
    
    // Inicio de: Métodos Privados Generales //
    _update() {
        let table = document.querySelector('#table');
        let htmlTable = `<tr>
                            <th>CÓDIGO</th>                                
                            <th>NOMBRE</th>                                
                            <th>PRECIO</th>
                        </tr>`;
        
        table.innerHTML = htmlTable;
    }

    _showTable() {
        let table = document.querySelector('#table');
        let products = this._products;
         
        for(let i = 0; i < this._getLength(); i++) {
            let rowProducts = table.insertRow(-1);
            let colCode = rowProducts.insertCell(0);
            let colName = rowProducts.insertCell(1);
            let colCost = rowProducts.insertCell(2);
            colCode.innerHTML = products[i].getCode();
            colName.innerHTML = products[i].getName();
            colCost.innerHTML = products[i].getCost();           
        }          
    }   
    
    _erasedProduct(product) {
        let nArr = new Array();
        for(let i = 0; i < this._getLength(); i++){ 
            if(product !== this._products[i].getCode()) {               
                nArr.push(this._products[i]);                
            }     
        }
        return nArr;
    }

    _getLength() {
        return this._products.length;
    }    

    _verifyCode(code) {
        for(let i= 0; i < this._getLength(); i++) {
            if(this._products[i].getCode() === code){ 
                return i;     
            }        
        }
        return false;  
    }

    _findProducts(product) {
        for(let i= 0; i < this._getLength(); i++) {
            if(this._products[i].getCode() === product.getCode()){ 
                return true;
            }    
        }
        return false;    
    }
}