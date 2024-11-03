


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
            console.error('Error while selecting recommendations URL:', { mood, hour, error: error.message });
            throw new Error('Failed to retrieve recommendations URL'); 
        }
    }
}


module.exports = GameVibes;