from app.models import Task, TaskRequest

class TaskStore:
    def __init__(self):
        self._tasks: list[Task] = [
            Task(id=1, title="Finish homework", priority="High"),
            Task(id=2, title="Buy groceries", priority="Medium")
        ]
        self._next_id = 3

    def find_all(self) -> list[Task]:
        return self._tasks

    def add(self, request: TaskRequest) -> Task:
        task = Task(
            id=self._next_id,
            title=request.title,
            priority=request.priority
        )
        self._tasks.append(task)
        self._next_id += 1
        return task