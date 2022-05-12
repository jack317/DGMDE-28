from django.shortcuts import render
from rest_framework import viewsets
from .serializers import ParagraphSerializer
from .models import Paragraph

class ParagraphView(viewsets.ModelViewSet):
    serializer_class = ParagraphSerializer
    queryset = Paragraph.objects.all()