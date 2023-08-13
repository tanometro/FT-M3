'use strict';
/*----------------------------------------------------------------
Promises Workshop: construye la libreria de ES6 promises, pledge.js
----------------------------------------------------------------*/
// // TU CÓDIGO AQUÍ:

class $Promise {
    constructor(executor) {
        if (typeof executor !== "function") throw new Error("Executor function");

        this._state = "pending";

        this._handlerGroups = [];

    }
    _internalResolve(data) {
        if (this._state == "pending") {
            this._state = "fulfilled";
            this._value = data;

            this._callHandlers();
        }

    }
    _internalReject(error) { 
        if (this._state == "pending") {
            this._state = "rejected";
            this._value = error;

            this._callHandlers();
        }
    }

    _then(successCb, errorCb){
        if(typeof successCb !== "function") successCb === false;
        if(typeof errorCb !== "function") errorCb === false;
        let downstreamPromise = new $Promise(() => {})
        this._handlerGroups.push({successCb, errorCb, downstreamPromise});

        if(this._state !== "pendig")  this._callHandlers();

        return downstreamPromise;
    }

    _catch(){
       return  this._then(false, errorCb);
    }

    _callHandlers(){
        while(this._handlerGroups > 0){
            let {successCb, errorCb, downstreamPromise} = this._handlerGroups.shift();

            if(this._state == "fulfilled") {
                if(!successCb){
                    downstreamPromise._internalResolve(this._value);
                }
                else{
                    try {
                        const result =  successCb(this._value);
                       if(result instanceof $Promise){
                        result._then(
                            value => downstreamPromise._internalResolve(value),
                            err => downstreamPromise._internalReject(err)
                        )
                       }
                       else {
                        downstreamPromise._internalResolve(result)
                       }
                    }
                    catch (e) {
                        downstreamPromise._internalReject(e)
                    }
                }
                
                }
            else if(this._state == "rejected"){
                if(!errorCb){
                    downstreamPromise._internalReject(this._value)
                }
                else{
                    try {
                        const result = errorCb(this._value);

                        if(result instanceof $Promise){
                            result._then(
                                value => downstreamPromise._internalResolve(value),
                                err => downstreamPromise._internalReject(err)
                            )
                           }
                           else {
                            downstreamPromise._internalResolve(result)
                           }
                    }
                    catch (e) {
                        downstreamPromise._internalReject(e);
                    }
                }
            }
        }
    }

}





module.exports = $Promise;
/*-------------------------------------------------------
El spec fue diseñado para funcionar con Test'Em, por lo tanto no necesitamos
realmente usar module.exports. Pero aquí está para referencia:

module.exports = $Promise;

Entonces en proyectos Node podemos esribir cosas como estas:

var Promise = require('pledge');
…
var promise = new Promise(function (resolve, reject) { … });
--------------------------------------------------------*/

//
