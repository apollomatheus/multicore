'use strict';

var Multicore = {};

var Bitcoin = require('bitcore-lib');
var ZCore = require('zcore-lib');

var Libs = {
 btc: Bitcoin,
 zcr: ZCore
};

var Coins = {
 zcr: require('./zcr'),
 btc: require('./btc')
};

Multicore.GetCoin = function(c) {
 var x = Coins[c];
 if(!x) {
  console.log('ERROR! Coin ['+c+'] not registered'); 
  return null;
 }
 return x;
}

Multicore.Call = function(m,p,c) {
 var x = this.GetCoin(c);
 var l = Libs[c];
 if (x && l) {
  return x.Get(m,p,l);
 }
 return null;
}

Multicore.GetLib = function(c) {
 var x = this.GetCoin(c);
 var l = Libs[c];
 if (x && l) {
  return x.Get('proxy','lib', l);
 }
 return null;
}

Multicore.Util = function(u,c) {
 switch (u) {
  case "crypto": return Bitcoin.crypto;
  case "encoding": return Bitcoin.encoding;
  case "util": return Bitcoin.util;
  case "deps": return Bitcoin.deps;
  case "errors": return Bitcoin.errors;
  case "transaction": 
  var l = this.GetLib(c);
  if (!l){
   throw new Error('Fail to get Multicore Util ->'+u+', to ', c);
  }
  return l.Transaction;

  case "errors":
  var l = this.GetLib(c);
  if (!l){
   throw new Error('Fail to get Multicore Util ->'+u+', to ', c);
  }
  return l.errors;

  default:
   throw new Error('Fail to get Multicore Util ->'+u);
 }
}

module.exports = Multicore;
