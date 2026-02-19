def test_root_endpoint(client):
    response = client.get("/api/")

    assert response.status_code == 200
    assert response.json() == {"message": "Hello World"}


def test_contact_validation_returns_422(client):
    payload = {
        "name": "",
        "email": "invalid-email",
        "message": "short",
    }

    response = client.post("/api/contact", json=payload)

    assert response.status_code == 422
    body = response.json()
    assert body["detail"] == "Validation failed"
    assert isinstance(body["errors"], list)
