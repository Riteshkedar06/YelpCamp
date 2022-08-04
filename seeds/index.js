const mongoose = require('mongoose');
const cities = require('./cities')
const { places, desciptiors } = require('./seedHelpers')
const Campground = require("../models/campground");

mongoose.connect('mongodb://localhost:27017/yelp-camp')

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connextions error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i <= 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '62cd79015c9977b193f63052',
            location: `${cities[random1000].city},${cities[random1000].state}`,
            title: `${sample(desciptiors)} ${sample(places)}`,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]

            },
            images: [
                {
                    url: 'https://res.cloudinary.com/riteshcloud/image/upload/v1658936348/YelpCamp/yijtr0ayllhaczcehvnw.jpg',
                    filename: 'YelpCamp/yijtr0ayllhaczcehvnw',
                }
            ],
            description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores, consectetur. Pariatur ipsa fugiat, perferendis odio distinctio accusamus architecto eveniet numquam assumenda libero illum corrupti sapiente autem! Adipisci est nobis expedita!",
            price
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close()
});