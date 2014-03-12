var Vow = require('./Vow').VOW;
var Q = require("q");
var when = require("when");
var RSVP = require("rsvp");
var delay = 1000;

// success
when.resolve(function(){
        var vow = Vow.make();
        console.log("call vow");
        setTimeout(function(){
            console.log("resolve vow promise");
            vow.keep('promise from vow');
        }, delay);
        // NOTE: make vow promise 'then'able
        vow.promise.then = vow.promise.when;
        return vow.promise;
    }())
    .then(function(fromVow){
        console.log(">>>", fromVow);
        var deferred = Q.defer();
        setTimeout(function(){
            console.log("resolve Q promise");
            deferred.resolve("promise from Q");
        }, delay);
        return deferred.promise;
    })
    .then(function(fromQ){
        console.log(">>>", fromQ);
        var deferred = RSVP.defer();
        setTimeout(function(){
            console.log("resolve RSVP promise");
            deferred.resolve("promise from RSVP");
        }, delay);
        return deferred.promise;
    })
    .then(function(fromRSVP){
        console.log(">>>", fromRSVP);
    })
    // failure
    .then(function(){
        var vow = Vow.make();
        console.log("call vow (failure)");
        setTimeout(function(){
            console.log("resolve vow promise (failure)");
            vow.break('promise from vow (failure)');
        }, delay);
        vow.promise.then = vow.promise.when;
        return vow.promise;
    })
    .then(null, function(fromVow){
        console.log(">>>", fromVow);
        var deferred = Q.defer();
        setTimeout(function(){
            console.log("resolve Q promise (failure)");
            deferred.reject("promise from Q (failure)");
        }, delay);
        return deferred.promise;
    })
    .then(null, function(fromQ){
        console.log(">>>", fromQ);
        var deferred = RSVP.defer();
        setTimeout(function(){
            console.log("resolve RSVP promise (failure)");
            deferred.reject("promise from RSVP (failure)");
        }, delay);
        return deferred.promise;
    })
    .then(null, function(fromRSVP){
        console.log(">>>", fromRSVP);
    })