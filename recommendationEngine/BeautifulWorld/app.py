from flask import Flask
from beautifulWorld import BeautifulWorld
app = Flask(__name__)

@app.route('/')
def helloWorld():
    return 'hello world'

beautifulWorld = None

@app.route('/train', methods=['POST'])
def train():
    json_data = request.get_json()
    beautifulWorld = BeautifulWorld(json_data['volunteers'], json_data['students'])
    return 'done'

@app.route('/predict')
def predict():
    #predict
    return 'prediction'

if __name__ == '__main__':
    app.run()
