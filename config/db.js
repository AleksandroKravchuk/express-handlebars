const { connect } = require("mongoose");
const connectDB = async () => {
  try {
    const db = await connect(process.env.CONNECT_DB_URI);
    console.log(
      `MongoDb is connected on host:${db.connection.host}, on PORT:${db.connection.port}, db name:${db.connection.name}`
        .cyan.bold
    );
  } catch (error) {
    console.log(error.message.yellow);
    process.exit(1);
  }
};

module.exports = connectDB;
