from django.db import models

class Notice(models.Model):
  title = models.CharField(max_length=120)
  content = models.TextField()

class Free(models.Model):
  title = models.CharField(max_length=120)
  content = models.TextField()
