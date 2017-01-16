/**
 * Created by huchunbo on 2017/1/12.
 */
$(document).on('focus', '.navigation-bar .form-control', function(){
    $('.navigation-bar .input-group').addClass('focus');
});
$(document).on('blur', '.navigation-bar .form-control', function(){
    $('.navigation-bar .input-group').removeClass('focus');
});
// 评论区域交互
// 响应回复点击
$(document).on('click', '.reply-button', function () {
    var parent = $($(this).parent());
    var replyInputContainerElementClass = '.comment-post-input-container';
    var replyInputCOntainerHTML = '\
        <div class="comment-post-input-container reply-append-input-container">\
            <textarea class="col-md-12" name="comment" cols="30" rows="3" placeholder="点此输入评论内容..."></textarea>\
            <button class="btn btn-default col-md-12">发表</button>\
        </div>';

    if (parent.has(replyInputContainerElementClass).length === 0) {
        $('.reply-append-input-container').remove();
        parent.append(replyInputCOntainerHTML);
    } else {
        parent.find(replyInputContainerElementClass).remove();
    }
});
// 点赞
$(document).on('click', '.thumbs-up-button', function () {

});
// 踩评论
$(document).on('click', '.thumbs-down-button', function () {

});
// 显示登陆界面
$(document).on('click', '.show-log-in', function () {

});
// 显示注册界面
$(document).on('click', '.show-register', function () {

});
