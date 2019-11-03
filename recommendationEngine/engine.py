from queue import PriorityQueue
import set

class Engine:

    class Volunteer:

        def __init__(self, v):
            self.id = v['id']
            self.skills = v['skills']

        def getID():
            return self.id

        def getSkills():
            return self.skills


    class participant:
        def __init__(self, p):
            self.id = p['id']
            self.skills = p['interests']
            self.interviewsDone = ['interviewsDone']

        def getID(self):
            return self.id

        def getSkills(self):
            return self.skills

        def getInterviewsDone(self):
            return self.interviewsDone



    class SkillConfidence:

        def __init__(self, skill, confidence):
            self.skill = skill
            self.confidence = confidence

        def getConfidence(self):
            return self.confidence

        def getSkill(self):
            return self.skill


    def getVolunteers(volunteers_data):
        volunteers = []
        for v in volunteers_data:
            volunteer.append(Volunteer(v))
        return volunteers

    def getParticipants(participants_data):
        participants = []
        for p in participants_data:
            participants.append(Participants(p))
        return participants

    def getresult(self, volunteers_data, participants_data):
        volunteers = getVolunteers(volunteers_data)
        participants = getParticipants(participants_data)
        for v in volunteers:
            for sc in getSkillConfidence(v):
                if sc.getSkill() not in buckets:
                    buckets[sc.getSkill()] = PriorityQueue()
                buckets[sc.getSkill()].put((sc.getConfidence(), v))
        participantPQ = getSortedByInterviewsDone(participants)
        visited = set()
        pairing = []
        while not participantPQ.empty():
            participant = participantPQ.get()
            volunteerPQ = buckets[participant.getSkill()]
            volunteer = Volunteer(None) if len(volunteerPQ) == 0 else volunteerPQ.get()
            while volunteer in visited:
                volunteer = Volunteer(None) if len(volunteerPQ) == 0 else volunteerPQ.get()
            if not volunteer.emptyRoom():
                visited.add(volunteer)
            pairing.append([participant.getID(), volunteer.getID()])
        return pairing

    def getSkillConfidence(v):
        skillswithconfidence = []
        for s in v.getSkills():
            skillswithconfidence.append(SkillConfidence(s, getConfidence(s, v.getSkills())))
        return skillswithconfidence

    def getConfidence(skill, skills):
        score = 0
        for s in skills:
            score += s['val']
        return skill.['val']/score

    def getSortedByInterviewsDone(participants):
        pq = PriorityQueue()
        for p in participants:
            pq.add(p.getIntervewsDone(), p)
        return pq
