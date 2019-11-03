from flask import Flask
from engine import Engine
import pprint
import json
from flask import request
app = Flask(__name__)

@app.route('/')
def helloWorld():
    return 'hello world'

@app.route('/getResult', methods=['POST'])
def getResult():
    json_data = request.get_json()
    
    engine = Engine()
    result = engine.getResult(json_data['volunteers'], json_data['students'])
    return json.dumps(result)

if __name__ == '__main__':
    app.run()
