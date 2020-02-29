const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

const ambientes = ['Produção', 'Homologação', 'Desenvolvimento'];
const leveis = ['error', 'warning', 'debug'];
const origens = ['127.0.0.1', '10.0.1.1', 'app.server.com.br'];

const getRandomValueFrom = array => {
  return array[Math.floor(Math.random() * array.length)];
};

exports.createData = functions.https.onRequest((request, response) => {
  const usersCollectionRef = admin.firestore().collection('usuários');
  const userDocumentRef = usersCollectionRef.doc(
    'zncYjnoSGKUpAlqtCShzaPlg20Z2'
  );
  const alertCollectionRef = userDocumentRef.collection('alertas');

  return alertCollectionRef.add({
    detalhes: 'bla bla bla',
    descricao: 'Ipsum dolor...',
    titulo: 'Erro 404',
    ambiente: getRandomValueFrom(ambientes),
    origem: getRandomValueFrom(origens),
    coletadoPor: 'usuário XPTO',
    eventos: 2,
    level: getRandomValueFrom(leveis),
    criadoEm: new Date()
  });
});
