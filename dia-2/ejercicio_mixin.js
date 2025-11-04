/*
En mi sistema los clietes se pueden:
    modificar
    crear
    remove
    get
Los usuario solo se pueden leer

*/

//Segregación interface(SOLID)

const Add = Base => class extends Base {
    add() { console.log("Add") }
}
const Update = Base => class extends Base {
    update() { console.log("Update") }
}
const Remove = Base => class extends Base {
    remove() { console.log("Remove") }
}
const Get = Base => class extends Base {
    get() { console.log("get") }
}

/*class Customer extends Add(Update(Remove(Get(class {})))){
    update(){
        super.update();
    }
}
class User extends(Get(class {})){

}*/


class Customer extends inherit().withMixins(Add, Update, Remove, Get) {

}
class User extends inherit().withMixins(Get) {
}


class Mixins {
    constructor(Base) {
        this.base = Base || class { };
    }
    withMixins(...mixins) {
        return mixins.reduceRight((proto, mixin) => mixin(proto), this.base)
        //Get,Remove,Update,Create
        //base+Create
        //base+Create+Upate
        //base+Create+Upate+Remove
        //base+Create+Upate+Remoe+Get
        //null+Object+base+Create+Upate+Remoe+Get
    }
}

function inherit(Base = class { }) {
    return new Mixins(Base)
}

/*
Demostramos que todos los datos de js heredean de object?
1 es object si
function es object si
*/