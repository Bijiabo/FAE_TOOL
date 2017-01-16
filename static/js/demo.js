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
            message: '',
            userSelected: '',
            originalNumberSystem: 16
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
            },
            selectedArray: function () {
                var self = this;
                return this.userSelected
                    .replace(/[ ]{2,}/ig, ' ')
                    .split(' ')
                    .filter(function (x) {return x.length > 0;})
                    .map(function(x){return parseInt(x, self.originalNumberSystem);});
            },
            selectedTo2: function () {
                return this.selectedArray.map(function (x) {
                    return x.toString(2);
                }).join(' ');
            },
            selectedTo8: function () {
                return this.selectedArray.map(function (x) {
                    return x.toString(8);
                }).join(' ');
            },
            selectedTo10: function () {
                return this.selectedArray.map(function (x) {
                    return x.toString(10);
                }).join(' ');
            },
            selectedTo16: function () {
                return this.selectedArray.map(function (x) {
                    return x.toString(16);
                }).join(' ');
            }
        },
        methods: {
            clear: function () {
                this.userInput = '';
            }
        },
        mounted: function () {
            var self = this;
            document.addEventListener("selectionchange", function(e) {

                self.userSelected = window.getSelection().toString();
            }, false);
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