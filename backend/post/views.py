from json.decoder import JSONDecodeError
from django.shortcuts import render
from django.http import HttpResponse, HttpResponseNotAllowed, HttpResponseBadRequest, JsonResponse, response
from django.views.decorators.csrf import csrf_exempt

import json

from .models import Notice, Free

@csrf_exempt
def index(request, boardType='', id=None):
  board = Notice
  if boardType == 'notice': 
    board = Notice
  elif boardType == 'free': 
    board = Free
  else:
    return HttpResponseBadRequest('Invalid board name.')

  if request.method == 'GET':
    if id is None:
      post_all_list = list(board.objects.all().values())
      return JsonResponse(post_all_list, safe=False)
    else:
      try:
        post = board.objects.get(id=id)
        response_dict = {
          'id': post.id,
          'title': post.title,
          'content': post.content,
        }
        return JsonResponse(response_dict, safe=False)
      except KeyError as e:
        return HttpResponseBadRequest('PostID does not exist: {}'.format(id))
  if request.method == 'POST':
    try:
      body = request.body.decode()
      title = json.loads(body)['title']
      content = json.loads(body)['content']
    except (KeyError, JSONDecodeError) as e:
      return HttpResponseBadRequest()
    post = board(title=title, content=content)
    post.save()
    response_dict = {
      'id': post.id,
      'title': post.title,
      'content': post.content,
    }
    return HttpResponse(json.dumps(response_dict), status=201)
  elif request.method == 'DELETE':
    if id is None:
      return HttpResponseBadRequest('PostID is not specified.')
    try:
      post = board.objects.get(id=id)
      post.delete()
    except KeyError as e:
      return HttpResponseBadRequest('PostID does not exist: {}'.format(id))
    return HttpResponse(status=204)
  else:
    return HttpResponseNotAllowed(['GET', 'POST', 'DELETE'])