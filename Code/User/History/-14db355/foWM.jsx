

export const Follower = ( postIds ) => {
    const posts = postIds.map( ( postId ) =>
    {
        <Post key={postIds} />        
    });

    return (
        <div>
            {posts}
        </div>
    );
}