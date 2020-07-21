const DevSchema = require('../models/Dev');
const { index } = require('../models/utils/PointSchema');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
    async index(req, res, next) {
        try {
            const { latitude, longitude, techs } = req.query;

            const techsArray = parseStringAsArray(techs);

            const devs = await DevSchema.find({
                // $in = WHERE - mongodb Operator
                // $near = perto de um raio
                // $maxDistance = metros(10000) = 10 km
                techs: {
                    $in: techsArray,
                },
                location: {
                    $near: {
                        $geometry: {
                            type: 'Point',
                            coordinates: [longitude, latitude]
                        },
                        $maxDistance: 10000,
                    }
                }
            });    
            return res.json({ devs });
        
        } catch (error) {
            next(error)
        }



    }





}