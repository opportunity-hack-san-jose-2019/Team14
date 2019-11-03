import heapq
 
class PriorityQueue:
    def __init__(self):
        self._queue = []
        self._index = 0
 
    def push(self, item, priority):
        heapq.heappush(self._queue, (-1 * priority, self._index, item))
        self._index += 1
 
    def pop(self):
        return heapq.heappop(self._queue)[-1]

    def empty(self):
        return len(self._queue) == 0

class Engine:

    class Volunteer:

        def __init__(self, v):
            if v is None:
                self.inEmptyRoom = True
                return
            self.inEmptyRoom = False
            self.id = v['id']
            self.skills = v['skills']

        def getID(self):
            return self.id if not self.inEmptyRoom else 'Waiting Room'

        def getSkills(self):
            return self.skills

        def emptyRoom(self):
            return self.inEmptyRoom


    class Participant:
        def __init__(self, p):
            self.id = p['id']
            self.skills = p['interests']
            self.interviewsDone = ['interviewsDone']

        def getID(self):
            return self.id

        def getNextSkillID(self, index):
            if(len(self.skills) > index):
                return self.skills[index]['id']
            return None

        def getInterviewsDone(self):
            return self.interviewsDone



    class SkillConfidence:

        def __init__(self, skill, confidence):
            self.skill = skill
            self.confidence = confidence

        def getConfidence(self):
            return self.confidence

        def getSkill(self):
            return self.skill['id']


    def getVolunteers(self, volunteers_data):
        volunteers = []
        for v in volunteers_data:
            volunteers.append(self.Volunteer(v))
        return volunteers

    def getParticipants(self, participants_data):
        participants = []
        for p in participants_data:
            participants.append(self.Participant(p))
        return participants

    def chooseVolunteer(self, pq, visited):
        volunteer =  self.Volunteer(None) if pq.empty() else pq.pop()
        while volunteer in visited:
            volunteer = self.Volunteer(None) if pq.empty() else pq.pop()
        return volunteer

    def getResult(self, volunteers_data, participants_data):
        buckets = dict()
        volunteers = self.getVolunteers(volunteers_data)
        participants = self.getParticipants(participants_data)
        for v in volunteers:
            for sc in self.getSkillConfidence(v):
                if sc.getSkill() not in buckets:
                    buckets[sc.getSkill()] = PriorityQueue()
                buckets[sc.getSkill()].push(v, (sc.getConfidence()))
        participantPQ = self.getSortedByInterviewsDone(participants)
        visited = set()
        pairing = []
        while not participantPQ.empty():
            participant = participantPQ.pop()
            participantSkillIndex = 0
            skillID = participant.getNextSkillID(participantSkillIndex)
            if skillID is not None:
                volunteerPQ = buckets[skillID] if skillID in buckets else PriorityQueue()
            volunteer = self.chooseVolunteer(volunteerPQ, visited)
            while volunteer.emptyRoom():
                participantSkillIndex += 1
                skillID = participant.getNextSkillID(participantSkillIndex)
                if skillID is None:
                    break
                volunteerPQ = buckets[skillID] if skillID in buckets else PriorityQueue()
                volunteer = self.chooseVolunteer(volunteerPQ, visited)
            if not volunteer.emptyRoom():
                visited.add(volunteer)
            pairing.append([participant.getID(), volunteer.getID()])
        return pairing

    def getSkillConfidence(self, v):
        skillswithconfidence = []
        for s in v.getSkills():
            skillswithconfidence.append(self.SkillConfidence(s, self.getConfidence(s, v.getSkills())))
        return skillswithconfidence

    def getConfidence(self, skill, skills):
        score = 0
        for s in skills:
            score += s['val']
        return skill['val']/score

    def getSortedByInterviewsDone(self, participants):
        pq = PriorityQueue()
        for p in participants:
            pq.push(p, p.getInterviewsDone())
        return pq
