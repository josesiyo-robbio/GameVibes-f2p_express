


const fs = require('fs');
const path = require('path');

class GameRecommendationService 
{
    constructor() 
    {
        this.moodList = this.loadMoods();
        this.hourTags = this.loadHours();
    }



    loadMoods() 
    {
        try 
        {
            const data = fs.readFileSync(path.join(__dirname, '../resources/moods.json'), 'utf-8');
            return JSON.parse(data);  //Returns an array of moods
        } 
        catch (error) 
        {
            console.error('Error loading moods:', error.message);
            return [];
        }
    }



    loadHours() 
    {
        try 
        {
            const data = fs.readFileSync(path.join(__dirname, '../resources/hours.json'), 'utf-8');
            return JSON.parse(data); //Returns an object with hours as keys
        } 
        catch (error) 
        {
            console.error('Error loading hours:', error.message);
            return {}; 
        }
    }



    getRecommendedTag(mood, hour) 
    {
        if (!mood || !hour || !this.hourTags[hour]) 
        {
            throw new Error('Invalid mood or hour provided.');
        }

        const selectedMood = this.moodList.find(m => m.name === mood);
        const category = this.getRandomFromList(selectedMood ? selectedMood.categories : []);
        const tag = this.getRandomFromList(this.hourTags[hour]);

        if (!category || !tag) 
        {
            throw new Error('Unable to generate recommendation due to missing category or tag.');
        }

        const apiUrl = "https://www.freetogame.com/api/filter?tag=";
        const platform = "&platform=pc";
        return `${apiUrl}${category}.${tag}${platform}`;
    }



    getRandomFromList(list) 
    {
        if (!list || list.length === 0) 
        {
            return null; 
        }
        const randomIndex = Math.floor(Math.random() * list.length);
        return list[randomIndex];
    }
}

module.exports = GameRecommendationService;
