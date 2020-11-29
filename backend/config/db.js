import mongoose from 'mongoose'

const db = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useCreateIndex: true,
      useNewUrlParser: true
    })

    console.log(
      `Database connection successful: ${conn.connection.host}`.blue.inverse
        .underline
    )
  } catch (err) {
    console.error(err.message)
    process.exit(1)
  }
}

export default db
