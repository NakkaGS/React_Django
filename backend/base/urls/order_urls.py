#urls.py(Backend)->urls.py(Base)
from django.urls import path
from base.views import order_views as views #import all the function defined in the base/views.py

#from  rest_framework_simplejwt import (TokenObtainPairView)

#Simple JWT provides a JSON Web Token authentication backend for the Django REST Framework. 
#It aims to cover the most common use cases of JWTs by offering a conservative set of default features. 
#It also aims to be easily extensible in case a desired feature is not present.

#every time that one path is requested it is requested a function
urlpatterns = [


]