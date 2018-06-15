require('./GroupResponse.js');
const fixturesByGroupController = require('./routes/fixturesByGroup.controller');
const YAML = require('yamljs');
const config = YAML.load('./config.yaml');

module.exports.convertApiDataToGroupResponse = (teamResults, groupLetter, response) => {
    convertApiDataToGroupResponse( teamResults, groupLetter, response);
}

function convertApiDataToGroupResponse( teamResults, groupLetter, response) {
    var groupResponse = new GroupResponse("Group " + groupLetter);
    
    var teamResultsForSelectedGroup = teamResults.filter(entry => entry.group_letter === groupLetter);

    if (teamResultsForSelectedGroup.length != 0) {
        var tableTeams = [];

        teamResultsForSelectedGroup.forEach((team) => {
            var groupTableEntry = new GroupTableEntry();

            groupTableEntry.name = team.country;
            groupTableEntry.points = team.points;
            groupTableEntry.wins = team.wins;
            groupTableEntry.losses = team.losses;
            groupTableEntry.draws = team.draws;
            groupTableEntry.goalsFor = team.goals_for;
            groupTableEntry.goalAgainst = team.goals_against;
            groupTableEntry.goalDifference = team.goal_differential;
            groupTableEntry.owner = config.owners[team.fifa_code];

            tableTeams.push(groupTableEntry);
        })

        groupResponse.table = tableTeams;


    }

    fixturesByGroupController.getFixturesByGroupName(groupLetter, (fixtures) => {
        groupResponse.fixtures = fixtures;
        response.setHeader('Content-Type', 'application/json');
        response.send(JSON.stringify(groupResponse));
    })
}

class GroupResponse {
    constructor(groupName) {
        this.groupName = groupName;
        this.fixtures = [];
        this.table = [];
    }
}

class Fixture {
    constructor(team1, team2) {
        this.team1 = team1;
        this.team2 = team2;
    }
}

class FixtureTeam {
    constructor() {
        this.name = undefined;
        this.owner = undefined;
        this.goals = undefined;
        this.flag = undefined;
    }
}

class GroupTableEntry {
    constructor() {
        this.name = undefined;
        this.owner = undefined;
        this.wins = undefined;
        this.draws = undefined;
        this.losses = undefined;
        this.goalsFor = undefined;
        this.goalAgainst = undefined;
        this.goalDifference = undefined;
        this.points = undefined;
    }
}