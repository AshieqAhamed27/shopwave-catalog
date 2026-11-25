import dns from 'dns';
import mongoose from 'mongoose';

/**
 * Connect to MongoDB Atlas (or local MongoDB if configured).
 * Falls back gracefully to local JSON storage if MONGODB_URI is missing or unreachable
 * so the application and viva demo never crash offline.
 */
export async function connectDB() {
  const uri = process.env.MONGODB_URI;

  if (!uri || uri.includes('<username>') || uri.includes('<password>')) {
    console.warn('⚠️  MONGODB_URI not configured in .env — running with local JSON storage fallback.');
    return false;
  }

  // Fix Windows/router DNS SRV resolution issues with mongodb+srv:// URIs
  if (uri.startsWith('mongodb+srv://')) {
    dns.setServers(['8.8.8.8', '1.1.1.1']);
  }

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`✅ MongoDB Atlas Connected: ${conn.connection.host} (DB: ${conn.connection.name})`);
    return true;
  } catch (err) {
    console.warn(`⚠️  MongoDB connection failed (${err.message}). Falling back to local JSON storage.`);
    return false;
  }
}

export function isDBConnected() {
  return mongoose.connection.readyState === 1;
}
