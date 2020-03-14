const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

const db = admin.firestore();

const ambientes = ['Produção', 'Homologação', 'Desenvolvimento'];
const origens = ['127.0.0.1', '10.0.1.1', 'app.server.com.br'];
const errors = [
  {
    titulo: 'TypeError: undefined is not a function',
    descricao: 'this.foo is not a function',
    detalhes: '- at <anonymous>:2:6',
    level: 'error'
  },
  {
    titulo: 'TypeError: null is not a object',
    descricao: 'evaluating foo.length',
    detalhes: '- at <anonymous>1:2',
    level: 'error'
  },
  {
    titulo: 'CORS error',
    descricao: 'Access-Control-Allow-Origin: http://foo.example, http://foo.example',
    detalhes: '- at index.js',
    level: 'debug'
  },
  {
    titulo: 'Uncaught RangeError',
    descricao: 'Maximum call stack is exceeded',
    detalhes: '- at recurse (<anonymous>:2:17)',
    level: 'warning'
  },
  {
    titulo: 'ReferenceError: event is not defined',
    descricao: 'foo is not defined',
    detalhes: '- at <anonymous>:4:13',
    level: 'warning'
  }
]

const getRandomValueFrom = array => {
  return array[Math.floor(Math.random() * array.length)];
};


exports.createUserData = functions.https.onRequest((request, response) => {
  const error = getRandomValueFrom(errors);
  const payload = {
    titulo: error.titulo,
    detalhes: error.detalhes,
    descricao: error.descricao,
    ambiente: getRandomValueFrom(ambientes),
    origem: getRandomValueFrom(origens),
    coletadoPor: 'usuário XPTO',
    eventos: Math.floor(Math.random() * 3000),
    level: error.level,
    criadoEm: new Date(),
    arquivado: false
  };
  const userId = request.url.substr(1);

  const usersCollectionRef = db.collection('usuários');
  const userDocumentRef = usersCollectionRef.doc(userId);
  const alertCollectionRef = userDocumentRef.collection('alertas');

  response.send(
    `Os dados ${JSON.stringify(payload)} serão inseridos no usuário: ${userId}`
  );
  return alertCollectionRef.add({ ...payload });
});

exports.createUser = functions.auth.user().onCreate(async user => {
  const payload = {
    titulo: 'Alerta de exemplo',
    descricao: 'Este é um exemplo de alerta, fique a vontade para apaga-lo',
    detalhes: 'Este detalhe é apenas um exemplo',
    ambiente: getRandomValueFrom(ambientes),
    origem: getRandomValueFrom(origens),
    coletadoPor: 'usuário XPTO',
    eventos: Math.floor(Math.random() * 3000),
    level: 'debug',
    criadoEm: new Date(),
    arquivado: false
  };
  const { uid, email } = user;

  const usersCollectionRef = db.collection('usuários');
  const userAlertCollectionRef = usersCollectionRef
    .doc(uid)
    .collection('alertas');

  await usersCollectionRef.doc(uid).set({ email });
  return userAlertCollectionRef.doc('example').set({
    ...payload,
  });
});
