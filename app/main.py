from fastapi import FastAPI, HTTPException, Request
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from app.models import Task, TaskRequest
from app.store import TaskStore

def create_app() -> FastAPI:
    app = FastAPI(title="Task Tracker API")
    
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["http://localhost:5173"],
        allow_credentials=True,
        allow_methods=["GET", "POST"],
        allow_headers=["*"],
    )

    store = TaskStore()

    @app.exception_handler(RequestValidationError)
    async def invalid_request(request: Request, error: RequestValidationError):
        return JSONResponse(status_code=400, content={"message": "Invalid request"})

    @app.get("/api/hello")
    def hello():
        return {"message": "Hello from the Task Tracker API! Romain!"}

    @app.get("/api/tasks")
    def get_tasks() -> list[Task]:
        return store.find_all()

    @app.post("/api/tasks", status_code=201)
    def create_task(request: TaskRequest) -> Task:
        if not request.title or not request.title.strip():
            raise HTTPException(status_code=400, detail="Title cannot be empty or spaces-only")
        return store.add(request)

    return app

app = create_app()