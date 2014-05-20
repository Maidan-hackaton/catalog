# -*- coding: utf-8 -*-
import urllib2, re

rank = 1
for i in range(1, 21):
  url = 'http://dir.meta.ua/ru/country/establishments/%s/' % i
  response = urllib2.urlopen(url)
  html = response.read().decode('cp1251').encode("utf-8")

  regex = """<a target=_blank title='(.*?)' class='site_info'.*?href='(.*?)'>(.*?)</a>.*?<a title=\"(.*?)\" rel=\"nofollow\" target='_blank' href='(.*?)'><h4>(.*?)</h4></a>.*?<div class='info'><span class=link>(.*?)</span>"""

  matches = re.findall(regex, html, re.MULTILINE | re.DOTALL)
  for match in matches:
    url = match[6].strip()
    name = match[5].strip()
    print "%s,\"%s\", %s" % (url, name, rank)
    rank += 1

