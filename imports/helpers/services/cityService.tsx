export async function getCity(code) {
    if(code) {
        const cityResponse = await fetch(
            `https://api.countrystatecity.in/v1/countries/${code}/cities`, {
            headers: {
                "X-CSCAPI-KEY": "OU1ZT0pwamp4WUhqbTg0UXVyTDNPaFFkZFdCS1Y2ZW1TdUlqaFQ3VA=="
            }
        }
        );
        const city = await cityResponse.json();
        return city;
    }
}