import httpx

def test_documents_and_readiness():
    with httpx.Client(base_url='http://localhost:8001', timeout=10) as c:
        assert c.post('/api/auth/demo').status_code==200
        r=c.get('/api/documents'); assert r.status_code==200; docs=r.json(); assert {x['name'] for x in docs} >= {'Marksheet','Income Certificate','Domicile Certificate','Bank Details'}
        r=c.get('/api/readiness'); assert r.status_code==200; assert 'ready' in r.text.lower()
