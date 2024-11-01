const GameVibes = require("../model/gameVibes");
const moduleRECO = require('../model/gameVibes');
const {validateRequiredFields} = require("../middleware/validatorApi");
const axios = require('axios');


const GameVibesController =
{
    recommended : async (req, res) =>
    {

        try
        {
            let requiredFields;
            const {mood,hour} = req.body;
            requiredFields = ['mood','hour'];
            const validation = validateRequiredFields(req.body, requiredFields);

            if (!validation.success)
            {
                res.status(400).json({message: validation.message, missingFields: validation.missingFields});
                return;
            }

            const apiUrl = await  moduleRECO.select_recomendations(mood,hour);

            const getRecommended = await axios.get(apiUrl);

            if (!Array.isArray(getRecommended.data))
            { res.status(400).json('Invalid response format from API');
                return;
            }

            if (!getRecommended.data)
            {
                res.status(400).json('games not found with that criteria');
            }

            const filteredDataGameInfo = getRecommended.data.map( item => ({
                title: item.title,
                genre : item.genre,
                short_description: item.short_description,
            }))
            return res.status(200).json(filteredDataGameInfo);
        }
        catch (error)
        {
            console.log(error);
            res.status(500).json({ message: 'Error', error: { message: error.message } });
        }
    }

}


module.exports = GameVibesController;