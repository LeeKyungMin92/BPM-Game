from json.decoder import JSONDecodeError
from django.core.exceptions import ObjectDoesNotExist
from django.shortcuts import render
from django.http import HttpResponse, HttpResponseNotAllowed, HttpResponseBadRequest, JsonResponse, response
from django.views.decorators.csrf import csrf_exempt

import json

from .models import Notice, Free


boards = {'notice': Notice, 'free': Free}


@csrf_exempt
def manage_post(request, boardType):
  if boardType in boards: 
    board = boards[boardType]
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
def manage_post_id(request, boardType, id):
  if boardType in boards: 
    board = boards[boardType]
  else:
    return HttpResponseBadRequest('Invalid board name.')

  if request.method == 'GET':
    try:
      post = board.objects.get(id=id)
      response_dict = {
        'id': post.id,
        'title': post.title,
        'content': post.content,
      }
      print(post)
    except ObjectDoesNotExist as e:
      return HttpResponseBadRequest('PostID does not exist: {}'.format(id))  
    return JsonResponse(response_dict, safe=False)
  elif request.method == 'DELETE':
    try:
      post = board.objects.get(id=id)
      post.delete()
    except ObjectDoesNotExist as e:
      return HttpResponseBadRequest('PostID does not exist: {}'.format(id))
    return HttpResponse(status=204)
  else:
    return HttpResponseNotAllowed(['GET', 'DELETE'])
