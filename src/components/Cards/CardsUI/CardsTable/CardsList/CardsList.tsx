import {FC, memo} from 'react';
import {CardType} from '../../../CardsAPI/cards-api';
import {Card} from './Card/Card';

type CardsListPropsType = {
    cards: CardType[]
}

export const CardsList: FC<CardsListPropsType> = memo(({cards}) => {
    return <>
        {
            cards.map(card => <Card key={card._id} card={card}/>)
        }
    </>
})