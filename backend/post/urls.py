from django.urls import path
from django.urls.resolvers import URLPattern

from . import views

urlpatterns = [
  path('<str:boardType>/', views.manage_post, name = 'manage_post'),
  path('<str:boardType>/<int:id>/', views.manage_post_id, name = 'manage_post_id'),
]