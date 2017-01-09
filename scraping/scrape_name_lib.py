#!/usr/bin/env python
#coding=utf-8

import sys
import urllib2
from bs4 import BeautifulSoup

"""
Scraping data from website http://www.ximizi.com/QiMing_Hot.php
The Chinese name characters XXX and the fortune-telling evaluations from
http://www.ximizi.com/xingmingceshi.php?name=XXX webpages.
"""

try:
    page = urllib2.urlopen('http://www.ximizi.com/QiMing_Hot.php')
except:
    print('Failed to access website')

soup = BeautifulSoup(page, 'lxml')
all_links = soup.find_all("a")
for link in all_links:
    url = link.get("href")
    if 'xingmingceshi.php?name=' in url:
        # extract the chinese character
        hx = url.split('name=')[1].replace('%', '')
        uch = bytearray.fromhex(hx).decode('utf-8')
        print uch + ',' ,

        # go deeper extract the evaluation
        try:
            pg = urllib2.urlopen('http://www.ximizi.com/' + url)
        except:
            print('N/A')

        sp = BeautifulSoup(pg, 'lxml')
        al = sp.find_all("font", color="#009900")
        if not al:
            print('N/A')
        for l in al:
            print l.text
