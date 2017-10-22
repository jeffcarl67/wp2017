import datetime,time


if __name__ == "__main__":
    exec(open('youtube.py','r',encoding='utf-8').read())
    while True:
        now = datetime.datetime.now()
        if now.minute == 0 and now.second == 0:
            print(now)
            exec(open('youtube.py','r',encoding='utf-8').read())
        else:
            time.sleep(1)