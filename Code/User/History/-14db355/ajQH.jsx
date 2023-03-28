import CardWrapper from "components/CardWrapper"
import FollowCard from "scenes/cards/FollowCard";

export const FollowList = ( {userLists = []} ) => {

    if ( userLists.length === 0 ){
        return null;
    }

    const users = userLists.map( (userId) =>
        <FollowCard key={ userId } /> 
    );

    return(
        <CardWrapper>
            {users}
        </CardWrapper>
    ) 
}