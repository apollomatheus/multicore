'use strict';

var Lib;

//Bitcoin lib
var Btc = {};

//Lib info
var Info = {
  name : 'Bitcoin',
  alias : 'btc',
  enabled : true,
  explorer : 'https://insight.bitpay.com/api'
};

//Lib calls
var ProxyMethods = {};

var Sources = {
  info : Info,
  proxy : ProxyMethods
};

//We need to init after we have the lib
Btc.Init = function(){
 ProxyMethods['lib'] = Lib;
 ProxyMethods['publicKey'] = Lib.PublicKey;
 ProxyMethods['privateKey'] = Lib.PrivateKey;
 ProxyMethods['address'] = Lib.Address;
 ProxyMethods['HDPublicKey'] = Lib.HDPublicKey;
 ProxyMethods['HDPrivateKey'] = Lib.HDPrivateKey;
}

Btc.Get = function(source, p, lib){ 
 //lib setup
 if (!lib && !Lib) {
  throw new Error('Missing lib');
 }
 if (lib && !Lib) {
  Lib = lib;
  this.Init();
 }

 var s = Sources[source];
 if (!s) {
   console.log('ERROR! Source in lib -> ['+source+'] not found!');
 }
 var r = s[p];
 if (!r) {
  console.log('ERROR! Proxy method in lib -> ['+p+'] not found!');
 }
 return r;
}

module.exports = Btc;
