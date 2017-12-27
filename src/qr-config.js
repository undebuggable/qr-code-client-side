var
    CONFIG_PIXEL = 'pixel',
    CONFIG_CORRECTION = 'correction',
    CONFIG_VALUE = 'value',
    CONFIG_DEFAULT_PIXEL = 5,
    CONFIG_DEFAULT_CORRECTION = 'H',
    CONFIG_DEFAULT_VALUE = '',

    //1-20
    VALIDATE_PIXEL = /^([1-9]|1[0-9]|2[0])$/,
    //'L' ,'M', 'Q' ,'H'
    VALIDATE_CORRECTION = /[LMQH]/,
    VALIDATE_VALUE_MIN = 1,
    VALIDATE_VALUE_MAX = 10000,

    CAPACITY = [
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