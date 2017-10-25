from flask import Flask
from flask import redirect
from flask import render_template
from flask import request
import datetime,random
from html import escape
app = Flask(__name__,static_folder='./')

@app.route('/<file>')
def s(file):
    return app.send_static_file(file)

@app.route('/')
def index():
    return app.send_static_file('index.html')

f = open('youtube.txt','r',encoding='utf-8')
line = f.readlines()
lastUpdate = datetime.datetime.now()


@app.route('/video')
def video():
    global lastUpdate,line
    abc = request.args.get('a',0,type=str)
    f = open('youtube.txt','r',encoding='utf-8')
    now = datetime.datetime.now()
    if (now.hour > lastUpdate.hour) or (now.day > lastUpdate.day) or (now.month > lastUpdate.month):
        try:
            print('read')
            line = f.readlines()
            lastUpdate = datetime.datetime.now()
        finally:
            f.close()
    return escape(line[random.randint(0,50)])

@app.route('/chat')
def chat():
    req = request.args.get('a',0,type=str)
    chat_file = open('chat.txt','a',encoding='utf-8')
    content = ''
    try:
        chat_file.write(req+'<br>')
    finally:
        chat_file.close()

    
    chat_file = open('chat.txt','r',encoding='utf-8')
    try:
        content = chat_file.read()
    finally:
        chat_file.close()
    return escape(content)

#@app.route('/user/<name>')
#def user(name):
#    return render_template('user.html', name=name)

@app.route('/chat_content')
def chat_content():
    content = ''
    chat_file = open('chat.txt','r',encoding='utf-8')
    try:
        content = chat_file.read()
    finally:
        chat_file.close()
    return escape(content)

@app.route('/re')
def re():
    return redirect("http://www.google.com")

if __name__ == '__main__':
    app.run(host='0.0.0.0',port=12215,debug=True,threaded=True)