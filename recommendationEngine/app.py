from flask import Flask
from engine import Engine
app = Flask(__name__)

@app.route('/')
def helloWorld():
    return 'hello world'

@app.route('/getResult', methods=['POST'])
def getResult():
    json_data = request.get_json()
    engine = Engine(json_data['volunteers'], json_data['students'])
    return 'done'

if __name__ == '__main__':
    app.run()
