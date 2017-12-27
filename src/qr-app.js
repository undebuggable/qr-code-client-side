(function init (_window) {
    var
        window = _window,
        document = window.document,
        location = window.location,
        elemForm = document.getElementById('qr-form'),
        elemQRCode = elemForm.querySelector('#qr-code'),
        elemValue =  elemForm.querySelector('#qr-value')
        hashString = location.hash.replace(/^\s\s*/, '').replace(/\s\s*$/, '').slice(1),
        validParameters = {}
    ;
    function createQRCode (text) {
        var
            qr,
            //Value is selected automatically
            typeNumber = 1,
            success = false,
            limit = 0,
            textLength = Infinity
        ;
        //[TODO] Calculate the length, don't rely on exception
        try {
            qr = qrcode(typeNumber, CONFIG_DEFAULT_CORRECTION);
            qr.addData(unescape("%EF%BB%BF"));
            qr.addData(unescape(encodeURIComponent(text)));
            qr.make();
        } catch (e) {
            var m = e.message.split('>');
            textLength = +m[0].split('(')[1];
            limit = +m[1].split(')')[0]
        };
        var allowed = CAPACITY.filter(function(c) {
            var max = c[['L', 'M', 'H', 'Q'].indexOf(CONFIG_DEFAULT_CORRECTION)];
            return textLength < max;
        });
        if (allowed.length) {
            qr = qrcode(
                CAPACITY.indexOf(allowed[0]) + 1,
                CONFIG_DEFAULT_CORRECTION
            );
            qr.addData(unescape("%EF%BB%BF"));
            qr.addData(unescape(encodeURIComponent(text)));
            qr.make();
        };
        return !!qr ? qr.createImgTag(CONFIG_DEFAULT_PIXEL) : '';
    };
    function updateQRCode () {
        var text = elemValue.value.replace(/^[\s\u3000]+|[\s\u3000]+$/g, '');
        elemQRCode.innerHTML = createQRCode(text);
    };
    function parseFragment (hashString) {
        var
            allowedParameters = [
                CONFIG_PIXEL, CONFIG_CORRECTION, CONFIG_VALUE
            ],
            fragmentParameters = hashString.split('&').map(function (parameter) {
                var
                    param = parameter.split('='),
                    paramIndex = allowedParameters.indexOf(param[0].toLowerCase())
                ;
                return (
                    ~paramIndex ? [param[0].toLowerCase(), decodeURIComponent(param[1])] : null
                );
            })
        ;
        fragmentParameters.forEach(function (parameter) {
            if (parameter == null) return;
            var paramIndex = allowedParameters.indexOf(parameter[0]);
            switch (paramIndex) {
                case 0:
                    if (
                        VALIDATE_PIXEL.test(parameter[1])
                    ) validParameters[CONFIG_PIXEL] = +parameter[1];
                    break;
                case 1:
                    if (
                        VALIDATE_CORRECTION.test(parameter[1].toUpperCase())
                    ) validParameters[CONFIG_CORRECTION] = parameter[1].toUpperCase();
                    break;
                case 2:
                    if (
                        //VALIDATE_VALUE.test(parameter[1])
                        parameter[1].length >= VALIDATE_VALUE_MIN &&
                        parameter[1].length <= VALIDATE_VALUE_MAX
                    ) validParameters[CONFIG_VALUE] = parameter[1];
                    break;
            }
        });
        allowedParameters.forEach(function (p, index) {
            if(!~Object.keys(validParameters).indexOf(p)) {
                switch(index) {
                    case 0:
                        validParameters[p] = CONFIG_DEFAULT_PIXEL;
                        break;
                    case 1:
                        validParameters[p] = CONFIG_DEFAULT_CORRECTION;
                        break;
                    case 2:
                        validParameters[p] = CONFIG_DEFAULT_VALUE;
                        break;
                }
            }
        });
        console.log('QR code configuration\n' + JSON.stringify(validParameters));
        return validParameters;
    };
    (function init() {
        parseFragment(hashString);
        elemValue.value = validParameters.value;
        updateQRCode();
        elemForm.addEventListener('submit', function (e) {
            e.preventDefault();
            debugger;
            var text = elemValue.value.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
            if (text.length > 0) {
                location.hash = encodeURIComponent(text);
                elemQRCode.innerHTML = createQRCode(text);
            }
        });
    })();
})(window);
