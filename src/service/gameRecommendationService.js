const fs = require('fs');
const path = require('path');

class GameRecommendationService {
  constructor() {
    this.moodList = this.loadMoods();
    this.hourTags = this.loadHours();
  }

  loadMoods() {
    const data = fs.readFileSync(path.join(__dirname, '../resources/moods.json'), 'utf-8');
    return JSON.parse(data);
  }

  loadHours() {
    const data = fs.readFileSync(path.join(__dirname, '../resources/hours.json'), 'utf-8');
    return JSON.parse(data);
  }

  getRecommendedTag(mood, hour) {
    const selectedMood = this.moodList.find(m => m.name === mood);
    const category = this.getRandomFromList(selectedMood ? selectedMood.categories : []);
    const tag = this.getRandomFromList(this.hourTags[hour]);
    const result = `${category}.${tag}`;
    const apiUrl = "https://www.freetogame.com/api/filter?tag=";
    const platform =  "&platform=pc";
    return apiUrl+result+platform;
  }

  getRandomFromList(list) {
    if (!list || list.length === 0) {
      return '';
    }
    const randomIndex = Math.floor(Math.random() * list.length);
    return list[randomIndex];
  }
}

module.exports = GameRecommendationService;
