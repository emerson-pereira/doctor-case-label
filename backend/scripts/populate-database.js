const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('dotenv').config({ path: '.env.development' })

const cases = require('../mock-data/cases.json');
const conditions = require('../mock-data/conditions.json');
const users = require('../mock-data/users.json');

async function run() {
  const host = process.env.APP_HOST;
  const user = process.env.DB_USER;
  const pass = process.env.DB_PASS;
  const port = process.env.DB_PORT;
  const dbName = process.env.DB_NAME;

  const conn = mongoose.createConnection(`mongodb://${user}:${pass}@${host}:${port}`, { dbName });

  const dummySchema = new Schema({}, { strict: false });

  const CaseModel = conn.model('Case', dummySchema);
  const ConditionModel = conn.model('Condition', dummySchema);
  const UserModel = conn.model('User', dummySchema);
  
  const newCases = await CaseModel.create(cases);
  console.log(`Cases: ${newCases.length}`);

  const newConditions = await ConditionModel.create(conditions);
  console.log(`Conditions: ${newConditions.length}`);

  const newUsers = await UserModel.create(users);
  console.log(`Users: ${newUsers.length}`);

  process.exit();
}

run().catch((error) => console.log(error.stack));
