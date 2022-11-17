#urls.py(Backend)->user_urls.py(Base)
from django.urls import path

#import all the function defined in the base/views/user_views.py
from base.views import user_views as views 

##############################
#It is used for authentication
#Simple JWT provides a JSON Web Token authentication backend for the Django REST Framework. 
#It aims to cover the most common use cases of JWTs by offering a conservative set of default features. 
#It also aims to be easily extensible in case a desired feature is not present.
##############################


#every time that one path is requested it is requested a function
#it doesn't need to have the complete name because in urls.py it is the full address
urlpatterns = [

    path('login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),

    path('register/', views.registerUser, name='register'),



    path('profile/', views.getUserProfile, name="users-profile"),
    
    path('profile/update/', views.updateUserProfile, name="users-profile-update"),

    path('profile/update/', views.updateUserProfile, name="users-profile-update"),

    

    path('<str:pk>/', views.getUserById, name='user-update'),

    path('update/<str:pk>/', views.updateUser, name="users-profile-update"),

    path('delete/<str:pk>/', views.deleteUser, name='user-delete'),
    
    path('', views.getUsers, name="users"),

]