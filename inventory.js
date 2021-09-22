export default class Inventory {
    constructor() {
        this._products = new Array();   
    } 
    
    getArray() {
        return this._products;
    }

    add(product) {
        let pos = this._findProducts(product);        
        if(pos) {  
            return false;         
        }         
        this._products.push(product);  
        return true;    
    }  
    
    delete(code) {
        let pos = this._verifyCode(code);

        if(pos >= 0) {
            for(let i = pos; i < (this._products.length - 1); i++) {                   
                this._products[i] = this._products[i+1];       
            }            
            this._products.pop();
            return true;
        } else {
            return null;
        }        
    }

    search(product) {
        let verify = this._verifyCode(product);

        if(verify < 0) {            
            return null;
        } else {    
            return this._products[verify];
        }
    }

    list() {
        if(this._getLength() <= 0) {
            return false;
        } else {
            return true;
        }  
    }

    reverseList() {
        if(this._getLength() <= 0) {    
            return false;          
        } else {   
            return true;      
        }    
    }

    insert(product, inPos) {
        let nPos; 
        let find = this._findProducts(product);

        if(find) {
            return false;
        } else {
            for(inPos; inPos < (this._products.length + 1); inPos++) {
                if(inPos  === this._getLength()) {              
                    this._products.push(product);
                    return;                        
                }
                nPos = this._products[inPos]; 
                this._products[inPos] = product;
                product = nPos;      
            }
            return true;   
        }    
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
        return -1;  
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