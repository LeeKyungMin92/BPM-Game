from json.decoder import JSONDecodeError
from django.core.exceptions import ObjectDoesNotExist
from django.shortcuts import render
from django.http import HttpResponse, HttpResponseNotAllowed, HttpResponseBadRequest, JsonResponse, response
from django.views.decorators.csrf import csrf_exempt
from django_redis import get_redis_connection

import json

from .models import Bpm_100, Bpm_120, Bpm_150, Bpm_180


rankings = {100: Bpm_100, 120: Bpm_120, 150: Bpm_150, 180: Bpm_180}
rcache = get_redis_connection("default")


@csrf_exempt
def manage_ranking(request, bpm):
  if bpm in rankings: 
    ranking = rankings[bpm]
  else:
    return HttpResponseBadRequest('Invalid BPM.')
  
  if request.method == 'GET':
    # list for json response
    ranking_response = []
    # get from cache
    ranking_in_redis = list(rcache.zrevrange(bpm, 0, -1, withscores=True))
    # set cache if cache is empty
    if not ranking_in_redis:
      ranking_all_list = list(ranking.objects.all())
      for r in ranking_all_list:
        rcache.zadd(bpm, {r.id : r.accuracy})
      ranking_in_redis = list(rcache.zrevrange(bpm, 0, -1, withscores=True))
    for i in ranking_in_redis:
      ranking_response.append({'accuracy' : i[1]})
    return JsonResponse(ranking_response, safe=False)

  elif request.method == 'POST':
    try:
      body = request.body.decode()
      jsonbody = json.loads(body)
      acc = jsonbody['accuracy']
    except (KeyError, JSONDecodeError) as e:
      return HttpResponseBadRequest()
    post = ranking(accuracy=acc)
    post.save()
    # add to cache
    rcache.zadd(bpm, {post.id : acc})
    response_dict = {
      'accuracy': post.accuracy,
    }
    return HttpResponse(json.dumps(response_dict), status=201)
  else:
    return HttpResponseNotAllowed(['GET', 'POST'])
