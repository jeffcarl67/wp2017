from html.parser import HTMLParser  
from urllib.request import urlopen
import datetime,time,threading


class MyHTMLParser(HTMLParser):
    title = []
    url = []
    def handle_starttag(self, tag, attrs):
        if tag == "a":
            for attr in attrs:
                if attr[0] == 'class' and attr[1] == 'yt-uix-tile-link yt-ui-ellipsis yt-ui-ellipsis-2 yt-uix-sessionlink      spf-link ':
                    for attr in attrs:
                        if attr[0] == "title":
                            self.title.append(attr[1])
                        if attr[0] == "href":
                            self.url.append(attr[1])
                    

    def handle_endtag(self, tag):
        pass

    def handle_data(self, data):
        pass


def main():
    now = datetime.datetime.now()
    if now.second == 0:#整點執行
        print(str(now))
        youtubeThread().run()
    else:
        time.sleep(1)
    
def youtubeData():
    res = urlopen('https://www.youtube.com/feed/trending')
    html = res.read()
    parser = MyHTMLParser()
    parser.feed(html.decode('utf-8'))

    now = datetime.datetime.now()

    #print("start writing: " + str(now))
    f = open('youtube.txt','w',encoding='utf-8')
    try:
        #f.write('updata time:' + str(now) + '\n')
        for i in range(len(parser.title)):
            f.write(parser.title[i])
            f.write(' ')
            f.write(parser.url[i])
            f.write('\n')
    finally:
        f.close()

class youtubeThread(threading.Thread):
    def __init__(self):
        threading.Thread.__init__(self)
    def run(self):
        youtubeData()

if __name__ == "__main__":
    youtubeData()