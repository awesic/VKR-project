from django.contrib.auth import login, authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from users import serializers


def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }


def register(request):
    serializer = serializers.UserSerializer(data=request.data)
    user = None
    # token = None
    if str(request.data.get('role')).lower() == 'student':
        serializer = serializers.StudentRegisterSerializer(data=request.data)

    elif str(request.data.get('role')).lower() == 'teacher':
        serializer = serializers.TeacherRegisterSerializer(data=request.data)

    if serializer.is_valid():
        user = serializer.create(serializer.validated_data)
#             user = serializers.UserSerializer(user)
    if user:
        user = authenticate(email=user.email, password=request.data.get('password'))
        login(request, user)
        # token = get_tokens_for_user(user)

    # return token
    return user