{let n=function(){let n=$("#new-post-form");n.submit((function(o){o.preventDefault(),$.ajax({type:"post",url:"/posts/create",dataType:"json",data:n.serialize(),success:function(n){let o=t(n.data.post);$("#post-list-container>ul").prepend(o),e($(" .delete-post-button",o))},error:function(n){console.log(n.responseText)}})}))},t=function(n){return $(`<li id="post-${n._id}">\n        <p>\n          \n             <small>\n                  <a class="delete-post-button" href="/posts/destroy/${n._id}">X</a>\n             </small>\n           \n        ${n.content}\n        <br>\n        <small>\n             ${n.user.name}\n        </small>\n        <br>\n\n        <small>\n         \n               <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${n._id}&type=Post">\n                    0 Likes\n               </a>\n               \n     </small>\n\n    </p>\n    <div class="post-comment">\n      \n             <form action="/comments/create" method="POST">\n                  <input type="text" name="content" placeholder="Type here to comment.." required>\n                  <input type="hidden" name="post" value="${n._id}">\n                  <button type="submit">Add Comment</button>\n             </form>\n   \n        <div class="post-comments-list">\n             <ul id="post-comments-${n._id}">\n                  \n             </ul>\n        </div>\n    </div>\n    </li>`)},e=function(n){$(n).click((function(t){t.preventDefault(),$.ajax({type:"get",url:$(n).prop("href"),success:function(n){$(`#post-${n.data.post_id}`).remove()},error:function(n){console.log(n.responseText)}})}))};n()}