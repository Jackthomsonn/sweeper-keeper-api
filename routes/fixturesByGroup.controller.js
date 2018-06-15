const YAML = require('yamljs');
const config = YAML.load('./config.yaml');
var request = require('request');

module.exports.getFixturesByGroupName = (groupName, callback) => {
  const groupFixtures = [];
  request.get(config.worldCupUrl + '/teams', (error, response, body) => {
    const teams = JSON.parse(body);
    const groupTeamCodes = teams.filter(team => team.group_letter === groupName).map(team => team.fifa_code);
    request.get(config.worldCupUrl + '/matches?by_date=asc', (error, response, body) => {
      const fixtures = JSON.parse(body);
      fixtures.forEach(fixture => {
        if (groupTeamCodes.includes(fixture.home_team.code) || groupTeamCodes.includes(fixture.away_team.code)) {
          groupFixtures.push(getGroupFixture(fixture));
        }
      });
      callback(groupFixtures);
    });
  });
}

function getGroupFixture(fixture) {
  return {
    date: fixture.datetime,
    location: `${fixture.location}, ${fixture.venue}`,
    team1: getTeamDetails(fixture.home_team),
    team2: getTeamDetails(fixture.away_team)
  }
}

function getTeamDetails(teamData) {
  return {
    name: teamData.country,
    owner: config.owners ? config.owners[teamData.code] : 'Jack\'s Mum',
    goals: teamData.goals,
    flag: config.flags ? config.flags[teamData.code] : '\u1F3F4'
  }
}