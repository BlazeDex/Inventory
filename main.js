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

    addProduct = () => {
        let product = Product.readForm();       
        let details = document.querySelector('#details');

        if(!product) {
            details.innerHTML += '<h4>No has completado los espacios necesarios.</h4>';
            return;
        }

        if(this._inventory._getLength() < 20) {
            this._inventory.add(product);    
        } else {
            document.querySelector('#details').innerHTML += '<h4>El inventario ha alcanzado el límite de productos.</h4>';
        }
        console.log(this._inventory._getLength());    
    }

    deleteProduct = () => {
        let code = document.querySelector('#txtCode').value;
        let dltProduct = this._inventory.delete(code);
        let details = document.querySelector('#details');

        if(dltProduct) { 
            console.log(dltProduct);
            details.innerHTML += `<h4>Producto ${code} eliminado.</h4>`; 
            console.log(this._inventory._getLength()) ;             
        } else if(code === '') {
            details.innerHTML += '<h4>Ingresa un código de producto.</h4>';
        } else {
           details.innerHTML += '<h4>Este producto no existe.</h4>';
           console.log(dltProduct);
        }

    }

    searchProduct = () => {
        let code = document.querySelector('#txtCode').value;
        let product = this._inventory.search(code);
        let details = document.querySelector('#details');

        if(product) {              
            console.log(product);               
        } else if(code === '') {      
            details.innerHTML += '<h4>Ingresa un código de producto.</h4>';
        } else if(product === null) {
            details.innerHTML += `<h4>Se ha buscado el producto ${code}.</h4>`;
            details.innerHTML += '<p>No se encontró el producto.</p>';
            console.log(product);   
        }
        
    }

    listProduct = () => {
        let list = this._inventory.list();

        if(!list) {
            document.querySelector('#details').innerHTML += '<h4>No hay ningún producto.</h4>';
        } else {
            document.querySelector('#details').innerHTML += '<h4>Lista Predeterminada.</h4>';
        }    
    }

    reverseList = () => {
        let reverse = this._inventory.reverseList();

        if(!reverse) {
            document.querySelector('#details').innerHTML += '<h4>No hay ningún producto.</h4>';
        } else {
            document.querySelector('#details').innerHTML += '<h4>Lista Invertida.</h4>';
        }
    }

    insertProduct= () => {
        let product = Product.readForm();       
        let details = document.querySelector('#details');

        if(!product) {
            details.innerHTML += '<h4>No has completado los espacios necesarios.</h4>';
            return;
        }

        if(this._inventory._getLength() < 20) {
            this._inventory.add(product);    
        } else {
            document.querySelector('#details').innerHTML += '<h4>El inventario ha alcanzado el límite de productos.</h4>';
        }
    }   
}
new App();