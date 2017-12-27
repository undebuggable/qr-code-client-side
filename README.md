Generate QR code entirely on the client side, in the web browser.
===============================================

This simple client side web browser application converts configurable QR code from a string value. The string value can be given as parameter in the URL fragment. Below are described supported parameters, the parameters are not required.

QR code pixel size:

`CONFIG_PIXEL=5` (`1`-`20`)

Error correction mode:

`CONFIG_CORRECTION=L` ([`L`]ow, [`M`]edium, [`Q`]uartile, [`H`]igh)

The percent-encoded value to encode:

`CONFIG_VALUE=https%3A%2F%2Fgithub.com%2Fundebuggable%2Fqr-code-client-side`

An example URL the this application with all parameters:

[https://ow.cx/static/qr.html#CONFIG_PIXEL=5&CONFIG_CORRECTION=L&CONFIG_VALUE=https%3A%2F%2Fgithub.com%2Fundebuggable%2Fqr-code-client-side](https://ow.cx/static/qr.html#CONFIG_PIXEL=5&CONFIG_CORRECTION=L&CONFIG_VALUE=https%3A%2F%2Fgithub.com%2Fundebuggable%2Fqr-code-client-side)
