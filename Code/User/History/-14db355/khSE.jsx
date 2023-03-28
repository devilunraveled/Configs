export const Follower = ( postIds ) => {
    const posts = postIds.map( ( postId ) =>
    {
        <PostCard key={postIds} />        
    });

    return (
        <div>
            {posts}
        </div>
    );
}