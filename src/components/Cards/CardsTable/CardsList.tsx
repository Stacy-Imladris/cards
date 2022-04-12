import {FC} from 'react';
import {Card} from './Card';
import {CardType} from '../../../api/cards-api';

type CardsListPropsType = {
    cards: CardType[]
}

export const CardsList: FC<CardsListPropsType> = ({cards}) => {
    return <>
        {
            cards.map(card => <Card key={card._id} card={card}/>)
        }
    </>
}