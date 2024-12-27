module.exports = {
    env: 'production',
    mongodb: {
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        }
    },
    email: {
        pool: true,
        maxConnections: 5,
        maxMessages: Infinity,
        rateDelta: 1000,
        rateLimit: 5
    },
    security: {
        rateLimits: {
            windowMs: 15 * 60 * 1000,
            max: 100
        },
        cors: {
            origins: ['https://isbec.com', 'https://www.isbec.com'],
            credentials: true
        }
    },
    server: {
        timeout: 30000,
        keepAliveTimeout: 65000
    }
};
