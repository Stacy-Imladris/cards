import {memo} from 'react';
import {CardType} from 'components/Cards/CardsAPI/cards-api';
import {Card} from './Card/Card';

type Props = {
    cards: CardType[]
}

export const CardsList = memo(({cards}: Props) => <>{cards.map(card => <Card key={card._id} card={card}/>)}</>)