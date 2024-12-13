from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from polls.views import SistSaludViewSet, PacienteViewSet, ExamenViewSet

# Create a router and register viewsets
router = DefaultRouter()
router.register(r'sist-salud', SistSaludViewSet)
router.register(r'pacientes', PacienteViewSet)
router.register(r'examenes', ExamenViewSet)

# URL patterns
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),  # Add the API routes for the polls app here
]

# Serve media files in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
