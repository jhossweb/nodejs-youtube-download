export class FetchSaved
{
    _route = "/api/download"

    async download (data) {

        const response = await fetch('/api/download', { 
                method: 'POST',
                    body: JSON.stringify(data),
                    headers: { "Content-Type": "application/json" },
        })
        
        const url = await response.json()
        console.log(url)
        return url
    }
}