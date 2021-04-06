from django.urls import path
from . import views


urlpatterns = [
    path('', views.index),
    path('archive/', views.index),
    path('about/', views.index),
    path('images/', views.index),
    path('post/<int:id>/', views.index),
]