from django.urls import path
from . import views


urlpatterns = [
    path('', views.index),
    path('archive/', views.index),
    path('about/', views.index),
    path('images/', views.index),
    path('newpost/', views.index),
    path('post/<int:id>/', views.index),
    path('post_all/<int:id>/', views.index),
    path('post_all_raw/<int:id>/', views.index),
    path('post_all_compiled/<int:id>/', views.index),
]