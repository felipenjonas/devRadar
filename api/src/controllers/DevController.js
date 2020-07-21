const DevSchema = require('../models/Dev');
const axios = require('axios');
const { create } = require('../models/Dev');
const { index } = require('../models/utils/PointSchema');
const Dev = require('../models/Dev');

const parseStringAsArray = require('../utils/parseStringAsArray');


module.exports = {

    async index(req, res) {
        const devs = await Dev.find();
        return res.json(devs);
    },

    async store(req, res, next) {

        try {
            const { github_username, techs, latitude, longitude } = req.body;

            let dev = await DevSchema.findOne({ github_username });

            if (dev) {
                res.json({ "error": "Este Dev já esta cadastrado" })

            } else {
                const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);

                // Se name não exisistir então pega login e colocar no lugar
                const { name = login, avatar_url, bio } = apiResponse.data;

                const techsArray = parseStringAsArray(techs)

                const location = {
                    type: 'Point',
                    coordinates: [longitude, latitude],
                };

                dev = await DevSchema.create({
                    github_username,
                    name,
                    avatar_url,
                    bio,
                    techs: techsArray,
                    location
                })
            }

            // console.log(name, avatar_url, bio, github_username);
            return res.json(dev)

        } catch (error) {
            next(error)
        }


    }

}