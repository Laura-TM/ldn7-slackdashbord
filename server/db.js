import { Pool } from "pg";

const dbUrl = process.env.DATABASE_URL || "postgres://localhost:5432/cyf";
console.log(dbUrl);
const pool = new Pool({
	connectionString: dbUrl,
	connectionTimeoutMillis: 5000,
	ssl: {
		rejectUnauthorized: false,
	},
});

export const connectDb = async () => {
	let client;
	try {
		client = await pool.connect();
	} catch (err) {
		console.error(err);
		process.exit(1);
	}
	console.log("Postgres connected to", client.database);
	client.release();
};

export const disconnectDb = () => pool.close();

export default { query: pool.query.bind(pool) };
