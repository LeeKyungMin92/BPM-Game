from django.urls import path
from django.urls.resolvers import URLPattern

from . import views

urlpatterns = [
  path('<int:bpm>/', views.manage_ranking, name = 'manage_ranking'),
]