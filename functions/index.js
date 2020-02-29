const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

const ambientes = ['Produção', 'Homologação', 'Desenvolvimento'];
const leveis = ['error', 'warning', 'debug'];
const origens = ['127.0.0.1', '10.0.1.1', 'app.server.com.br'];

const getRandomValueFrom = array => {
  return array[Math.floor(Math.random() * array.length)];
};

const payload = {
  detalhes: 'bla bla bla',
  descricao: 'Ipsum dolor...',
  titulo: 'Erro 404',
  ambiente: getRandomValueFrom(ambientes),
  origem: getRandomValueFrom(origens),
  coletadoPor: 'usuário XPTO',
  eventos: 2,
  level: getRandomValueFrom(leveis),
  criadoEm: new Date()
};

exports.createData = functions.https.onRequest((request, response) => {
  const userId = request.url.substr(1);

  const usersCollectionRef = admin.firestore().collection('usuários');
  const userDocumentRef = usersCollectionRef.doc(userId);
  const alertCollectionRef = userDocumentRef.collection('alertas');

  response.send(
    `Os dados ${JSON.stringify(payload)} serão inseridos no usuário: ${userId}`
  );
  return alertCollectionRef.add({ ...payload });
});
