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
        this.points = undefined;
    }
}