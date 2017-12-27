(function init (_window) {

    var
        window = _window,
        document = window.document,
        errorCorrectLevel = 'L',
        pixelSize = 5,
        qr_element = document.getElementById('qr'),
        hashString = location.hash.replace(/^\s\s*/, '').replace(/\s\s*$/, ''),
        capacity = [
            //index + 1 == version
            //[L, M, Q, H]
            [152,128,104,72],[],[],[],
            [864,688,496,368],[],[],
            [1552,1232,880,688],[],
            [2192,1728,1232,976],[],[],
            [3424,2672,1952,1440],[],
            [4184,3320,2360,1784],[],[],
            [5768,4504,3176,2504],[],
            [6888,5352,3880,3080],[],[],
            [8752,6880,4912,3712],[],
            [10208,8000,5744,4304],[],[],
            [],[],
            [13880,10984,7880,5960],[],[],
            [],[],
            [18448,14496,10288,7888],[],[],
            [],[],
            [23648,18672,13328,10208]
        ]
    ;
    function create_qrcode (text) {
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
            qr = qrcode(typeNumber, errorCorrectLevel);
            qr.addData(unescape("%EF%BB%BF"));
            qr.addData(unescape(encodeURIComponent(text)));
            qr.make();
        } catch (e) {
            var m = e.message.split('>');
            textLength = +m[0].split('(')[1];
            limit = +m[1].split(')')[0]
        };
        var allowed = capacity.filter(function(c) {
            var max = c[['L', 'M', 'H', 'Q'].indexOf(errorCorrectLevel)];
            return textLength < max;
        });
        if (allowed.length) {
            qr = qrcode(
                capacity.indexOf(allowed[0]) + 1,
                errorCorrectLevel
            );
            qr.addData(unescape("%EF%BB%BF"));
            qr.addData(unescape(encodeURIComponent(text)));
            qr.make();
        };
        return !!qr ? qr.createImgTag(pixelSize) : '';
    };
    function update_qrcode () {
        var text = document.forms[0].elements['msg'].value.replace(/^[\s\u3000]+|[\s\u3000]+$/g, '');
        document.getElementById('qr').innerHTML = create_qrcode(text);
    };
    (function init() {
        if (hashString.length > 1) {
            document.querySelector('[name="msg"]').value = decodeURIComponent(
                hashString.slice(1)
            );
            update_qrcode();
        };
        document.querySelector('form').addEventListener('submit', function (e) {
            e.preventDefault();
            var text = document.forms[0].elements['msg'].value.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
            if (text.length > 0) {
                location.hash = encodeURIComponent(text);
                qr_element.innerHTML = create_qrcode(text);
            }
        });
    })();
})(window);
