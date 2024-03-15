const { uuid } = require('uuidv4')
const Redis = require('ioredis')
const express = require('express')

const app = express()
app.use(express.json())





// ���� Redis ʵ��
const connectRedis = () => {
    return new Redis()
}

// ��һ��Ư��ƿ
app.post('/', (req, res, next) => {
    try {
        res.send('post /')
    } catch (error) {
        next(error)
    }
})

// ��һ��Ư��ƿ
app.get('/', (req, res, next) => {
    try {
        res.send('get /')
    } catch (error) {
        next(error)
    }
})

// ͳһ�����쳣
app.use((err, req, res, next) => {
    res.status(500).json({
        error: err.message
    })
})

app.listen(3000, () => {
    console.log('runnning')
})


//��ͬ����
// ��һ��Ư��ƿ
app.post('/', async (req, res, next) => {
    try {
        const bottle = req.body

        // ����ʱ���
        bottle.time = bottle.time || Date.now()

        // Ϊÿ��Ư��ƿ�������һ�����ظ���id
        const bottleId = uuid()

        const type = {
            male: 0,
            female: 1
        }

        await redis
            .pipeline()
            // ���������л����ݿ�
            .select(type[bottle.type])
            // �����ݴ�Ϊ Hash
            .hmset(bottleId, bottle)
            // ���� 1 ����Ч��
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


//��ͬ����
// ��һ��Ư��ƿ
app.get('/', async (req, res, next) => {
    try {
        const query = req.query

        const type = {
            all: Math.round(Math.random()),
            male: 0,
            female: 1
        }

        query.type = query.type || 'all'

        // ���������л����ݿ�
        await redis.select(type[query.type])

        // �����ȡһ�� key
        const bottleId = await redis.randomkey()

        if (!bottleId) {
            res.status(200).json({
                message: '�󺣺ܸɾ�...'
            })
        }

        // ����Ư��ƿ id ��ȡ������Ư��ƿ��Ϣ
        const bottle = await redis.hgetall(bottleId)

        res.status(201).json({
            bottle
        })

        // �� Redis ��ɾ���񵽵�Ư��ƿ
        redis.del(bottleId)
    } catch (error) {
        next(error)
    }
})
