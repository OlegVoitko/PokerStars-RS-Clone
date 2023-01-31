

//TEST EXAMPLE

let user = {
  name: 'Johd',
  surname: 'Smith',
  password: '123456',
};
const url = 'http://localhost:8000/users';
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

test();
