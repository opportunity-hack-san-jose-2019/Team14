import csv
import json
import requests
import random

class Person:
    def __init__(self, full_name, first_name, last_name, cohort, evening, location, phone, email, interests, attendence, module_score, project_score, bonus, total_score):
        self.full_name = full_name
        self.password = 'password'
        self.first_name = first_name
        self.last_name = last_name
        self.cohort = cohort
        self.evening = evening
        self.location = location
        self.phone = phone
        self.email = first_name + last_name + "saltsowedontsendemailstorealpeople@gmail.com"
        self.interests = interests
        self.attendence = attendence
        self.module_score = module_score
        self.project_score = project_score
        self.bonus = bonus
        self.total_score = total_score

class Volunteer:
    def __init__(self,full_name,email,phone,cancelled,notes,vip,station,day,event_location,employer,title_industry,city_state,career_fields):
        self.full_name = full_name
        self.email = full_name + "saltsowedontsendemailstorealpeople@gmail.com"
        self.password = 'password'
        self.phone = phone
        self.cancelled = cancelled
        self.notes = notes
        self.vip = vip
        self.station = station
        self.day = day
        self.event_location = event_location
        self.employer = employer
        self.title_industry = title_industry
        self.city_state = city_state
        self.career_fields = career_fields

class Skill:
    def __init__(self, name):
        self.skill_name = name
        self.skill_level = random.randint(1, 10)


with open('volunteers.csv') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    line_count = 0
    for row in csv_reader:
        if line_count == 0:
            # print(f'Column names are {", ".join(row)}')
            line_count += 1
        else:
            full_name = row[0]
            email = row[1]
            phone = row[2]
            cancelled = True if row[3] == "TRUE" else False
            notes = row[4]
            vip = True if row[5] == "TRUE" else False
            station = row[6]
            day = row[7]
            event_location = row[8]
            employer = row[9]
            title_industry = row[10]
            city_state = row[11]
            career_fields = row[12]
            career_fields = [json.dumps(Skill(i.strip()).__dict__) for i in career_fields.split(';')]
            career_fields.pop()
            print(career_fields)
            volunteer = Volunteer(full_name,email,phone,cancelled,notes,vip,station,day,event_location,employer,title_industry,city_state,career_fields)
            # print(json.dumps(volunteer.__dict__))
            answers = json.loads(json.dumps(volunteer.__dict__))
            r = requests.post('http://localhost:8080/volunteer/register', json=answers)
            print(r.status_code)
            line_count += 1




# with open('students.csv') as csv_file:
#     csv_reader = csv.reader(csv_file, delimiter=',')
#     line_count = 0
#     for row in csv_reader:
#         if line_count == 0:
#             # print(f'Column names are {", ".join(row)}')
#             line_count += 1
#         else:
#             full_name = row[0]
#             first_name = row[1]
#             last_name = row[2]
#             cohort = row[3]
#             evening = row[4]
#             location = row[5]
#             phone = row[6]
#             email = row[7]
#             interests = row[8]
#             interests_list = [i.strip() for i in interests.split(';')]
#             interests_list.pop()
#             interests = interests_list
#             attendence = row[9]
#             module_score = row[10]
#             project_score = row[11]
#             bonus = row[12]
#             total_score = row[13]
#             person = Person(full_name, first_name, last_name, cohort, evening, location, phone, email, interests, attendence, module_score, project_score, bonus, total_score)
#             print(json.dumps(person.__dict__))
#             json_string = "{" + "full_name:" + "\"" + full_name + "\"," + " first_name:" + "\"" + first_name + "\", " + " last_name:" + "\"" + last_name + "\","  + " cohort:" + "\"" + cohort + "\"," + " evening:" + "\"" + evening + "\"," " location:" + "\"" + location + "\"," + " phone:" + "\"" + phone + "\"," " email:" + "\"" + email + "\"," " interests:" + str(interests_list) + "," " attendence:" + attendence + "," " module_score:" + module_score + "," " project_score:" + project_score + "," " bonus:0" "," " total_score:" + total_score + "}"
#             # print(json_string)
#             # headers = {'Content-type': 'application/json'}
#             answers = json.loads(json.dumps(person.__dict__))
#             r = requests.post('http://localhost:8080/student/register', json=answers)
#             print(r.status_code)
#             line_count += 1