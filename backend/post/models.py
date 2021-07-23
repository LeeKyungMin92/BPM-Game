from django.db import models

class Board(models.Model):
  title = models.CharField(max_length=120)
  content = models.TextField()
  
  class Meta:
    abstract = True

class Notice(Board):
  pass

class Free(Board):
  pass