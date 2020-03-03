export default interface CardResponse {
    id: string;
    name: string;
    type: string;
    desc: string;
    atk: string;
    def: string;
    level: string;
    race: string;
    attribute: string;
    archetype: string;
    card_sets: cardSet[];
    card_images: cardImages[];
    card_prices: cardPrices;
}

export interface cardSet {
    set_name: string;
    set_code: string;
    set_rarity: string;
    set_price: string;
}

export interface cardImages {
    id: string;
    image_url: string;
    image_url_small: string;
}

export interface cardPrices {
    cardmarket_price: string;
    tcgplayer_price: string;
    ebay_price: string;
    amazon_price: string;
}
