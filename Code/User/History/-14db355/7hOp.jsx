import CardWrapper from "components/CardWrapper"
import FollowCard from "scenes/cards/FollowCard";

export const FollowList = ( userLists ) => {

    const users = userLists.map( (userId) =>
        <FollowCard key={ userId } /> 
    );

    return(
        <CardWrapper>
            {users}
        </CardWrapper>
    ) 
}