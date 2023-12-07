from django.contrib.auth import authenticate
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from django.utils.translation import gettext_lazy as _

from users.models import User, Student, Teacher


class UserSerializer(serializers.ModelSerializer):
    """
    Default Serializer for user model
    """
    password = serializers.CharField(write_only=True,
                                     style={'input_type': 'password'}, required=True)  # validators=[validate_password]
    password2 = serializers.CharField(write_only=True, style={'input_type': 'password'}, required=True)

    class Meta:
        model = User
        fields = ['email', 'first_name', 'last_name', 'patronymic', 'password', 'password2', 'role']
        read_only_fields = ['role']

    def create(self, validated_data):
        admin = User.objects.create_superuser(
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            patronymic=validated_data['patronymic']
        )
        admin.set_password(validated_data['password'])
        admin.save()

        return admin


class AdminSerializer(serializers.ModelSerializer):
    """
    Serializer for show admin user
    """
    class Meta:
        model = User
        fields = ['id', 'email', 'first_name', 'last_name', 'patronymic', 'role']


class TeacherRegisterSerializer(serializers.ModelSerializer):
    """
    TeacherRegisterSerializer for the user create a new teacher user and token for authentication
    """
    password = serializers.CharField(write_only=True,
                                     style={'input_type': 'password'}, required=True)  # validators=[validate_password]
    password2 = serializers.CharField(write_only=True, style={'input_type': 'password'}, required=True)

    class Meta:
        model = Teacher
        fields = ['email', 'first_name', 'last_name', 'patronymic',
                  'password', 'password2', 'institute', 'direction']

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"error": _("Пароли не совпадают.")})
        return attrs

    def create(self, validated_data):
        teacher = Teacher.objects.create_user(
            email=validated_data['email']
            , password=validated_data['password']
            , first_name=validated_data['first_name']
            , last_name=validated_data['last_name']
            , patronymic=validated_data['patronymic']
            , institute=validated_data['institute']
            , direction=validated_data['direction']
            , role='TEACHER'
        )
        teacher.set_password(validated_data['password'])
        teacher.save()
        return teacher


class StudentRegisterSerializer(serializers.ModelSerializer):
    """
    StudentRegisterSerializer for the user create a new student user and token for authentication
    """
    password = serializers.CharField(write_only=True,
                                     style={'input_type': 'password'}, required=True)  # validators=[validate_password]
    password2 = serializers.CharField(write_only=True, style={'input_type': 'password'}, required=True)

    class Meta:
        model = Student
        fields = ['email', 'first_name', 'last_name', 'patronymic',
                  'password', 'password2', 'institute', 'direction', 'graduate_year']

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"error": _("Пароли не совпадают.")})
        return attrs

    def create(self, validated_data):
        student = Student.objects.create_user(
            email=validated_data['email']
            , password=validated_data['password']
            , first_name=validated_data['first_name']
            , last_name=validated_data['last_name']
            , patronymic=validated_data['patronymic']
            , institute=validated_data['institute']
            , direction=validated_data['direction']
            , graduate_year=validated_data['graduate_year']
            , role='STUDENT'
        )
        student.set_password(validated_data['password'])
        student.save()
        return student


class LoginSerializer(serializers.ModelSerializer):
    """
    This serializer defines two fields for authentication:
      * email
      * password.
    It will try to authenticate the user with when validated.
    """
    email = serializers.EmailField(label=_('email'), required=True)
    password = serializers.CharField(write_only=True, style={'input_type': 'password'}, trim_whitespace=False)

    class Meta:
        model = User
        fields = ['email', 'password']

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')
        if email and password:
            user = authenticate(email=email, password=password)
            if not user:
                msg = {"error": _('Не правильная почта или пароль.')}
                raise serializers.ValidationError(msg, code='authorization')
        else:
            msg = {"error": _('Почта и пароль обязательны.')}
            raise serializers.ValidationError(msg, code="authorization")
        attrs['user'] = user
        return attrs


class StudentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Student
        fields = ['id', 'email', 'first_name', 'last_name', 'patronymic',
                  'institute', 'direction', 'graduate_year',
                  'theme', 'theme_approved', 'prefer_teacher', 'teacher_approved', 'role']


class TeacherSerializer(serializers.ModelSerializer):

    class Meta:
        model = Teacher
        fields = ['id', 'email', 'first_name', 'last_name', 'patronymic', 'institute', 'direction', 'role']