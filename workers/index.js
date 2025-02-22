import formHTML from "./login.html";
import congratsResponseHTML from "./secret.html"
import correctResponseHTML from "./granted.html"
import accessDeniedHTML from "./denied.html"
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request, env) {
  const { searchParams } = new URL(request.url);
  const url = new URL(request.url);

  if (url.pathname.endsWith('/cardswipe')) {
    code = searchParams.get('code');
    return (bagereader(code));
  }
  return new Response('Not Found', { status: 404 });


}


function bagereader(code) {
  // List of 50 correct codes
  const correctCodes = ['9457', '6983', '1234', '8765', '4321', '9876',
  '3456', '7890', '2345', '6789', '5432', '8901', '5678', '9012', '3210',
  '4567', '2109', '6745', '3546', '7938', '1654', '4298', '7832', '2387',
  '5467', '9182', '4721', '6098', '1345', '7865', '5768', '9032', '4526',
  '1892', '8762', '6743', '3465', '8923', '5674', '2190', '8905', '2310',
  '4561', '1876', '6123', '9874', '5749', '1239', '7698', '8906']; // Add more codes as needed

  // Check if code is 1337
  if (code === '1337') {
    return new Response(congratsResponseHTML, {
      headers: { 'Content-Type': 'text/html' },
    });
  } else if (correctCodes.includes(code)) {
    return new Response(correctResponseHTML, {
      headers: { 'Content-Type': 'text/html' },
    });
  } else if (code && /^\d{4}$/.test(code)) {
    return new Response(accessDeniedHTML, {
      headers: { 'Content-Type': 'text/html' },
      status: 403, // Forbidden
    });
  } else {
    // If no code is given or if the code is invalid, display the form
    return new Response(formHTML, {
      headers: { 'Content-Type': 'text/html' },
    });
  }
}
