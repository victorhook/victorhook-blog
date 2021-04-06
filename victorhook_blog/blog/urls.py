from django.urls import path
from django.urls import path, include
from rest_framework import routers
from . import views


router = routers.DefaultRouter()
router.register('post', views.PostView, 'post')
router.register('tag', views.TagView, 'tag')
router.register('image', views.ImageView, 'image')
router.register('posttag', views.PostTagView, 'posttag')
router.register('postchange', views.PostChangeView, 'postchange')
router.register('postimage', views.PostImageView, 'postimage')


urlpatterns = [
    path('', include(router.urls)),
    path('upload_image/', views.upload_image),
    path('api-auth/', include('rest_framework.urls')),
]
