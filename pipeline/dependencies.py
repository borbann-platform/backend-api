from fastapi import Request


async def get_pipeline_service(request: Request):
    service = request.app.state.pipeline_service
    if not service:
        raise Exception("PipelineService not initialized or available in app state.")
    return service
