from pydantic import BaseModel, ConfigDict, Field

class TaskRequest(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)
    title: str = Field(min_length=1, max_length=80)
    priority: str = Field(min_length=1, max_length=30, default="Medium")

class Task(BaseModel):
    model_config = ConfigDict(frozen=True)
    id: int
    title: str
    priority: str