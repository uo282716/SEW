"use strict";

class CalculadoraRPN{
    constructor(){
        this.num = '';
        this.stack = new Array();
        this.shift = false;

        document.addEventListener('keydown', (event) =>{
            this.key(event);
        })
    }

    key(event){
        const keyName = event.key;

            if(Number.isInteger(Number(keyName))){
                this.digit(keyName);
            } else{
                if(keyName == '.'){
                    this.dot();
                } else if (keyName == '+'){
                    this.plus();
                } else if(keyName == '-'){
                    this.minus();
                } else if(keyName == '/'){
                    this.div();
                } else if(keyName == '*'){
                    this.mul();
                } else if(keyName == 'Enter'){
                    this.enter();
                } else if(keyName == 'o'){
                    this.onc();
                } else if(keyName == 's'){
                    this.sin();
                } else if(keyName == 'c'){
                    this.cos();
                } else if(keyName == 't'){
                    this.tan();
                } else if(keyName == 'Space'){
                    this.shift();
                }
            }
    }

    get scr(){
        return document.querySelector('input[type="text"]');
    }

    get sta(){
        return document.querySelector('textarea');
    }

    updateScreen(){
        this.scr.value = this.num;
    }

    updateStack(){
        this.sta.value = '';

        for(let a of this.stack){
            this.sta.value += a + '\n';
        }
    }

    dot(){
        this.digit('.');
    }

    digit(number){
        this.num += number;
        this.updateScreen();
    }

    plus(){
        if(this.stack.length >= 2){
            let b = this.stack.pop();
            let a = this.stack.pop();
    
            let result = a + b;
    
            this.stack.push(Number(result));
            this.updateScreen();
            this.updateStack();
        }
    }

    minus(){
        if(this.stack.length >= 2){
            let b = this.stack.pop();
            let a = this.stack.pop();

            let result = a - b;

            this.stack.push(Number(result));
            this.updateScreen();
            this.updateStack();
        }
    }

    div(){
        if(this.stack.length >= 2){

            let b = this.stack.pop();
            let a = this.stack.pop();

            let result = a / b;

            this.stack.push(Number(result));
            this.updateScreen();
            this.updateStack();
        }
    }

    mul(){
        if(this.stack.length >= 2){

            let b = this.stack.pop();
            let a = this.stack.pop();

            let result = a * b;

            this.stack.push(Number(result));
            this.updateScreen();
            this.updateStack();
        }
    }

    onc(){
        this.stack = new Array();
        this.num = '';

        this.updateScreen();
        this.updateStack();
    }

    sin(){
        if(this.stack.length >= 1){

            let a = this.stack.pop();

            let result = Number(0);

            if(this.shift){
                result = Math.asin(a);
            } else{
                result = Math.sin(a);
            }

            this.stack.push(Number(result));
            this.updateScreen();
            this.updateStack();
        }
    }

    cos(){
        if(this.stack.length >= 2){

            let a = this.stack.pop();

            let result = Number(0);

            if(this.shift){
                result = Math.acos(a);
            } else{
                result = Math.cos(a);
            }

            this.stack.push(Number(result));
            this.updateScreen();
            this.updateStack();
        }
    }

    tan(){
        if(this.stack.length >= 2){

            let a = this.stack.pop();

            let result = Number(0);

            if(this.shift){
                result = Math.atan(a);
            } else{
                result = Math.tan(a);
            }

            this.stack.push(Number(result));
            this.updateScreen();
            this.updateStack();
        }
    }

    shiftear(){
        if(this.shift){
            this.shift = false;

            document.querySelector('input[value="arcsin"]').value = "sin";
            document.querySelector('input[value="arccos"]').value = "cos";
            document.querySelector('input[value="arctan"]').value = "tan";
        } else{
            this.shift = true;

            document.querySelector('input[value="sin"]').value = "arcsin";
            document.querySelector('input[value="cos"]').value = "arccos";
            document.querySelector('input[value="tan"]').value = "arctan";
        }
    }

    enter(){
        this.stack.push(Number(this.num));
        this.num = '';

        this.updateScreen();
        this.updateStack();
    }
}


"use strict";

class CalculadoraEspecializada extends CalculadoraRPN{
    constructor(){
        super();
        this.mode = "dec";

        document.addEventListener('keydown', (event) =>{
            this.keyAdd(event);
        })
    }

    keyAdd(event){
        //super.key(event);

        const keyName = event.key;


        if(keyName == 'h'){
            this.intHex();
        } else if(keyName == 'H'){
            this.conHex();
        } else if(keyName == 'd'){
            this.intDec();
        } else if(keyName == 'D'){
            this.conDec();
        } else if(keyName == 'b'){
            this.intBin();
        } else if(keyName == 'B'){
            this.conBin();
        }
            
    }

    get scr(){
        return document.querySelector('input[type="text"]');
    }

    get sta(){
        return document.querySelector('textarea');
    }

    updateScreen(){
        this.scr.value = this.num;
    }

    updateStack(){
        this.sta.value = '';

        for(let a of this.stack){
            this.sta.value += a + '\n';
        }
    }

    plus(){
        if(this.stack.length >= 2){
            let b = this.stack.pop();
            let a = this.stack.pop();
    
            a = this.#convertToDec(a);
            b = this.#convertToDec(b);
    
            a = Number(a.substring(0, a.length - 1));
            b = Number(b.substring(0, b.length - 1));
    
            let result = a + b;
    
            if(this.mode == 'dec'){
                this.stack.push(this.#convertToDec(result + 'd'));
            } else if(this.mode == 'hex'){
                this.stack.push(this.#convertToHex(result + 'd'));
            } else if(this.mode == 'bin'){
                this.stack.push(this.#convertToBin(result + 'd'));
            }
            
            this.updateScreen();
            this.updateStack();
        }
    }

    minus(){
        if(this.stack.length >= 2){

            let b = this.stack.pop();
            let a = this.stack.pop();

            a = this.#convertToDec(a);
            b = this.#convertToDec(b);

            a = Number(a.substring(0, a.length - 1));
            b = Number(b.substring(0, b.length - 1));

            let result = a - b;

            if(this.mode == 'dec'){
                this.stack.push(this.#convertToDec(result + 'd'));
            } else if(this.mode == 'hex'){
                this.stack.push(this.#convertToHex(result + 'd'));
            } else if(this.mode == 'bin'){
                this.stack.push(this.#convertToBin(result + 'd'));
            }
            
            this.updateScreen();
            this.updateStack();
        }
    }

    div(){
        if(this.stack.length >= 2){

            let b = this.stack.pop();
            let a = this.stack.pop();

            a = this.#convertToDec(a);
            b = this.#convertToDec(b);

            a = Number(a.substring(0, a.length - 1));
            b = Number(b.substring(0, b.length - 1));

            let result = a / b;

            if(this.mode == 'dec'){
                this.stack.push(this.#convertToDec(result + 'd'));
            } else if(this.mode == 'hex'){
                this.stack.push(this.#convertToHex(result + 'd'));
            } else if(this.mode == 'bin'){
                this.stack.push(this.#convertToBin(result + 'd'));
            }
            
            this.updateScreen();
            this.updateStack();
        }
    }

    mul(){
        if(this.stack.length >= 2){

            let b = this.stack.pop();
            let a = this.stack.pop();

            a = this.#convertToDec(a);
            b = this.#convertToDec(b);

            a = Number(a.substring(0, a.length - 1));
            b = Number(b.substring(0, b.length - 1));

            let result = a * b;

            if(this.mode == 'dec'){
                this.stack.push(this.#convertToDec(result + 'd'));
            } else if(this.mode == 'hex'){
                this.stack.push(this.#convertToHex(result + 'd'));
            } else if(this.mode == 'bin'){
                this.stack.push(this.#convertToBin(result + 'd'));
            }

            this.updateScreen();
            this.updateStack();
        }
    }

    sin(){
        if(this.stack.length >= 1){

            let a = this.stack.pop();
            a = this.#convertToDec(a);

            let result = Number(0);

            if(this.shift){
                result = Math.asin(Number(a.substring(0, a.length - 1)));
            } else{
                result = Math.sin(Number(a.substring(0, a.length - 1)));
            }

            if(this.mode == 'dec'){
                this.stack.push(this.#convertToDec(result + 'd'));
            } else if(this.mode == 'hex'){
                this.stack.push(this.#convertToHex(result + 'd'));
            } else if(this.mode == 'bin'){
                this.stack.push(this.#convertToBin(result + 'd'));
            }

            this.updateScreen();
            this.updateStack();
        }
    }

    cos(){
        if(this.stack.length >= 1){

            let a = this.stack.pop();
            a = this.#convertToDec(a);

            let result = Number(0);

            if(this.shift){
                result = Math.acos(Number(a.substring(0, a.length - 1)));
            } else{
                result = Math.cos(Number(a.substring(0, a.length - 1)));
            }

            if(this.mode == 'dec'){
                this.stack.push(this.#convertToDec(result + 'd'));
            } else if(this.mode == 'hex'){
                this.stack.push(this.#convertToHex(result + 'd'));
            } else if(this.mode == 'bin'){
                this.stack.push(this.#convertToBin(result + 'd'));
            }

            this.updateScreen();
            this.updateStack();
        }
    }

    tan(){
        if(this.stack.length >= 1){

            let a = this.stack.pop();
            a = this.#convertToDec(a);

            let result = Number(0);

            if(this.shift){
                result = Math.atan(Number(a.substring(0, a.length - 1)));
            } else{
                result = Math.tan(Number(a.substring(0, a.length - 1)));
            }

            if(this.mode == 'dec'){
                this.stack.push(this.#convertToDec(result + 'd'));
            } else if(this.mode == 'hex'){
                this.stack.push(this.#convertToHex(result + 'd'));
            } else if(this.mode == 'bin'){
                this.stack.push(this.#convertToBin(result + 'd'));
            }

            this.updateScreen();
            this.updateStack();
        }
    }

    enter(){
        if(this.mode == 'dec'){
            this.stack.push(this.num + 'd');
        } else if(this.mode == 'hex'){
            this.stack.push(this.num + 'h');
        } else if(this.mode == 'bin'){
            this.stack.push(this.num + 'b');
        }

        this.num = '';

        this.updateScreen();
        this.updateStack();
    }

    intBin(){
        this.mode = 'bin';
    }

    intDec(){
        this.mode = 'dec';
    }

    intHex(){
        this.mode = 'hex';
    }

    conBin(){
        if(this.stack.length >= 1){

            let n = this.stack.pop();

            n = this.#convertToBin(n);

            this.stack.push(n);

            this.num = '';

            this.updateScreen();
            this.updateStack();
        }
    }

    conHex(){
        if(this.stack.length >= 1){

            let n = this.stack.pop();

            n = this.#convertToHex(n);

            this.stack.push(n);

            this.num = '';

            this.updateScreen();
            this.updateStack();
        }
    }

    conDec(){
        if(this.stack.length >= 1){

            let n = this.stack.pop();

            n = this.#convertToDec(n);

            this.stack.push(n);

            this.num = '';

            this.updateScreen();
            this.updateStack();
        }
    }

    #convertToHex(n){
        if(n.charAt(n.length - 1) == 'd'){
            return this.#convertDecToHex(n.substring(0, n.length - 1));
        } else if(n.charAt(n.length - 1) == 'h'){
            return n;
        } else{
            return this.#convertBinToHex(n.substring(0, n.length - 1));
        }
    }

    #convertDecToHex(n){
        let numb = Number(n);
        return numb.toString(16) + 'h';
    }

    #convertBinToHex(n){
        let parts = n.split(".");

        let integer = parts[0];
        let float = null;
        if(parts.length > 1)
            float = parts[1];

        let result = 0;

        let exp = integer.length - 1;

        for(let d of integer){
            result += Math.pow(2, exp) * d;
            exp--;
        }

        if(float != null){
            for(let d of integer){
                result += Math.pow(2, exp) * d;
                exp--;
            }
        }

        return Number(result).toString(16) + 'h';
    }

    #convertToDec(n){
        if(n.charAt(n.length - 1) == 'd'){
            return n;
        } else if(n.charAt(n.length - 1) == 'h'){
            return this.#convertHexToDec(n.substring(0, n.length - 1));
        } else{
            return this.#convertBinToDec(n.substring(0, n.length - 1));
        }
    }

    #convertHexToDec(n){
        const equivalencias = {
            "0": 0,
            "1": 1,
            "2": 2,
            "3": 3,
            "4": 4,
            "5": 5,
            "6": 6,
            "7": 7,
            "8": 8,
            "9": 9,
            "A": 10,
            "B": 11,
            "C": 12,
            "D": 13,
            "E": 14,
            "F": 15,
        };
        let parts = n.split(".");

        let integer = parts[0];
        let float = null;
        let result = 0;
        if(parts.length > 1){
            float = parts[1];
        }

        let exp = integer.length - 1;

        for(let d of integer){
            result += Math.pow(16,exp) * equivalencias[d];
            exp--;
        }

        if(float != null){
            for(let d of float){
                result += Math.pow(16,exp) * equivalencias[d];
            }
        }
        return result.toString() + 'd';
    }    

    #convertBinToDec(n){
        let parts = n.split(".");

        let integer = parts[0];
        let float = null;
        if(parts.length > 1)
            float = parts[1];

        let result = 0;

        let exp = integer.length - 1;

        for(let d of integer){
            result += Math.pow(2, exp) * d;
            exp--;
        }

        if(float != null){
            for(let d of integer){
                result += Math.pow(2, exp) * d;
                exp--;
            }
        }

        return result.toString() + 'd';
    }

    #convertToBin(n){
        if(n.charAt(n.length - 1) == 'd'){
            return this.#convertDecToBin(n.substring(0, n.length - 1));
        } else if(n.charAt(n.length - 1) == 'h'){
            return this.#convertHexToBin(n.substring(0, n.length - 1));
        } else{
            return n;
        }
    }

    #convertDecToBin(n){
        let numb = Number(n);
        return numb.toString(2) + 'b';
    }

    #convertHexToBin(n){
        let dec = this.#convertHexToDec(n);

        return Number(dec.substring(0, dec.length - 2)).toString(2) + 'b';
    }

}

let calculator = new CalculadoraEspecializada();