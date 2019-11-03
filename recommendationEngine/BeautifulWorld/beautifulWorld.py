class BeautifulWorld:

    number_of_jokers = 20
    TERROR_MADNESS_MULTIPLIER = 100
    TERROR_DIMINISHING_RETURNS_MULTIPLIER = 90
    WEAPON_MADNESS_MULTIPLIER = 20

    def __init__(self, followers, victims):
        self.jokers = createJokers(followers, victims)

    def getMadnessScore(joker):
        chaos = 0
        for victim in joker.getVictims():
            timesTerrified = victim.getTimesTerrified()
            chaos += timesTerrified * TERROR_MADNESS_MULTIPLIER
            if timesTerrified > 2:
                chaos -= (timesTerrified - 2) * TERROR_DIMINISHING_RETURNS_MULTIPLIER
            follower = victim.getFollower()
            for weapon : follower.getWeapons():
                if victim.getFears().contains(weapon.getID()):
                    chaos += weapon.getTerror() * WEAPON_MADNESS_MULTIPLIER
        return chaos

    def createJokers(followers, victims):
        jokers = []
        for i in range(0, number_of_jokers):
            jokers.append(Joker(followers, victims))
        return jokers

    def getFollowers(followers):
        jokersFollowers = []
        for follower in follower:
            jokersFollowers.append(Follower(follower))
        return jokersFollowers

    def getVictims(victims):
        victims = []
        for victim in victims:
            victims.append(Victim(victim))
        return victims

    def getWeapons(skills):
        weapons = []
        for skill in skills:
            weapons.append(Weapon(skill))
        return weapons

    class Joker:
        def __init__(self, followers, victims):
            self.followers = getFollowers(followers)
            self.victims = getVictims(victims)

        def getVictims(self):
            return self.victims

        def getFollower(self):
            return self.followers

    class Follower:
        def __init__(self, follower):
            self.id = follower['id']
            self.weapons = getWeapons(follower['skills'])

        def getID(self):
            return self.id

        def getWeapons(self):
            return self.weapons

    class Weapon:
        def __init__(self, skill):
            self.id = skill['id']
            self.terror = skill['val']

        def getID(self):
            return self.id

        def getTerror(self):
            return self.terror


    class Victim:
        def __init__(self, victim):
            self.id = victim['id']
            self.fears = victim['interests']
            self.timesTerrified = 0
            self.follower = None

        def gotTerrified(self):
            self.timesTerrified += 1

        def setFollower(self, follower):
            self.follower = follower

        def getID(self):
            return self.id

        def getFears(self):
            return self.fears

        def getTimesTerrified(self):
            return self.timesTerrified

        def getFollower(self):
            return self.follower
