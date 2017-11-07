const myFetch = (url, options) => fetch(`${process.env.REACT_APP_API_SERVER}${url}`, options)

export const shorten = (url) => {
	return myFetch('/shorten', {
		method: 'POST',
		headers: {
			'Accept': 'application/json, text/plain, */*',
			'Content-Type': 'application/json'
		},
		
		body: JSON.stringify({url})
	})
	.then(res=>res.json())
}