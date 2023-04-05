{
    // method to submit the form data for new post using AJAX
    let createpost=function()
    {
        let newpostform=$('#new-post-form');

        newpostform.submit(function(e){
            e.preventDefault();

            $.ajax({
                type:'post',
                url:"/posts/create",
                data:newpostform.serialize(),
                success:function(data1)
                {
                    console.log(data1);
                   let newpost=newpostdom(data1.data.post);
                   $('#posts-list-container>ul').prepend(newpost);
                   deletePost($(' .delete-post-button',newpost))
                

                },error:function(error)
                {
                    console.log(error.responseText);
                }

            }); 


        });
    }
    // method to create a post in DOM

    let newpostdom=function(post)
    {
        return $(`<li id="post-${post._id}">
        <p>
   
    <a class="delete-post-button" href="/posts/destroy/${post._id}">X</a>
    ${post.content}
    <small>
    ${post.user.name}
    </small>
    </p>
    <div class="post-comments">
   
    <form action="/comment/create" method="POST">
    <input type="text" name="content" placeholder="Type here to add commnet...">
    <input type="hidden" name="post" value="${post._id}">
    <input type="submit" value="Add Comment">
    
    
    </form>

    <div class="post-comments-list">
    <ul id="post-comment-${post._id}>">
      
    </ul>
    </div>
    </div>
    
    </li>
    
    `)
    }
//Method to delete a post from DOM

let deletePost=function(deletelink)
{
   
    $(deletelink).click(function(e){
        e.preventDefault();

    console.log($(deletelink).prop('href'));
       

        $.ajax({

            type:'get',
            url:$(deletelink).prop('href'),
            success:function(data)
         { 
              $(`#post-${data.data.post_id}`).remove();
            
            },

        error:function(error)
        {
            console.log(error.responseText);
        }
        })
    })
}



// var deete=document.querySelectorAll('.delete-post-button');

// for(let i=0;i<deete.length;i++)
// {
//  deletePost(deete[i]);
// }

//apply event listere all link
$('.delete-post-button').each(function(){
    
    deletePost($(this));
})

    createpost();
}