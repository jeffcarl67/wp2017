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
    
def youtubeData():
    res = urlopen('https://www.youtube.com/feed/trending')
    html = res.read()
    parser = MyHTMLParser()
    parser.feed(html.decode('utf-8'))
    now = datetime.datetime.now()
    f = open('youtube.txt','w',encoding='utf-8')
    try:
        for i in range(len(parser.title)):
            f.write(parser.title[i])
            f.write(' ')
            f.write(parser.url[i])
            f.write('\n')
    finally:
        f.close()

if __name__ == "__main__":
    youtubeData()