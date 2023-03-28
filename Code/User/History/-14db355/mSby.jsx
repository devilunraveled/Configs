import CardWrapper from "components/CardWrapper"
import FollowCard from "scenes/cards/FollowCard";

export const FollowList = ( props ) => {

    if ( props.userList.length === 0 ){
        return null;
    }

    const users = props.userList.map( (userId) =>
        <FollowCard key={ userId } /> 
    );

    return(
        <CardWrapper>
            {users}
        </CardWrapper>
    ) 
}