from flask import Flask, jsonify # type: ignore
from config import SessionLocal
from models import Task

app = Flask(__name__)

@app.route('/')
def hello():
    return "Hello from the LaundryMoneyAlly API!"

@app.route('/tasks', methods=['GET'])
def get_tasks():
    session = SessionLocal()
    tasks = session.query(Task).all()
    session.close()
    return jsonify([{"id": task.id, "name": task.name, "reward": task.reward} for task in tasks])

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
