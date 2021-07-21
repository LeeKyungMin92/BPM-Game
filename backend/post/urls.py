from django.urls import path
from django.urls.resolvers import URLPattern

from . import views

urlpatterns = [
  path('<str:boardType>/', views.index),
  path('<str:boardType>/<int:id>', views.index),
]