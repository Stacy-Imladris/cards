import {FC, memo} from 'react';
import {CardType} from 'components/Cards/CardsAPI/cards-api';
import {Card} from './Card/Card';

type Props = {
    cards: CardType[]
}

export const CardsList: FC<Props> = memo(({cards}) =>
    <>{cards.map(card => <Card key={card._id} card={card}/>)}</>)