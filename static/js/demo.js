/**
 * Created by huchunbo on 2017/1/12.
 */
function fillArray(value, len) {
    var arr = [];
    for (var i = 0; i < len; i++) {
        arr.push(value);
    }
    return arr;
}

function addZero(number, length) {
    var buffer = "";
    if (number ==  "") {
        for (var i = 0; i < length; i ++) {
            buffer += "0";
        }
    } else {
        if (length < number.length) {
            return "";
        } else if (length == number.length) {
            return number;
        } else {
            for (var i = 0; i < (length - number.length); i ++) {
                buffer += "0";
            }
            buffer += number;
        }
    }
    return buffer;
}

// 渲染元素
var render = function() {
    var app = new Vue({
        el: '#app',
        data: {
            userInput: 'aa 1d 90 00 5f 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 01 01 00 00 00 00 00 00 0e',
            message: ''
        },
        computed: {
            serializationUserInput: function () {
                return this.userInput.replace(/[ ]+/ig, ' ').split(' ');
            },
            computedResultx: function () {
                var cache = '';
                for (var i = 0, len=this.serializationUserInput.length; i < len; i++) {
                    cache += i<10 ? '0'+i : i;
                    cache += ' ';
                }
                return cache;
            },
            computedResult: function () {
                var cache = '';
                var arrayCache = this.serializationUserInput.map(function(x){return x;});
                for (var i = 0, len=arrayCache.length; i < len; i++) {
                    var item = arrayCache[i];
                    cache += addZero(i.toString(), item.length);
                    cache += ' ';
                }
                return cache;
            }
        },
        methods: {

        }
    });
};

// 添加组件
var templateImports = $('template-import');
if (templateImports.length > 0) {
    $.each(templateImports, function(index, item) {
        item = $(item);
        var templateUrl = item.attr('file');
        $.get(templateUrl, function(result) {
            item.html(result);

            // 判断是否执行渲染
            if (index + 1 === templateImports.length) {
                render();
            }
        });
    });
} else {
    render();
}
