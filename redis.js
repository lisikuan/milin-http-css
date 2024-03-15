const { uuid } = require('uuidv4')
const Redis = require('ioredis')
const express = require('express')

const app = express()
app.use(express.json())





// 创建 Redis 实例
const connectRedis = () => {
    return new Redis()
}

// 扔一个漂流瓶
app.post('/', (req, res, next) => {
    try {
        res.send('post /')
    } catch (error) {
        next(error)
    }
})

// 捡一个漂流瓶
app.get('/', (req, res, next) => {
    try {
        res.send('get /')
    } catch (error) {
        next(error)
    }
})

// 统一处理异常
app.use((err, req, res, next) => {
    res.status(500).json({
        error: err.message
    })
})

app.listen(3000, () => {
    console.log('runnning')
})


//不同代码
// 扔一个漂流瓶
app.post('/', async (req, res, next) => {
    try {
        const bottle = req.body

        // 设置时间戳
        bottle.time = bottle.time || Date.now()

        // 为每个漂流瓶随机生成一个不重复的id
        const bottleId = uuid()

        const type = {
            male: 0,
            female: 1
        }

        await redis
            .pipeline()
            // 根据类型切换数据库
            .select(type[bottle.type])
            // 将数据存为 Hash
            .hmset(bottleId, bottle)
            // 设置 1 天有效期
            .expire(bottleId, 24 * 60 * 60)
            .exec()

        res.status(201).json({
            bottle: {
                id: bottleId,
                ...bottle
            }
        })
    } catch (error) {
        next(error)
    }
})


//不同代码
// 捡一个漂流瓶
app.get('/', async (req, res, next) => {
    try {
        const query = req.query

        const type = {
            all: Math.round(Math.random()),
            male: 0,
            female: 1
        }

        query.type = query.type || 'all'

        // 根据类型切换数据库
        await redis.select(type[query.type])

        // 随机获取一个 key
        const bottleId = await redis.randomkey()

        if (!bottleId) {
            res.status(200).json({
                message: '大海很干净...'
            })
        }

        // 根据漂流瓶 id 获取完整的漂流瓶信息
        const bottle = await redis.hgetall(bottleId)

        res.status(201).json({
            bottle
        })

        // 从 Redis 中删除捡到的漂流瓶
        redis.del(bottleId)
    } catch (error) {
        next(error)
    }
})
