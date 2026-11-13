import pytest
from fastapi.testclient import TestClient
from app.main import create_app

@pytest.fixture
def client():
    with TestClient(create_app()) as test_client:
        yield test_client

def test_greeting_returns_json(client):
    response = client.get("/api/hello")
    assert response.status_code == 200
    assert isinstance(response.json()["message"], str)

def test_valid_post_returns_created_task(client):
    response = client.post(
        "/api/tasks", 
        json={"title": "Test Task", "priority": "High"}
    )
    assert response.status_code == 201
    data = response.json()
    assert "id" in data
    assert data["title"] == "Test Task"
    assert data["priority"] == "High"