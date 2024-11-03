


const { validateRequiredFields } = require("../middleware/validatorApi");
const moduleRECO    =   require('../model/gameVibes');
const axios         =   require('axios');

const GameVibesController = 
{
    recommended: async (req, res) => 
    {
        try 
        {
            const { mood, hour }    =   req.body;
            const requiredFields    =   ['mood', 'hour'];
            const validation        =   validateRequiredFields(req.body, requiredFields);

            if (!validation.success) 
            {
                return res.status(400).json({ message: validation.message, missingFields: validation.missingFields });
            }

            const apiUrl = await moduleRECO.select_recomendations(mood, hour);
            let getRecommended;

            try 
            {
                getRecommended = await axios.get(apiUrl);
            } 
            catch (error) 
            {
                return res.status(500).json({ message: 'Error fetching recommendations from API', error: error.message });
            }

            if (!Array.isArray(getRecommended.data)) 
            {
                return res.status(500).json('Invalid response format from API');
            }

            if (getRecommended.data.length === 0) 
            {
                return res.status(404).json('No games found with that criteria');
            }

            const filteredDataGameInfo = getRecommended.data.map(item => ({
                title: item.title,
                genre: item.genre,
                short_description: item.short_description,
            }));
            return res.status(200).json(filteredDataGameInfo);
        } 
        catch (error) 
        {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error', error: { message: error.message } });
        }
    }
}

module.exports = GameVibesController;
