#urls.py(Backend)->urls.py(Base)

from django.urls import path
from . import views #import all the function defined in the base/views.py

#every time that one path is requested it is requested a function
urlpatterns = [
    path('', views.getRouter, name="routes"),
    path('products/', views.getProducts, name="products"),
    path('products/<str:pk>', views.getProduct, name="product"),
]