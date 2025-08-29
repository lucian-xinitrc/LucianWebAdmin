import { NextResponse } from "next/server";
import { decrypt } from "./crypto.js";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

export async function GET() {
  try {
    const result = await pool.query(
      `SELECT email, subject, message, iv_email, iv_subject, iv_message, created_at
       FROM public.clients
       `
    );

    const decryptedRows = result.rows.map(row => ({
      email: decrypt(row.email, row.iv_email),
      subject: decrypt(row.subject, row.iv_subject),
      message: decrypt(row.message, row.iv_message),
      created: row.created_at
    }));

    return NextResponse.json(decryptedRows);
  } catch (err) {
    console.error("API Error", err);
    return NextResponse.json({ message: "Error fetching requests" }, { status: 500 });
  }
}
