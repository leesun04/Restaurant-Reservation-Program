const path = require('path');
const express = require('express');
const { isLoggedIn } = require('./helpers');
const { Review, Store } = require('../models');
const { json } = require('sequelize');
const router = express.Router();

// localhost:5000/review/show
router.get('/show', async (req, res, next) => {
    try {
        const stores = await Store.findAll({});
        res.render('review', {
            port: process.env.PORT,
            stores: stores.map(v => v)
        })
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.get('/show/:storeId', async (req, res, next) => {//???왜 에러??
    try {
        const reviews = await Review.findAll({
            where: { storeId: req.params.storeId }
        });
        res.render('review/review-show', {
            reviews: reviews.map(v => v),
            port: process.env.PORT,
            userId: req.user.userId
        })
        // res.json('review/review-show',{
        //     result: 'success',
        //     message: '식당 리뷰 조회에 성공했습니다',
        //     reviews 
        // })
    } catch (err) {
        console.error(err);
        next(err);
    }
});

// localhost:5000/review/write
router.route('/write/:storeId')
    .get((req, res) => {
        res.render('review/review-write', {
            port: process.env.PORT,
            storeId: req.params.storeId
        });

    })
    .post(async (req, res, next) => {
        try {
            const review = await Review.create({
                review: req.body.review,
                storeId: req.params.storeId,
                userId: req.user.userId
            });
            if (!review) {
                next({
                    result: 'error',
                    error: '작성에 실패하였습니다'
                });
                return;
            }

            res.send({
                result: 'success',
                message: '리뷰 작성에 성공하였습니다',
                review
            })
        } catch (err) {
            console.error(err);
            next(err);
        }
    });

// localhost:5000/review/delete
router.get('/delete/:reviewId', async (req, res, next) => {
    try {
        const review = Review.destroy({
            where: { reviewId: req.params.reviewId }
        });
        if (review) res.send({
            result: 'success',
            message: '리뷰 삭제에 성공하였습니다'
        })
        //res.redirect('/');
        else res.send({
            result: 'fail',
            error: '리뷰 삭제에 실패하였습니다'
        }) 
        //next('리뷰 삭제 실패!');
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;