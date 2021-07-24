from json.decoder import JSONDecodeError
from django.shortcuts import render
from django.http import HttpResponse, HttpResponseNotAllowed, HttpResponseBadRequest, JsonResponse, response
from django.views.decorators.csrf import csrf_exempt

import json

from .models import Notice, Free

@csrf_exempt
def manage_post(request, boardType=''):
  if boardType == 'notice': 
    board = Notice
  elif boardType == 'free': 
    board = Free
  else:
    return HttpResponseBadRequest('Invalid board name.')

  if request.method == 'GET':
    post_all_list = list(board.objects.all().values('id', 'title'))
    return JsonResponse(post_all_list, safe=False)
  if request.method == 'POST':
    try:
      body = request.body.decode()
      jsonbody = json.loads(body)
      title = jsonbody['title']
      content = jsonbody['content']
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
  else:
    return HttpResponseNotAllowed(['GET', 'POST'])

@csrf_exempt
def manage_post_id(request, boardType='', id=None):
  if boardType == 'notice': 
    board = Notice
  elif boardType == 'free': 
    board = Free
  else:
    return HttpResponseBadRequest('Invalid board name.')

  if request.method == 'GET':
    if id is None:
      return HttpResponseBadRequest('PostID is not specified.')
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
    return HttpResponseNotAllowed(['GET', 'DELETE'])
