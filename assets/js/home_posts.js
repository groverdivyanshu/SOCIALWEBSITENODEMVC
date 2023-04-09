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
            
                   console.log(newpost);
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

    // console.log($(deletelink).prop('href'));
       

        $.ajax({

            type:'get',
            url:$(deletelink).prop('href'),
            success:function(data)
         { 
              $(`#post-${data.data.post_id}`).remove();
            //   new Noty({
            //     theme:"relax",
            //     type: 'warning',
            //     layout: 'topRight',
            //     text: "Post Deleted",
            //     timeout:2000
            //   }).show();
            
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


//create comment by ajax
  
let createcomment=function()
{
    let newcomment=$(".post-comment-create").each(function(){

       $(this).submit(function(e){
            e.preventDefault();
       
            
            $.ajax({
                type:'post',
                url:'/comment/create',
                data:$(this).serialize(),
                success:function(data)
                {
                //    console.log(data);
                    let printcommnet=print(data.data);

                    
                    $(`#post-comment-${data.data.comments.post}`).prepend(printcommnet);
                    
                },
                error:function(error)
                {
                    console.log(error.responseText);
                }
            })
        })
    })
    
   

}

//print comment in dom
function print(data)
{
   const {comments,user}=data;
    return $(`<li>
    <p>
        
    
    <a href="/comment/destroy/${comments._id}">X</a>
               
    ${comments.content} 
    <br>
    <small>
    ${user.name}    
    </small>
    </p>
    </li>`)
    
    
    
   
}

//delete comment in dom

function deletecomments(deletecomment)
{
    $(deletecomment).click(function(e){

e.preventDefault();


$.ajax({

    type:"get",
    url:$(deletecomment).prop('href'),
    success:function(data)
    {
        // console.log(data.data.comments._id);      
        $(`#${data.data.comments._id}`).remove();  
    //    $(`#data.data.${comments._id}`).remove();

    },
    error:function(err)
    {
        console.log("Error is coming",err);
    }
    
})


})
}

$('.delete-comments').each(function(){

    deletecomments($(this));
})

createcomment();
    createpost();
   
}