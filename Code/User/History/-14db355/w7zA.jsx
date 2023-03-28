import CardWrapper from "components/CardWrapper"

export const FollowList = ( userLists ) => {

    const users = userLists.map( (userId) =>
    <CardWrapper>

    </CardWrapper> 
    );

    return(
        <div>
            {users}
        </div>
    ) 
}