const mongoose = require('mongoose')
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers')
const Campground = require('../models/campground')

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp')

const db = mongoose.connection
db.on('error', console.error.bind(console, "connection error:"))
db.once("open", () => {
    console.log("Databse connected")
})

const sample = (array) => array[Math.floor(Math.random() * array.length)]


const seedDB = async () => {
    await Campground.deleteMany({})
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000)
        const randomPrice = Math.floor(Math.random() * 30) + 10
        const camp = new Campground({
            author: '678b7ba5f269437f43134289',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus laborum officiis sint voluptatibus. Quis assumenda, quibusdam soluta ea provident laboriosam dolorem iure totam accusamus fuga animi cupiditate laudantium odio et!",
            price: randomPrice,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                // {
                //     url: 'https://res.cloudinary.com/dxohzdvbu/image/upload/v1739598946/YelpCamp/cfr09aqb9rdbvmgf5x0q.jpg',
                //     filename: 'YelpCamp/cfr09aqb9rdbvmgf5x0q',
                // },
                {
                    url: 'https://res.cloudinary.com/dxohzdvbu/image/upload/v1739598946/YelpCamp/gkwuwvpojjc2emafckla.jpg',
                    filename: 'YelpCamp/gkwuwvpojjc2emafckla',
                }
                // ,
                // {
                //     url: 'https://res.cloudinary.com/dxohzdvbu/image/upload/v1739598946/YelpCamp/xbch5jc3kbui9t9bvegh.jpg',
                //     filename: 'YelpCamp/xbch5jc3kbui9t9bvegh',
                // }
            ]
        })
        await camp.save()
    }
}

seedDB().then(() => {
    mongoose.connection.close()
})