import httpx

def test_tracking_and_action_plan():
    with httpx.Client(base_url='http://localhost:8001', timeout=10) as c:
        assert c.post('/api/auth/demo').status_code==200
        assert c.get('/api/action-plan').status_code==200
        r=c.get('/api/tracking'); assert r.status_code==200
        r=c.patch('/api/tracking/national-stem', json={'stage':'Applied'}); assert r.status_code in (200,201)
