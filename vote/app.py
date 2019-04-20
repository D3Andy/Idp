from flask import Flask, render_template, request, make_response, g
from redis import Redis
import os
import socket
import random
import json

option_a = os.getenv('OPTION_A', "Road")
option_b = os.getenv('OPTION_B', "Offroad")
option_c = os.getenv('OPTION_C', "Both")
height_a = os.getenv('HEIGHT_A', "150-170 cm")
height_b = os.getenv('HEIGHT_B', "170-190 cm")
height_c = os.getenv('HEIGHT_C', "190-200 cm")
way_a = os.getenv('WAY_A', "Flat")
way_b = os.getenv('WAY_B', "Mostly Flat")
way_c = os.getenv('WAY_C', "Some hills")
way_d = os.getenv('WAY_D', "Some Mountain roads")
fit_a = os.getenv('FIT_A', "Amator")
fit_b = os.getenv('FIT_B', "Good")
fit_c = os.getenv('FIT_C', "Competitive")
hostname = socket.gethostname()

app = Flask(__name__)

def get_redis():
    if not hasattr(g, 'redis'):
        g.redis = Redis(host="redis", db=0, socket_timeout=5)
    return g.redis

@app.route("/", methods=['POST','GET'])
def hello():
    voter_id = request.cookies.get('voter_id')
    if not voter_id:
        voter_id = hex(random.getrandbits(64))[2:-1]

    vote = None

    if request.method == 'POST':
        redis = get_redis()
        vote = request.form['vote']
        data = json.dumps({'voter_id': voter_id, 'vote': vote})
        redis.rpush('votes', data)

    resp = make_response(render_template(
        'index.html',
        option_a=option_a,
        option_b=option_b,
	option_c=option_c,
	height_a=height_a,
	height_b=height_b,
	height_c=height_c,
	way_a=way_a,
	way_b=way_b,
	way_c=way_c,
	way_d=way_d,
	fit_a=fit_a,
	fit_b=fit_b,
	fit_c=fit_c,
        hostname=hostname,
        vote=vote,
    ))
    resp.set_cookie('voter_id', voter_id)
    return resp


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=80, debug=True, threaded=True)
