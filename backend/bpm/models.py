from django.db import models

class Bpms(models.Model):
  accuracy = models.FloatField()
  
  class Meta:
    abstract = True

class Bpm_100(Bpms):
  pass

class Bpm_120(Bpms):
  pass

class Bpm_150(Bpms):
  pass

class Bpm_180(Bpms):
  pass