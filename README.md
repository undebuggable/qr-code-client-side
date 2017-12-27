Generate QR code entirely on the client side, in the web browser.
===============================================

This simple client side application encodes a string value into a configurable QR code. The string value can be given as parameter in the URL fragment or entered into text field. Below are described supported parameters, the parameters are not required.

QR code pixel size:

`pixel=5` (`1`-`20`)

Error correction mode:

`correction=L` (`L`ow, `M`edium, `Q`uartile, `H`igh)

The percent-encoded value to encode:

`value=https%3A%2F%2Fgithub.com%2Fundebuggable%2Fqr-code-client-side`

An example URL the this application with all parameters:

[https://ow.cx/static/qr.html#pixel=5&correction=L&value=https%3A%2F%2Fgithub.com%2Fundebuggable%2Fqr-code-client-side](https://ow.cx/static/qr.html#pixel=5&correction=L&value=https%3A%2F%2Fgithub.com%2Fundebuggable%2Fqr-code-client-side)

Note that all parameters are given in URL fragment, thus handled entirely in the browser, i.e. the value to encode is not logged in the server logs.
