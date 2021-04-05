from django.urls import path
from django.urls import path, include
from rest_framework import routers
from . import views


router = routers.DefaultRouter()
router.register(r'post', views.PostView, 'post')


urlpatterns = [
    path('', include(router.urls))
]
