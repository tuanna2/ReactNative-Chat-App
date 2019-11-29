import qs from 'query-string';
const apiBaseURL = "http://localhost:3000"

async function sendRequest(method, path, data = {}, headers = {}) {
  let url = `${apiBaseURL}${path}`;
  const opts = {
    method,
    headers
  };
  if (method === 'GET' || method === 'DELETE') {
    const query = qs.stringify(data);
    if (query) {
      url += `?${query}`;
    }
  } else {
    opts.headers = { ...opts.headers, 'Content-Type': 'application/json' };
    opts.body = JSON.stringify(data);
  }
  try {
    const res = await fetch(url, opts);
    const contentType = res.headers.get('content-type');
    let body;
    if (contentType && contentType.includes('application/json')) {
      body = await res.json();
    } else {
      body = await res.text();
    }
    if (res.status === 200) {
      return body;
    }
    throw body;
  } catch (e) {
    if (e instanceof Error) {
      e = {
        error: `${e}`,
        message: 'Something went wrong while sending API request',
      };
    }
    throw e;
  }
}

export default {
  GET(path, data = {}) {
    return sendRequest('GET', path, data);
  },
  POST(path, data = {}) {
    return sendRequest('POST', path, data);
  },
  PUT(path, data = {}) {
    return sendRequest('PUT', path, data);
  },
  DELETE(path, data = {}) {
    return sendRequest('DELETE', path, data);
  }
};
