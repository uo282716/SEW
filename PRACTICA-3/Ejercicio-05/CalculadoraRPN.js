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

let calculator = new CalculadoraRPN();