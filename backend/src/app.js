// src/app.js (diagnostic-safe)
const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(express.json());
app.use(morgan('dev'));

// --- list the route/middleware modules you normally import here ---
const moduleMap = {
  authRoutes: './routes/authRoutes',
  userRoutes: './routes/userRoutes',
  doctorRoutes: './routes/doctorRoutes',
  appointmentRoutes: './routes/appointmentRoutes',
  // add any other imports you have below, e.g.
  // extraMiddleware: './middlewares/customMiddleware',
};

// helper inspector
function inspect(name, mod) {
  const t = typeof mod;
  const ctor = mod && mod.constructor ? mod.constructor.name : 'none';
  const isRouter = mod && typeof mod === 'function' && (mod.name === 'router' || ctor === 'Function' || ctor === 'Router');
  console.log(`INSPECT -> ${name}: typeof='${t}' constructor='${ctor}' isArray='${Array.isArray(mod)}'`);
  if (mod && typeof mod === 'object') {
    // preview keys to help spot { router } or { default: router } patterns
    console.log(`  keys: ${Object.keys(mod).slice(0,10).join(', ') || '(none)'}${Object.keys(mod).length > 10 ? ' ...' : ''}`);
  }
  return isRouter || typeof mod === 'function';
}

// load modules and inspect them
const loaded = {};
for (const [key, path] of Object.entries(moduleMap)) {
  try {
    const mod = require(path);
    loaded[key] = mod;
    inspect(key, mod);
  } catch (err) {
    console.error(`ERROR loading ${key} from "${path}":`, err.message);
    loaded[key] = null;
  }
}

// helper to fix common export shapes
function resolveRouter(mod) {
  if (!mod) return null;
  if (typeof mod === 'function') return mod;   // router or middleware function
  if (mod instanceof express.Router) return mod;
  // common mistaken exports: { router } or { default: router }
  if (mod.router && typeof mod.router === 'function') return mod.router;
  if (mod.default && typeof mod.default === 'function') return mod.default;
  // if it's an object with a 'routes' or similar, return null so we skip
  return null;
}

// register only valid routers/middleware
for (const [key, mod] of Object.entries(loaded)) {
  const router = resolveRouter(mod);
  if (router) {
    // choose path names by key (you can change these)
    const mountPath = key === 'authRoutes' ? '/api/auth'
                    : key === 'userRoutes' ? '/api/users'
                    : key === 'doctorRoutes' ? '/api/doctors'
                    : key === 'appointmentRoutes' ? '/api/appointments'
                    : `/${key}`;
    console.log(`MOUNT -> ${key} at path "${mountPath}"`);
    app.use(mountPath, router);
  } else if (mod === null) {
    console.log(`SKIP -> ${key} (failed to load)`);
  } else {
    console.warn(`SKIP -> ${key} (not a function/router). Common causes: module.exports = { router } OR exported object with named exports. Fix: export the express Router directly using "module.exports = router".`);
  }
}

// basic routes
app.get('/health', (req, res) => res.json({ status: 'ok', uptime: process.uptime() }));

// fallback 404
app.use((req, res) => res.status(404).json({ message: 'Not Found' }));

module.exports = app;
