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

"use strict";

class CalculadoraCientifica extends CalculadoraBasica{
    constructor(){
        super();
        this.screen = '';
        this.shift = false;

        this.operations = new Array();

        document.addEventListener('keydown', (event) =>{
            this.keyAdd(event);
        })
    }

    keyAdd(event){     
        const keyName = event.key;

        if(keyName == 'm'){
            this.mod();
        } else if(keyName == '^'){
            this.pot();
        } else if(keyName == 'l'){
            this.log();
        } else if(keyName == 'q'){
            this.square();
        } else if(keyName == '('){
            this.open()
        } else if(keyName == ')'){
            this.close();
        } else if(keyName == '!'){
            this.fact();
        } else if(keyName == 'e'){
            this.exp();
        } else if(keyName == 'd'){
            this.exp10();
        } else if(keyName == 't'){
            this.tan();
        } else if(keyName == 'y'){
            this.sin();
        } else if(keyName == 'u'){
            this.cos();
        } else if(keyName == 'p'){
            this.pi();
        } else if(keyName == 'Backspace'){
            this.back();
        } else if(keyName == 'z'){
            this.shift();
        }
    }

    onc(){
        this.operations = new Array();
        super.onc();
    }

    changeSign(){
        if(this.num == ''){
            if(this.operations[this.operations.length - 1] == '+'){
                this.operations[this.operations.length - 1] = '-';

                this.screen = '';

                for(let value of this.operations){
                    this.screen += value;
                }
            } else if(this.operations[this.operations.length - 1] == '-'){
                this.operations[this.operations.length - 1] = '+';

                this.screen = '';

                for(let value of this.operations){
                    this.screen += value;
                }
            } else if(Number(this.operations[this.operations.length - 1]) != Number.NaN){
                if(this.operations[this.operations.length - 2] == '+'){
                    this.operations[this.operations.length - 2] = '-';
        
                    this.screen = '';
        
                    for(let value of this.operations){
                        this.screen += value;
                    }
                } else if(this.operations[this.operations.length - 2] == '-'){
                    this.operations[this.operations.length - 2] = '+';
        
                    this.screen = '';
        
                    for(let value of this.operations){
                        this.screen += value;
                    }
                } else{
                    this.num += '-';
                
                    this.screen = '';
        
                    for(let value of this.operations){
                        this.screen += value;
                    }
                }
            }


        }

        else if(this.operations[this.operations.length - 1] == '+'){
            this.operations[this.operations.length - 1] = '-';

            this.screen = '';

            for(let value of this.operations){
                this.screen += value;
            }
        } else if(this.operations[this.operations.length - 1] == '-'){
            this.operations[this.operations.length - 1] = '+';

            this.screen = '';

            for(let value of this.operations){
                this.screen += value;
            }
        } 
        
        else{
            if(this.num.charAt(0) == '-'){
                this.num = this.num.substring(1);
            } else{
                this.num = "-" + this.num;
            }
        }
        this.updateScreen();
    }

    sqr(){
        this.operations.push(Math.sqrt(Number(this.num)));
        this.screen += this.num + '√';
        this.num = '';  
        this.updateScreen();
    }

    digit(digit){
        if(this.operations.length === 1){
            this.num = '';
            this.screen = '';
            this.operations = new Array();
        }

        this.num += digit;
        this.updateScreen();
    }

    #saveNumber(){
        if(Number(this.num) !== 0){
            this.operations.push(Number(this.num));
            this.screen += this.num;
        }
        
        this.num = '';
    }

    operator(operador){
        this.#saveNumber();

        this.operations.push(operador);
        this.screen += operador;
        this.updateScreen();
    }

    mrc(){
        this.num = this.memory;
        this.#saveNumber();
        this.updateScreen();
    }

    #operationMemory(operator){
        let auxNum = this.num;
        let auxScreen = this.screen;
        let auxOperations = [].concat(this.operations);

        if(auxNum != '0'){
            auxOperations.push(Number(auxNum));
            auxScreen += auxNum;
            auxNum = '';

            auxScreen = '';
        } else{
            auxScreen = '0';
            auxNum = '';
        }

        for(let value of auxOperations){
            auxScreen += value;
        }

        auxScreen = eval(auxScreen);

        if(!Number.isNaN(auxScreen)){
            this.memory = eval(this.memory + operator + auxScreen);
        }
    }

    equal(){
        try{
            if(this.num != '0'){
                this.#saveNumber();
                this.screen = '';
            } else{
                this.screen = '0';
                this.num = '';
            }
            for(let value of this.operations){
                this.screen += value;
            }

            this.screen = eval(this.screen);

            if(Number.isNaN(this.screen) || this.screen === undefined){
                throw e;
            }

        } catch(e){
            this.screen = 'ERROR';
        }

        this.updateScreen();

        this.operations = new Array();
        this.operations.push(this.screen);
        this.num = '';
    }

    square(){
        this.pot();
        this.digit(2);
    }

    pot(){
        this.#saveNumber();

        this.operations.push('**');
        this.screen += '^';
        this.updateScreen();
    }

    #calculateTrigo(op){
        if(this.num != '0'){
            this.#saveNumber();
            this.screen = '';
        } else{
            this.screen = '0';
            this.num = '';
        }
        for(let value of this.operations){
            this.screen += value;
        }

        this.screen = eval(this.screen);

        switch(op){
            case "sin":
                this.screen = Math.sin(Number(this.screen));
                break;
            case "cos":
                this.screen = Math.cos(Number(this.screen));
                break;
            case "tan":
                this.screen = Math.tan(Number(this.screen));
                break;
            case "arcsin":
                this.screen = Math.asin(Number(this.screen));
                break;
            case "arccos":
                this.screen = Math.acos(Number(this.screen));
                break;
            case "arctan":
                this.screen = Math.atan(Number(this.screen));
                break;
        }

        this.updateScreen();

        this.operations = new Array();
        this.operations.push(this.screen);
        this.num = '';
    }

    sin(){
        if(this.shift){
            this.#calculateTrigo("arcsin");
        } else{
            this.#calculateTrigo("sin");
        }
    }

    cos(){
        if(this.shift){
            this.#calculateTrigo("arccos");
        } else{
            this.#calculateTrigo("cos");
        }
    }

    tan(){
        if(this.shift){
            this.#calculateTrigo("arctan");
        } else{
            this.#calculateTrigo("tan");
        }
    }

    exp10(){
        let aux = this.num;

        this.num = '10';

        this.#saveNumber();
        this.operations.push('**');
        this.operations.push(Number(aux));
        this.screen += 'e' + aux;
        this.updateScreen();
    }

    log(){
        if(this.num != '0'){
            this.#saveNumber();
            this.screen = '';
        } else{
            this.screen = '0';
            this.num = '';
        }
        for(let value of this.operations){
            this.screen += value;
        }

        this.screen = eval(this.screen);


        this.screen = Math.log10(Number(this.screen));

        this.updateScreen();

        this.operations = new Array();
        this.operations.push(this.screen);
        this.num = '';
    }

    exp(){
        this.#saveNumber();

        this.operations.push('*');
        this.operations.push(Number(10));
        this.operations.push('**');
        this.screen += 'exp';
        this.updateScreen();

    }

    mod(){
        this.operator('%');
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

    back(){
        if(this.num.length > 0){
            this.num = this.num.substring(0, this.num.length - 1);
        }

        this.updateScreen();
    }

    pi(){
        this.num = Math.PI;
        this.operations.push(Number(this.num));
        this.screen += 'π';
        this.num = '';
        this.updateScreen();
    }

    fact(){
        this.operations.push(this.#calculateFact(Number(this.num)));
        this.screen += this.num + '!';
        this.num = '';  
        this.updateScreen();
    }

    #calculateFact(number){
        let aux = 1;
        for(let i = 2; i <= number; i++){
            aux *= i;
        }
        return aux;
    }

    open(){
        if(this.num !== ''){
            this.#saveNumber();
            this.operations.push('*');
        }

        

        this.operations.push('(');
        this.screen += '(';
        this.updateScreen();
    }

    close(){
        this.#saveNumber();

        this.operations.push(')');
        this.screen += ')';
        this.updateScreen();
    }

}

let calculator = new CalculadoraCientifica();