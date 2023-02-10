

//TEST EXAMPLE

let user = {
  nickname: 'Jod',
  password: '123456',
};
const url = 'http://localhost:8000/signup';
const test = async () => {
	let response = await fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
  body: JSON.stringify(user)
	});
	const body = await response.json();
	console.log(body);
}

const auth = async () => {
	let response = await fetch('http://localhost:8000/signin', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
  body: JSON.stringify(user)
	});
	const body = await response.json();
	console.log(body);
}

auth();
