const express = require('express')
const router = express.Router({ mergeParams: true })
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware.js')
const ExpressError = require('../utils/ExpressError')
const catchAsync = require('../utils/catchAsync')

const Review = require('../models/review')
const Campground = require('../models/campground')

const { reviewSchema } = require('../schemas.js')
const reviews = require('../controllers/reviews.js')

// /campgrounds/:id/reviews
router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview))

// /campgrounds/:id/reviews
router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview))

module.exports = router