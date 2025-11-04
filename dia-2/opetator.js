//rest parameteres
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters

function foo(a,b,...rest){

}

foo(1,2,3,4,5,6)

/*
a=1
b=2
rest = [3,4,5,6]

"use strict";
function foo(a, b) {
    var rest = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        rest[_i - 2] = arguments[_i];
    }
}

1. Tiene que haber un solo rest parameters en la funcion
2. Tiene que ser el ultimo de los parametros
*/

//default parameters
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters

function sum(a,b=5){
    return a+b
}

sum(3) //8
sum(4,4) //8

/*
 1. Deben de ser los últimos de la firma del metodo
 2. Puedo tener un numero indeterminado de default parameters

 function sum(a,b=4,c) //error

 "use strict";
function sum(a, b) {
    if (b === void 0) { b = 5; }
    return a + b;
}

*/

//desectructuracion
//https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/Destructuring

const array = [1,2,3,4]
const [a,b,...rest] = array

//a=array[0]
//b=array[0]
//rest = [3,4]

/*
"use strict";
var array = [1, 2, 3, 4];
var a = array[0], b = array[1], rest = array.slice(2);

*/

const obj = {id:1,name:'pedro', phone:666666}
const {id,name, ...data} = obj

/*
  const id =obj.id
  const name = obj.name
  data=>{phone:66666666}

  var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var obj = { id: 1, name: 'pedro', phone: 666666 };
var id = obj.id, name = obj.name, data = __rest(obj, ["id", "name"]);
*/

function component({id,name}){
   console.log(id)
}
const options={}
component(options)


//spread operator
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
//https://developer.mozilla.org/en-US/docs/Web/API/Window/structuredClone
const array1 = [1,2,3]
const array2 = [4,5,6]



const result = [...array1, ...array2]
//[1,2,3,4,5,6]
result[0]=88

//array1[0]->1

const obj1={id:1}
const obj2 = {name:'pedro', bar:{id:1}}

const newObj = {...obj1,...obj2}
/*
 obj1.id=88
 newObj.id->1
*/

/*
 newObj.bar.id=55

 que vale obj2.id //55

*/

/*
ternario
https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/Conditional_operator
*/

// operador de cortocircuito
//https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/Logical_AND

const foo=undefined;

if(foo!=undefined && foo.write !=undefined){
    foo.write()
}

foo && foo.write && foo.write()

const obj3 = foo || {}

//Optional Chaining

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining

foo?.write()

//Nullish coalescing assignment (??=)
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_assignment
//https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing

const obj4=[
    {id:1,write:function(){console.log(this.id)}},
    {id:2,write:function(){console.log(this.id)}},
    {id:3,write:function(){console.log(this.id)}},
]

for(const item of obj4){
    item.write();
}

for(const {write} of obj4){
    write() // perdida de ambito
}





