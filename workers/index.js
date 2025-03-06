import formHTML from "./login.html";
import congratsResponseHTML from "./secret.html"
import correctResponseHTML from "./granted.html"
import accessDeniedHTML from "./denied.html"
import victoryHTML from "./victory.html"
import homepageHTML from "./homepage.html"
import ftphelpHTML from "./ftp-help.html"
import webmailHTML from "./webmail.html"
import webmailloginHTML from "./webmail-login.html"
import webmailfailHTML from "./webmail-fail.html"
import welcomeHTML from "./CTFwelcome.html"
import webmailsecretHTML from "./webmail-secret.html"
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request, env) {
  const { searchParams } = new URL(request.url);
  const url = new URL(request.url);
  if (url.pathname.includes("/cdn/")) {
    const newDomain = "https://ostrichlab.io";
    const newUrl = newDomain + url.pathname + url.search;
    return Response.redirect(newUrl, 301);
  }

  if (url.pathname.endsWith('/cardlogin')) {
    code = searchParams.get('code');
    return (bagereader(code));
  }
  if (url.pathname.endsWith('/ostrich/farm/hacking/ctf-challenges/ostrich-breeding/ostrich-encryption/ostrich-passwords/ostrich-chicks-ctf/ostrich-feed-injections/ostrich-exploits/ostrich-feathers-steganography/ostrich-meat-cipher/ostrich-leather-cracking/')){
    return new Response(victoryHTML, { headers: { 'Content-Type': 'text/html' } });
  }
  if (url.pathname.endsWith('flights/securityprotocol/2024/special-operations/encrypted-flight-data-center/access-authorized/flightlog/')){
    return new Response(webmailsecretHTML, { headers: { 'Content-Type': 'text/html' } });
  }
  if (url.pathname.endsWith('/ftp-help.html')){
    return new Response(ftphelpHTML, { headers: { 'Content-Type': 'text/html' } });
  }
  if (url.pathname.endsWith('/welcome.html')){
    return new Response(welcomeHTML, { headers: { 'Content-Type': 'text/html' } });
  }
  if (url.pathname.endsWith('/webmail')) {
    if (request.method === 'POST') {
      const formData = await request.formData()
      const email = formData.get('email')
      const password = formData.get('password')
      const allowedCredentials = [
        { email: 'shamir@secretfarm.ostrichlab.io', password: 'SharedSecret' },
        { email: 'SecretSharing@secretfarm.ostrichlab.io', password: 'https://ostrichlab.io/sss/' },
        { email: 'This_Is_CTF_Hint', password: 'https://ostrichlab.io/sss/' },
      ]
      const isValid = allowedCredentials.some(
        cred => cred.email === email && cred.password === password
      )
      if (isValid){ 
        return new Response(webmailloginHTML, { headers: { 'Content-Type': 'text/html' } });
      } else {
        return new Response(webmailfailHTML, { headers: { 'Content-Type': 'text/html' } });
      }
    }
    return new Response(webmailHTML, { headers: { 'Content-Type': 'text/html' } });
  }

  return new Response(homepageHTML, { headers: { 'Content-Type': 'text/html' } });
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
