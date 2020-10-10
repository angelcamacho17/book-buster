// SDK de Mercado Pago
const mercadopago = require('mercadopago');
// Agrega credenciales
mercadopago.configure({
  access_token: 'APP_USR-2504148716483876-101015-d42aa249a35ed682634ddad6032c14b3-480104190'
});
const mercadopagoCtrl = {};
mercadopagoCtrl.makecheckout = (preference, res) => {
console.log(preference);
return mercadopago.preferences.create(preference);
}
module.exports = mercadopagoCtrl;