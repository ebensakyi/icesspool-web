const Region = require('../db/models').Region;
const District = require('../db/models').District;




getRegionList = async (req, res) => {
    await Region.findAll().then(regions => res.status(200)
        .send({ statusCode: 1, message: 'Found', data: regions }))
        .catch(error => res.status(400).send(error));
}

getDistrictList = async (req, res) => {
    await District.findAll().then(districts => res.status(200)
        .send({ statusCode: 1, message: 'Found', data: districts }))
        .catch(error => res.status(400).send({ statusCode: 0, message: error }));
}

getDistrictListByRegion = async (req, res) => {
    const id = req.params.id
    if (!id) return res.status(400).send({ statusCode: 1, message: "RegionId not found" })

    await District.findAll({ where: { regionId: id } }).then(districts => res.status(200)
        .send({ statusCode: 1, message: 'Found', data: districts }))
        .catch(error => res.status(400).send({ statusCode: 0, message: error }));
}




module.exports = {
    getRegionList,
    getDistrictList,
    getDistrictListByRegion
}




