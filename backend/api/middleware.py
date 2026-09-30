from .schema_sync import auto_sync_schema


class AutoSchemaSyncMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response
        auto_sync_schema()

    def __call__(self, request):
        auto_sync_schema()
        return self.get_response(request)
