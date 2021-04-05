from django.shortcuts import render
from rest_framework import viewsets
from . import serializers
from . import models

# Create your views here.

class PostView(viewsets.ModelViewSet):
    serializer_class = serializers.PostSerializer
    queryset = models.Post.objects.all()