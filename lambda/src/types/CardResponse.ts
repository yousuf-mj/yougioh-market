export default interface CardResponse {
    id: string;
    name: string;
    type: string;
    desc: string;
    atk: string;
    def: string;
    level: '4';
    race: 'Aqua';
    attribute: 'EARTH';
    archetype: 'Utopia';
    card_sets: [
        {
            set_name: '2013 Collectible Tins Wave 1';
            set_code: 'CBLZ-EN007';
            set_rarity: 'Common';
            set_price: '0.85';
        }
    ];
    card_images: [
        {
            id: '18865703';
            image_url: 'https://storage.googleapis.com/ygoprodeck.com/pics/18865703.jpg';
            image_url_small: 'https://storage.googleapis.com/ygoprodeck.com/pics_small/18865703.jpg';
        }
    ];
    card_prices: {
        cardmarket_price: '0.2';
        tcgplayer_price: '0.16';
        ebay_price: '0.99';
        amazon_price: '7.10';
    };
}
