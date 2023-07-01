const path = require('path');
const express = require('express');
const { isLoggedIn } = require('./helpers');
const { Store, Waiting } = require('../models');
const router = express.Router();


// localhost:5000/waiting
// 가게 전체 조회
router.get('/', isLoggedIn, async (req, res, next) => {
    try {
        const stores = await Store.findAll({});
        res.render('store-list', {
            port: process.env.PORT,
            api: 'waiting/info',
            stores: stores.map(v => v) // storeId, name
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
});

// localhost:5000/waiting/info/:storeId
// 한 가게에 대한 대기 번호 조회
router.get('/info/:storeId', async (req, res, next) => {
    try {
        const waiting = await Waiting.findAll({
            where: { storeId: req.params.storeId }
        }, {
            include: { model: Store }
        });
        res.render('waiting', {
            storeId: req.params.storeId,
            port: process.env.PORT,
            waitingNum: waiting.length,
            waitings: waiting.map(v => v)
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
});

// localhost:5000/waiting/request/:storeId
// 웨이팅 신청하기
router.post('/request/:storeId', async (req, res, next) => {
    try {
        const waiting = await Waiting.create({
            userId: req.user.userId,
            storeId: req.params.storeId
        });
        res.send({
            result: 'success',
            message: "웨이팅 번호를 뽑는데 성공했습니다"
        })
        //res.json(waiting)
        //res.redirect('/');
    } catch (err) {
        console.error(err);
        next(err);
    }
});

// localhost:5000/waiting/view/:userId, 유저아이디도 필요함
router.get('/view/:userId', async (req, res, next) => {
    try {
        const waitings = await Waiting.findAll({
            where: { userId: req.user.userId },
            include: {
                model: Store
            }
        });
        if (!waitings) {
            res.send({
                result: 'fail',
                error: '예약목록이 없습니다'
            })
            //next('예약 목록이 없습니다!');
            return;
        }
        res.render('waiting-show', {
            port: process.env.PORT,
            userId: req.user.userId,
            waitings: waitings.map(v => v)
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
})

router.post('/cancel/:waitingId', isLoggedIn, async (req, res, next) => {
    try {
        const cancel = await Waiting.destroy({
            where: { waitingId: req.params.waitingId }
        });
        if (cancel) {
            res.send({
                result: 'success',
                message: '웨이팅 취소에 성공하셨습니다'
            })
            //res.redirect('/');
        }
        else res.send({
            result: 'fail',
            error: '웨이팅 취소에 실패하였습니다'
        })
        //next('웨이팅 취소에 실패하였습니다..');
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.get('/')

module.exports = router;
