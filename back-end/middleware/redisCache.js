import { Redis } from '@upstash/redis'

const redis = Redis.fromEnv()

/**
 * Cache-aside middleware factory.
 *
 * Usage: cacheMiddleware("created_events", 300)
 *
 * Flow:
 *   HIT  → return cached JSON immediately, skip controller
 *   MISS → let the request reach the controller; intercept res.json
 *          so the response data is written to Redis before being sent
 *
 * @param {string} keyPrefix  - Redis key prefix (key = `${keyPrefix}:${user_id}`)
 * @param {number} ttlSeconds - Cache TTL in seconds (default: 5 minutes)
 */
export function cacheMiddleware(keyPrefix, ttlSeconds = 300) {
    return async (req, res, next) => {
        const userId = req.user.id
        const cacheKey = `${keyPrefix}:${userId}`

        try {
            const cached = await redis.get(cacheKey)

            if (cached !== null) {
                // CACHE HIT — respond immediately from Redis
                console.log(`[Cache HIT]  ${cacheKey}`)
                return res.status(200).json(cached)
            }

            // CACHE MISS — intercept res.json before calling next()
            console.log(`[Cache MISS] ${cacheKey}`)

            const originalJson = res.json.bind(res)

            res.json = async (data) => {
                // Write to Redis in the background, then send the response
                try {
                    await redis.set(cacheKey, data, { ex: ttlSeconds })
                    console.log(`[Cache SET]  ${cacheKey} (TTL: ${ttlSeconds}s)`)
                } catch (cacheErr) {
                    // Cache write failure should never break the response
                    console.error(`[Cache SET error] ${cacheKey}`, cacheErr)
                }
                return originalJson(data)
            }

            next()
        } catch (err) {
            // If Redis is unreachable, fall through to the controller normally
            console.error(`[Cache error] ${cacheKey}`, err)
            next()
        }
    }
}

export { redis }
