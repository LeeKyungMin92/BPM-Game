from json.decoder import JSONDecodeError
from django.core.exceptions import ObjectDoesNotExist
from django.shortcuts import render
from django.http import HttpResponse, HttpResponseNotAllowed, HttpResponseBadRequest, JsonResponse, response
from django.views.decorators.csrf import csrf_exempt

import json

from .models import Bpm_100, Bpm_120, Bpm_150, Bpm_180


rankings = {100: Bpm_100, 120: Bpm_120, 150: Bpm_150, 180: Bpm_180}


@csrf_exempt
def manage_ranking(request, bpm):
  if bpm in rankings: 
    ranking = rankings[bpm]
  else:
    return HttpResponseBadRequest('Invalid BPM.')

  if request.method == 'GET':
    ranking_all_list = list(ranking.objects.all().values('accuracy'))
    return JsonResponse(ranking_all_list, safe=False)
  elif request.method == 'POST':
    try:
      body = request.body.decode()
      jsonbody = json.loads(body)
      acc = jsonbody['accuracy']
    except (KeyError, JSONDecodeError) as e:
      return HttpResponseBadRequest()
    post = ranking(accuracy=acc)
    post.save()
    response_dict = {
      'accuracy': post.accuracy,
    }
    return HttpResponse(json.dumps(response_dict), status=201)
  else:
    return HttpResponseNotAllowed(['GET', 'POST'])
