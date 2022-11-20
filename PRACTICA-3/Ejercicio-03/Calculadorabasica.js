"use strict";

class CalculadoraBasica{
    constructor(){
        this.num = '';
        this.screen = '0';
        this.memory = new Number('0');
        this.op = '+';
        this.clean = true;
        this.result = 0;

        this.reset = false;

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
                } else if(keyName == '%'){
                    this.percentage();
                } else if(keyName == 'Enter'){
                    this.equal();
                } else if(keyName == 'g'){
                    this.mPlus();
                } else if(keyName == 'f'){
                    this.mMinus();
                } else if(keyName == 'r'){
                    this.mrc();
                } else if(keyName == 's'){
                    this.sqr();
                } else if(keyName == 'o'){
                    this.changeSign();
                } else if(keyName == 'a'){
                    this.ce();
                } else if(keyName == 'c'){
                    this.onc();
                }
            }
    }

    get scr(){
        return document.querySelector('input[type="text"]');
    }

    updateScreen(){
        this.scr.value = this.screen + this.num;
    }

    onc(){
        this.num = '';
        this.screen = '0';
        this.memory = new Number('0');
        this.op = '+';
        this.clean = true;
        this.result = 0;

        this.reset = false;

        this.updateScreen();
    }

    ce(){
        this.num = ''

        this.updateScreen();
    }

    changeSign(){
        if(this.clean){
            if(this.num.charAt(0) != '-'){
                this.num = '';
                this.screen = '-' + this.screen;
            }
            else{
                this.num = '';
                this.screen = this.screen.substring(1);
            }  
        } else{
            if(this.num.charAt(0) != '-'){
                this.num = '-' + this.num;
            }
            else{
                this.num = this.num.substring(1);
            }  
        }         
        this.updateScreen();
    }

    sqr(){
        if(this.clean){
            this.num = '0';
            this.op = '+';
        }

        this.reset = false;
        this.#saveNumber();
        
        this.op = '√';
        
        this.screen = Math.sqrt(Number(this.screen));
        this.result = this.screen;
        this.num = '';

        this.updateScreen();
        

        this.clean = true;

        this.reset = true;
    }

    percentage(){
        let aux = 0;
        
        if(this.op === '+' || this.op === '-'){
            aux = eval(Number(this.result) + this.op + Number(this.result) + '*' + this.num + '/100');
        } else{
            aux = eval(Number(this.result) + this.op + '(' + Number(this.num) + '/100)');
        }
        

        this.result = aux;
        this.num = '';
        this.screen = this.result;

        this.updateScreen();
        
    }

    digit(digit){
        if(this.reset){
            this.num = '';
            this.screen = '';
            this.memory = new Number('0');
            this.op = '+';
            this.clean = false;
            this.result = 0;
            this.reset = false;
        }

        if(this.clean === true){
            this.result = this.screen;
            this.screen = '';
            this.clean = false;
            this.num = '';
        }

        this.num += digit;
        this.updateScreen();
    }

    dot(){
        this.num += '.';
        this.updateScreen();
    }

    #saveNumber(){
        this.screen = this.result + this.op +  this.num;
        this.clean = true;

        this.screen = eval(this.screen);
        
        this.num = '';
    }

    mul(){
        this.operator('*');
    }

    div(){
        this.operator('/');
    }

    minus(){
        this.operator('-');
    }

    plus(){
        this.operator('+');
    }

    operator(operador){
        if(this.num === ''){
            this.op = operador;
        } else{

            if(this.op === '√'){
                this.num = 0;
                this.op = '+';
            }

            if(this.reset){
                this.num = 0;
            }
            this.reset = false;
            this.#saveNumber();
            this.op = operador;
            
            this.updateScreen();
        }
    }

    mrc(){
        this.num = this.memory;
        this.screen = '';
        this.updateScreen();
    }

    mMinus(){
        this.#operationMemory('-');
    }

    mPlus(){
        this.#operationMemory('+');
    }

    #operationMemory(operator){
        this.memory = eval(this.memory + operator + this.num);
    }

    equal(){
        try{
            if(this.op === '√'){
                this.sqr();
                return;
            }

            let auxNum = this.num;
            let opera = this.op;

            this.#saveNumber();

            this.updateScreen();
            this.op = opera;
            this.num = auxNum;
            this.result = this.screen;
            this.clean = true;

            this.reset = true;
            

            if(Number.isNaN(this.screen) || this.screen === undefined){
                throw e;
            }

        } catch(e){
            this.screen = 'ERROR';
            this.updateScreen();
        }
    }

}

let calculator = new CalculadoraBasica();