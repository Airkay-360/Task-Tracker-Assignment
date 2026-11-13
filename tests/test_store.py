import pytest
from app.models import TaskRequest
from app.store import TaskStore

def test_fresh_store_contains_seed_tasks():
    store = TaskStore()
    assert len(store.find_all()) == 2

def test_adding_task_stores_title_and_priority():
    store = TaskStore()
    request = TaskRequest(title="Test Title", priority="Low")
    task = store.add(request)
    assert task.title == "Test Title"
    assert task.priority == "Low"
    assert len(store.find_all()) == 3
    assert task in store.find_all()

def test_two_new_tasks_receive_different_ids():
    store = TaskStore()
    req1 = TaskRequest(title="Task 1", priority="Low")
    req2 = TaskRequest(title="Task 2", priority="High")
    task1 = store.add(req1)
    task2 = store.add(req2)
    assert task1.id != task2.id
    assert task1.id > 2
    assert task2.id > 2
    assert len(store.find_all()) == 4