

const GameRecommendationService = require('../service/gameRecommendationService');
const gameRecommendationService = new GameRecommendationService();

const GameVibes =
{
    select_recomendations : async (mood,hour) =>
    {
        try
        {
            const apiUrl =  gameRecommendationService.getRecommendedTag(mood,hour);
            console.log(apiUrl);
            return apiUrl;
        }
        catch (error)
        {
            console.error('Error:', error);
            throw error;
        }
    }
}


module.exports = GameVibes;