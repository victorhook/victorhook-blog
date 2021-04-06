from django.shortcuts import render


def index(request, id:int = None):
    return render(request, 'frontend/index.html')