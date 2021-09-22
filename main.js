import Inventory from './inventory.js';
import Product from './product.js';

class App {
    constructor() {
        this._inventory = new Inventory;
        //Botón "Añadir"//
        let btnAdd = document.querySelector('#btnAdd');
        btnAdd.addEventListener('click', this.addProduct); 
        //Botón "Eliminar"//
        let btnDelete = document.querySelector('#btnDelete');
        btnDelete.addEventListener('click', this.deleteProduct); 
        //Botón "Buscar"//
        let btnSearch = document.querySelector('#btnSearch');
        btnSearch.addEventListener('click', this.searchProduct); 
        //Botón "Listar"//
        let btnList = document.querySelector('#btnList');
        btnList.addEventListener('click', this.listProduct); 
        //Botón "Listar Inverso"//
        let btnReverse = document.querySelector('#btnReverse');
        btnReverse.addEventListener('click', this.reverseList); 
        //Botón "Insertar"//
        let btnInsert = document.querySelector('#btnInsert');
        btnInsert.addEventListener('click', this.insertProduct);    
    }

    // Función para añadir un producto //
    addProduct = () => {         
        let details = document.querySelector('#details');
        let inpCode = document.querySelector('#txtCode');
        let inpName = document.querySelector('#txtName');
        let inpAmount = document.querySelector('#txtAmount');
        let inpCost = document.querySelector('#txtCost');
        let code = inpCode.value;
        let name = inpName.value;
        let amount = Number(inpAmount.value);
        let cost = Number(inpCost.value);   

        if(code && name && amount && cost ) {
            inpCode.value = '';
            inpName.value = '';
            inpAmount.value = '';
            inpCost.value = '';
            
            let product =  new Product(code, name, amount, cost); 

            if(!this._inventory.add(product)) {
                details.innerHTML += 
                '<h4>Este producto ya está registrado.</h4>';
                return;
            }

           if(this._inventory._getLength() < 20) {
            this._inventory.add(product);
            details.innerHTML += 
            `<h4>Se agregó el producto ${product.getCode()}.</h4>`;                
            } else {
            details.innerHTML += 
            '<h4>El inventario ha alcanzado el límite de productos.</h4>';            
            } 
        } else {
          details.innerHTML += 
           '<h4>Ingresa los datos principales.</h4>';       
        }  
        console.log(this._inventory._getLength());    
    }

    // Función para eliminar un producto //
    deleteProduct = () => {
        let code = document.querySelector('#txtCode').value;
        let dltProduct = this._inventory.delete(code);
        let details = document.querySelector('#details');

        document.querySelector('#txtCode').value = '';
        
        if(dltProduct) { 
            console.log(dltProduct);
            details.innerHTML += `<h4>Producto ${code} eliminado.</h4>`; 
            console.log(this._inventory._getLength());
            console.log(this._inventory);             
        } else if(!code) {
            details.innerHTML += '<h4>Ingresa un código de producto.</h4>';
        } else {
           details.innerHTML += '<h4>Este producto no existe.</h4>';
           console.log(dltProduct);
        }

    }

    // Función para buscar un producto //
    searchProduct = () => {
        let code = document.querySelector('#txtCode').value;
        let product = this._inventory.search(code);
        let details = document.querySelector('#details');

        if(code === '') {
            details.innerHTML += '<h4>Ingresa un código de producto.</h4>';
            return;
        }

        document.querySelector('#txtCode').value = '';

        if(product === null) {                     
            details.innerHTML += `<h4>Se ha buscado el producto ${code}.</h4>`;
            details.innerHTML += '<p>No se encontró el producto.</p>';
            console.log(product);             
        } else {
            console.log(product);
            document.querySelector('#details').innerHTML += 
            `<h4>Se ha buscado el producto ${code}.</h4>`; 
            document.querySelector('#details').innerHTML += 
            '<div class="card"><h4>Producto encontrado</h4>' + 
            product.dataHtml() + '<div>';    
        }
        
    }

    // Función para enlistar los productos por orden de entrada //
    listProduct = () => {
        let list = this._inventory.list();
        let details = document.querySelector('#details');

        if(!list) {
            this._update();   
            details.innerHTML += `<h4>No hay ningún producto.</h4>`;   
        } else {
            this._update();    
            this._showTable();
            details.innerHTML += `<h4>Lista predeterminada.</h4>`;               
        }   
        console.log(list)
           
    }

    // Función que invierte la lista de los productos //
    reverseList = () => {
        let reverse = this._inventory.reverseList();
        let details = document.querySelector('#details');

        if(!reverse) {
            this._update(); 
            details.innerHTML += '<h4>No hay ningún producto.</h4>';
        } else {
            this._update();    
            this._showReverse()
            details.innerHTML += '<h4>Lista Invertida.</h4>';
        }
    }

    // Función para insertar un producto en una posición determinada //
    insertProduct= () => {       
       let inpCode = document.querySelector('#txtCode');
       let inpName = document.querySelector('#txtName');
       let inpAmount = document.querySelector('#txtAmount');
       let inpCost = document.querySelector('#txtCost');
       let inpInsert = document.querySelector('#txtInsert');       
       let code = inpCode.value;
       let name = inpName.value;
       let amount = Number(inpAmount.value);
       let cost = Number(inpCost.value);
       let insert = Number(inpInsert.value);

        if(code && name && amount && cost && insert) {
            inpCode.value = '';
            inpName.value = '';
            inpAmount.value = '';
            inpCost.value = '';
            inpInsert.value = '';
                
            let product =  new Product(code, name, amount, cost);

            if(this._inventory.insert(product, insert - 1) === false) {
                details.innerHTML += '<h4>Este producto ya está registrado.</h4>';
                return;   
            }

            if(this._inventory._getLength() < 20) {                
                this._inventory.insert(product, insert - 1);
                details.innerHTML += 
                `<h4>Se se agregó el producto ${product.getCode()} en la posición ${insert}.</h4>`;                                      
            } 
        } else {
            details.innerHTML += 
            '<h4>Ingresa todos los datos.</h4>';
        }   
    }

    // Métodos privados para mostrar tablas //    
    _update() {
        let table = document.querySelector('#table');
        let htmlTable = `<tr>
                            <th>CÓDIGO</th>                                
                            <th>NOMBRE</th>                                
                            <th>PRECIO</th>
                            <th>CANTIDAD</th>
                            <th>COSTO TOTAL</th>
                        </tr>`;

        table.innerHTML = htmlTable;
    }

    _showTable() {
        let table = document.querySelector('#table');
        let products = this._inventory.getArray();
         
        for(let i = 0; i < products.length; i++) {
            let rowProducts = table.insertRow(-1);
            let colCode = rowProducts.insertCell(0);
            let colName = rowProducts.insertCell(1);
            let colCost = rowProducts.insertCell(2);
            let colAmount = rowProducts.insertCell(3);
            let colTotal = rowProducts.insertCell(4);
            colCode.innerHTML = products[i].getCode();
            colName.innerHTML = products[i].getName();
            colCost.innerHTML = `$${products[i].getCost()}`; 
            colAmount.innerHTML = products[i].getAmount();
            colTotal.innerHTML = `$${products[i].getTotal()}`;          
        }
    } 
    
    _showReverse() {
        let table = document.querySelector('#table');
        let products = this._inventory.getArray();
         
        for(let i = products.length -1 ; i >= 0; i--) {
            let rowProducts = table.insertRow(-1);
            let colCode = rowProducts.insertCell(0);
            let colName = rowProducts.insertCell(1);
            let colCost = rowProducts.insertCell(2);
            let colAmount = rowProducts.insertCell(3);
            let colTotal = rowProducts.insertCell(4);
            colCode.innerHTML = products[i].getCode();
            colName.innerHTML = products[i].getName();
            colCost.innerHTML = `$${products[i].getCost()}`; 
            colAmount.innerHTML = products[i].getAmount();
            colTotal.innerHTML = `$${products[i].getTotal()}`;          
        }
    } 
}
new App();