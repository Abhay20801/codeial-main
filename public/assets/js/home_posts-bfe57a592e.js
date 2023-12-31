{
    // Method to submit the form data for new post using AJAX
    let createPost = function(){
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e){
            // It will prevent the submit without Ajax
            e.preventDefault();

            $.ajax({
                type: 'post',
                url : '/posts/create',
                dataType:'json',
                data: newPostForm.serialize(),
                success: function(data){
                    let newPost = newPostDom(data.data.post);

                    $(`#post-list-container>ul`).prepend(newPost);
                    deletePost($(' .delete-post-button',newPost));
                }, error: function(error){
                    console.log(error.responseText);
                }
            })
              
        })
    }
    // Method to create a post in DOM
    let newPostDom = function(post){
        return $(`<li id="post-${post._id}">
        <p>
          
             <small>
                  <a class="delete-post-button" href="/posts/destroy/${post._id}">X</a>
             </small>
           
        ${post.content}
        <br>
        <small>
             ${post.user.name }
        </small>
        <br>

        <small>
         
               <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${post._id}&type=Post">
                    0 Likes
               </a>
               
     </small>

    </p>
    <div class="post-comment">
      
             <form action="/comments/create" method="POST">
                  <input type="text" name="content" placeholder="Type here to comment.." required>
                  <input type="hidden" name="post" value="${post._id}">
                  <button type="submit">Add Comment</button>
             </form>
   
        <div class="post-comments-list">
             <ul id="post-comments-${post._id}">
                  
             </ul>
        </div>
    </div>
    </li>`)
    }
// Method to delete a post from DOM
    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type:'get',
                url:$(deleteLink).prop('href'),
                success: function(data){
                    $(`#post-${data.data.post_id}`).remove();
                },error:function(error){
                    console.log(error.responseText);
                }
            })
        })
    }




    createPost();
}