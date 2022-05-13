from django.db import models

class Paragraph(models.Model):
    title = models.CharField(max_length=120)
    body = models.TextField()

    def _str_(self):
        return self.title 

class Saved(models.Model):
    title_saved = models.CharField(max_length=120)
    body_saved = models.TextField()

    def _str_(self):
        return self.title 