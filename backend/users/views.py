from django.contrib.auth import login, logout, authenticate
from django.utils.decorators import method_decorator
from django.utils.translation import gettext_lazy as _
from rest_framework import permissions, status, generics, views, authentication, filters
from rest_framework.response import Response
from rest_framework import viewsets
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
from rest_framework_simplejwt.tokens import RefreshToken

from users.models import User, Student, Teacher
from users import serializers, services


class CheckAuthentication(views.APIView):
    def get(self, request):
        user = request.user
        try:
            if user.is_authenticated:
                return Response({"isAuthenticated": True}, status=status.HTTP_202_ACCEPTED)
            else:
                return Response({"isAuthenticated": False}, status=status.HTTP_401_UNAUTHORIZED)
        except:
            return Response({"error": "Something went wrong"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# @method_decorator(ensure_csrf_cookie, name="dispatch")
class GetCSRFToken(views.APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        return Response({"success": "CSRF cookie set"}, status=status.HTTP_200_OK)


# @method_decorator(csrf_protect, name="dispatch")
# # class AdminRegisterView(generics.CreateAPIView):
# #     serializer_class = serializers.py.UserSerializer
# #     queryset = User.objects.filter(role=User.Roles.ADMIN)
# #     permission_classes = [permissions.AllowAny]
# class AdminRegisterView(views.APIView):
#     """
#     Register a new Admin user and automatically login
#     """
#     authentication_classes = [authentication.SessionAuthentication, authentication.BasicAuthentication]
#
#     def post(self, request):
#         serializer = serializers.py.UserSerializer(data=self.request.data)
#         serializer.is_valid(raise_exception=True)
#         serializer.save()
#         auth_user = serializers.py.LoginSerializer(data=self.request.data)
#         auth_user.is_valid(raise_exception=True)
#         user = auth_user.validated_data['user']
#         if user:
#             login(request, user)
#             return Response({'success': _('User created successfully')},
#                             status=status.HTTP_201_CREATED)
#         return Response({'error': 'Something went wrong'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
class UserRegisterView(views.APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        try:
            token = services.register(request)
            if not token:
                return Response({"error": "Wrong credentials"}, status=status.HTTP_400_BAD_REQUEST)
            return Response(token, status=status.HTTP_201_CREATED)
        except:
            return Response({"error": "Something went wrong"}, status=status.HTTP_400_BAD_REQUEST)


class UsersListView(generics.ListAPIView):
    serializer_class = serializers.UserSerializer
    queryset = User.objects.all()
    permission_classes = [permissions.AllowAny]


class LoginView(views.APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = serializers.LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        if user:
            token = services.get_tokens_for_user(user)
            return Response(token, status=status.HTTP_202_ACCEPTED)
        else:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)


class LogoutView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.data['refresh']
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({'success': _('You have been logged out.')}, status=status.HTTP_205_RESET_CONTENT)
        except:
            return Response({'error': 'Something went wrong'}, status=status.HTTP_400_BAD_REQUEST)


class ProfileView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]
    allow_methods = ['GET']

    def get(self, request):
        try:
            user = request.user
            user_profile = User.objects.get(email=user.email)
            if user.role == User.Roles.TEACHER:
                user_profile = Teacher.objects.get(email=user.email)
                user_profile = serializers.TeacherSerializer(user_profile, many=False).data
            elif user.role == User.Roles.STUDENT:
                user_profile = Student.objects.get(email=user.email)
                user_profile = serializers.StudentSerializer(user_profile, many=False).data
            else:
                user_profile = serializers.AdminSerializer(user_profile, many=False).data
            return Response(user_profile)
        except:
            return Response({'error': 'Something went wrong'}, status=status.HTTP_404_NOT_FOUND)


class StudentViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows students to be viewed or edited
    """
    queryset = Student.objects.all()
    serializer_class = serializers.StudentSerializer


class TeacherViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint that allows students to be viewed or edited
    """
    permission_classes = [permissions.IsAuthenticated]
    queryset = Teacher.objects.all()
    serializer_class = serializers.TeacherSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['email', 'first_name', 'last_name']
