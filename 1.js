
/**
 * 函数的两种声明
 *      - 全局变量
 *      - 互相覆盖 
 *          -> 将函数放在一个变量里，减少覆盖的风险
 *          -> 一旦被覆盖，所有功能失效
 */
function checkName() {  // var checkName = function() {}
    console.log('---checkName')
}
function checkPassword() {  // var checkPassword = function() {}
    console.log('---checkPassword')
}

/**
 * 用对象收编变量
 *      - 对象的两种形式
 *      - 可以通过点语法访问和创建
 *      - 对象不能复制/这个对象类在用new关键字创建对象时，新创建的对象是不能继承这些方法的
 *          -> 将方法放在函数对象中
 */
var CheckObject = {
    checkName: () => {
        console.log('---CheckObject.checkName')
    },
    checkPassword: () => {
        console.log('---CheckObject.checkPassword')
    }
}
// var a = CheckObject() // VM1358:1 Uncaught TypeError: CheckObject is not a function at <anonymous>:1:9

var CheckObject = function(){
    console.log('---CheckObject')
}
CheckObject.checkName = function() {
    console.log('---CheckObject.checkName')
}
CheckObject.checkPassword = function() {
    console.log('---CheckObject.checkPassword')
}
// var a = CheckObject()
// a.checkName() // Uncaught TypeError: Cannot read property 'checkName' of undefined at <anonymous>:1:3

/**
 * 真假对象
 *      - 每次调用该函数时，返回一个新对象，互不影响
 *      - 不是一个真正意义上的类，创建的对象a和对象CheckObject没有任何关系
 */
var CheckObject = () => {
    return {
        checkName: () => {
            console.log('---CheckObject.checkName')
        },
        checkPassword: () => {
            console.log('---CheckObject.checkPassword')
        }
    }
}
var a = CheckObject()
a.checkName()

/**
 * 类
 *      - 使用 new 创建
 *      - 新创建的对象都会对类的this上的属性进行复制，新创建的对象都会有自己的一套方法
 *      - 这么做的消耗是很奢侈的
 *          -> 原型链
 */
var CheckObject = function() {
    this.checkName = () => {
        console.log('---this.checkName')
    },
    this.checkPassword = () => {
        console.log('---this.checkPassword')
    }
}
var b = new CheckObject()
b.checkName()

/**
 * 原型链
 *      - 创建出来的对象所拥有的的方法就都是一个了
 *          -> 需要将prototype写很多遍
 */
var CheckObject = function(){}
CheckObject.prototype.checkName = () => {
    console.log('---this.checkName')
}
CheckObject.prototype.checkPassword = () => {
    console.log('---this.checkPassword')
}

var CheckObject = function(){}
CheckObject.prototype = {
    checkName: () => {
        console.log('---CheckObject.checkName')
    },
    checkPassword: () => {
        console.log('---CheckObject.checkPassword')
    }
}

/**
 * 链式调用
 *      - 在声明的每个方法末尾将当前对象返回
 */
var CheckObject = {
    checkName: function() {
        console.log('---CheckObject.checkName')
        return this
    },
    checkPassword: function() {
        console.log('---CheckObject.checkPassword')
        return this
    }
}
CheckObject.checkName().checkPassword()

/**
 * 函数的祖先
 *      - 污染全局Function，造成不必要的开销
 *          -> 抽象出一个统一添加方法的功能
 */
Function.prototype.CheckObject = function(){
    console.log('---CheckObject.checkName')
}
var f = function(){}
f.CheckObject()

/**
 * 统一添加方法
 */
Function.prototype.addMethod = function(name, fn) {
    this[name] = fn
}
var  methods = new Function()
methods.addMethod('checkName', function(){
    console.log('---addMethod.checkName')
})
methods.addMethod('checkPassword', function(){
    console.log('---addMethod.checkPassword')
})
methods.checkName()
methods.checkPassword()

/**
 * 链式添加
 */
Function.prototype.addMethod = function(name, fn) {
    this[name] = fn
    return this
}
var  methods = new Function()
methods.addMethod('checkName', function(){
    console.log('---addMethod.checkName')
}).addMethod('checkPassword', function(){
    console.log('---addMethod.checkPassword')
})
methods.checkName()
methods.checkPassword()
methods.checkName().checkPassword() // Uncaught TypeError: Cannot read property 'checkPassword' of undefined at <anonymous>:1:20

/**
 * 链式调用
 *      - 函数式调用
 */
Function.prototype.addMethod = function(name, fn) {
    this[name] = fn
    return this
}
var  methods = function(){}
methods.addMethod('checkName', function(){
    console.log('---addMethod.checkName')
    return this
}).addMethod('checkPassword', function(){
    console.log('---addMethod.checkPassword')
    return this
})
methods.checkName().checkPassword()

/**
 * 链式调用
 *      - 类式调用
 */
Function.prototype.addMethod = function(name, fn) {
    this.prototype[name] = fn
    return this
}
var  methods = function(){}
methods.addMethod('checkName', function(){
    console.log('---addMethod.checkName')
    return this
}).addMethod('checkPassword', function(){
    console.log('---addMethod.checkPassword')
    return this
})
var m = new methods()
m.checkName().checkPassword()