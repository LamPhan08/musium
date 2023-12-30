const Explore = require('../models/Explore')

const getExplore = async (req, res) => {
    try {
        const exploreData = await Explore.findOne();

        res.json(exploreData)
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = {getExplore};