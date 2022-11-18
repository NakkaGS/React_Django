#urls.py(Backend)->order_urls.py(Base)
from django.urls import path

#import all the function defined in the base/views/order_views.py
from base.views import order_views as views 

#from  rest_framework_simplejwt import (TokenObtainPairView)

#Simple JWT provides a JSON Web Token authentication backend for the Django REST Framework. 
#It aims to cover the most common use cases of JWTs by offering a conservative set of default features. 
#It also aims to be easily extensible in case a desired feature is not present.

#every time that one path is requested it is requested a function
urlpatterns = [
    path('', views.getOrders, name='orders-add'),
    path('add/', views.addOrderItems, name='orders-add'),
    path('myorders/', views.getMyOrders, name='myoders'),
    path('<str:pk>/', views.getOrderByID, name='user-order'),
    path('<str:pk>/pay/', views.updateOrderToPaid, name='pay'),
]