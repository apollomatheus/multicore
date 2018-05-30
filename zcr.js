'use strict';

//ZCore lib
var Zcr = {};

var Lib;

//Lib info
var Info = {
  name : 'ZCore',
  alias : 'zcr',
  enabled : true,
  explorer : 'http://explorer.zcore.cash:3001/insight-api-gobyte'
};

//Lib calls
var ProxyMethods = {};

var Sources = {
  info : Info,
  proxy : ProxyMethods
};

Zcr.Init = function(){
 ProxyMethods['lib'] = Lib;
 ProxyMethods['publicKey'] = Lib.PublicKey;
 ProxyMethods['privateKey'] = Lib.PrivateKey;
 ProxyMethods['address'] = Lib.Address;
 ProxyMethods['HDPublicKey'] = Lib.HDPublicKey;
 ProxyMethods['HDPrivateKey'] = Lib.HDPrivateKey;
}

Zcr.Get = function(source, key, lib){
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
   console.log('ERROR! Source -> ['+source+'] not found!');
 }
 var r = s[key];
 if (!r) {
  console.log('ERROR! Proxy method ['+key+'] in -> ['+source+'] not found!');
 }
 return r;
}

module.exports = Zcr;
