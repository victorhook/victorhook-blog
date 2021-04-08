from django.urls import path
from django.urls import path, include
from rest_framework import routers
from . import views


router = routers.DefaultRouter()
router.register('post', views.PostPublicView, 'post')
router.register('post_all', views.PostAllView, 'post_all')
router.register('post_all_raw', views.PostAllRawView, 'post_all_raw')
router.register('tag', views.TagView, 'tag')
router.register('image', views.ImageView, 'image')
router.register('postchange', views.PostChangeView, 'postchange')
router.register('postimage', views.PostImageView, 'postimage')


urlpatterns = [
    path('', include(router.urls)),
    path('upload_image/', views.upload_image),
    path('compile_body/', views.compile_markdown),
    path('api-auth/', include('rest_framework.urls')),
]
